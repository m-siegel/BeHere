/* Ilana-Mahmea */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import EventPreview from "../components/EventPreview.js";
import useAlert from "../hooks/useAlert.js";
import SearchFilterBar from "../components/SearchFilterBar.js";
import "../stylesheets/EventFeedPage.css";
import { useNavigate } from "react-router-dom";

function EventFeedPage({ isAuth }) {
  const [checkedEvents, setCheckedEvents] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [AlertComponent, setAlert] = useAlert();

  // For search/filter
  const [findQuery, setFindQuery] = useState({
    searchBy: {
      searchTerm: "",
      searchCategories: [],
    },
    filterBy: {
      tags: [],
    },
  });

  // For search
  const categoriesArray = [
    "Anywhere",
    "Name",
    "Description",
    "Tags",
    "Location",
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCategory] = useState(
    categoriesArray[0] ? categoriesArray[0] : "Select an Option"
  ); // TODO: faster as a number (index)

  // For filter
  const checkboxOptions = [
    "Active",
    "Games",
    "Food",
    "Drink",
    "Music/Entertainment",
    "Outdoor",
    "Art/Craft",
    "Learning",
    "Tours/Exploration",
    "Networking",
    "Hangout",
    "Party",
  ];

  function objFromOptions() {
    const obj = {};
    checkboxOptions.forEach((opt) => {
      obj[opt] = false;
    });
    return obj;
  }

  const [currentSelections, setSelections] = useState({
    // TODO: use map?
    tags: objFromOptions(),
  });

  function find() {
    // console.log({
    //   searchTerm: searchTerm,
    //   category: currentCategory,
    //   filters: currentSelections,
    // });
    setFindQuery({
      searchBy: {
        searchTerm: searchTerm,
        searchCategories:
          currentCategory === "Anything"
            ? categoriesArray.slice(1)
            : [currentCategory],
      },
      filterBy: {
        tags: checkboxOptions.filter((x) => currentSelections.tags[x]),
      },
    });
  }

  // Loading

  // TODO: delete?
  async function loadPreviews(query) {
    setCheckedEvents(false);
    const res = await (
      await fetch("/api/feed/getEventPreviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query }),
      })
    ).json();
    if (res && res.events) {
      setPreviews(res.events);
    }
    setCheckedEvents(true);
  }

  async function getUserPassportInfo() {
    try {
      const res = await fetch("/getPassportUser", {
        method: "POST",
      });
      setUser(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    async function authOrRedirect() {
      if (!(await isAuth())) {
        navigate("/", { replace: true });
      }
      loadPreviews();
      getUserPassportInfo();
      // Can return to clean up previous effect, eg stop fetch
    }
    authOrRedirect();
  }, [isAuth, navigate]);

  useEffect(() => {
    loadPreviews(findQuery);
  }, [findQuery]);

  // Like and RSVP handlers (used by event previews)

  async function handleRSVP(event, rsvp) {
    setAlert({
      type: "success",
      message: "💌 RSVPing...",
    });
    setTimeout(() => {
      setAlert({
        message: "",
      });
    }, 2000);
    try {
      const res = await fetch("/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: event, rsvpStatus: rsvp }),
      });
      if (res.err) {
        setAlert({
          type: "warning",
          message: "Error RSVPing. Please try again later.",
        });
      } else {
        // Load with new rsvps
        await loadPreviews();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleLike(eventId) {
    setAlert({
      type: "success",
      message: "Updating like...",
    });
    setTimeout(() => {
      setAlert({
        message: "",
      });
    }, 2000);
    try {
      const res = await fetch("/toggleLike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: eventId }),
      });
      if (res.err) {
        setAlert({
          type: "warning",
          message: "Error toggling 'like'. Please try again later.",
        });
        return;
      } else {
        await loadPreviews();
        return;
      }
    } catch (e) {
      console.error(e);
      setAlert({
        type: "warning",
        message: "Error toggling 'like'. Please try again later.",
      });
    }
  }

  return (
    <div className="EventFeedPage">
      <BasePage>
        <h1>Upcoming Events</h1>
        <SearchFilterBar
          categoriesArray={categoriesArray}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentCategory={currentCategory}
          setCategory={setCategory}
          checkboxOptions={checkboxOptions}
          currentSelections={currentSelections}
          setSelections={setSelections}
          find={find}
        />
        <AlertComponent />
        <div className="row">
          {previews.length ? (
            previews.map((p, i) => (
              <div className="col" key={p._id}>
                <EventPreview
                  previewObject={p}
                  userId={user._id}
                  onRSVP={handleRSVP}
                  onLike={handleLike}
                  className={`color-${i % 3}`}
                ></EventPreview>
              </div>
            ))
          ) : checkedEvents ? (
            <div>
              <div>No events are listed for your organization.</div>
              <div>Check back later or create a new event yourself!</div>
            </div>
          ) : (
            <div>Checking events...</div>
          )}
        </div>
      </BasePage>
    </div>
  );
}

EventFeedPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default EventFeedPage;
