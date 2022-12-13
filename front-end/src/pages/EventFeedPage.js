/* Ilana-Mahmea */

import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import BasePage from "../components/base-page-components/BasePage.js";
import EventPreview from "../components/EventPreview.js";
import useAlert from "../hooks/useAlert.js";
import SearchFilterBar from "../components/SearchFilterBar.js";
import PaginationComponent from "../components/PaginationComponent.js";
import EventDetailsModal from "../components/EventDetailsModal.js";
import "../stylesheets/EventFeedPage.css";
import { useNavigate } from "react-router-dom";
import useLikeHandler from "../hooks/useLikeHandler.js";
import useRSVPHandler from "../hooks/useRSVPHandler.js";

function EventFeedPage({ isAuth }) {
  // For loading previews
  const [doneSearch, setDoneSearch] = useState(false);
  const [previews, setPreviews] = useState(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      arr.push({});
    }
    return arr;
  });
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // For event details modal
  const [currentEventId, setCurrentEventId] = useState("");
  const [currentEventPreview, setCurrentEventPreview] = useState({});

  const [AlertComponent, setAlert] = useAlert();

  // Like and RSVP handlers (used by event previews)
  const handleRSVP = useRSVPHandler({
    setAlert,
    doIfSuccessful: async () => {
      await loadEventPreviews(findQuery);
    },
  });

  const handleLike = useLikeHandler({
    setAlert,
    doIfSuccessful: async () => {
      await loadEventPreviews(findQuery);
    },
  });

  // For search/filter

  const [findQuery, setFindQuery] = useState({
    searchBy: {
      searchTerm: "",
      searchCategories: [],
    },
    filterBy: {
      tags: [],
      // Only show events that have not already ended
      dateTime: { earliestFinish: new Date().toISOString() },
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
    "Art/Craft",
    "Drink",
    "Food",
    "Games",
    "Hangout",
    "Learning",
    "Music/Entertainment",
    "Networking",
    "Outdoor",
    "Party",
    "Tours/Exploration",
  ];

  function objFromOptions() {
    const obj = {};
    checkboxOptions.forEach((opt) => {
      obj[opt] = false;
    });
    return obj;
  }

  const [currentSelections, setSelectionsTest] = useState({
    // TODO: use map?
    tags: objFromOptions(),
  });

  function setSelections(selObj) {
    console.log("selections: ", selObj);
    setSelectionsTest(selObj);
  }

  // For pagination

  const [currPage, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 12;

  // Loading

  function find() {
    setDoneSearch(false);
    setFindQuery({
      searchBy: {
        searchTerm: searchTerm,
        searchCategories:
          currentCategory === "Anywhere"
            ? categoriesArray.slice(1)
            : [currentCategory],
      },
      filterBy: {
        tags: checkboxOptions.filter((x) => currentSelections.tags[x]),
        dateTime: { earliestFinish: new Date().toISOString() },
      },
    });
    setPage(0);
  }

  const loadEventPreviews = useCallback(
    async (query) => {
      const res = await (
        await fetch("/api/feed/getEventPreviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query,
            pagination: {
              skip: currPage * resultsPerPage,
              limit: resultsPerPage,
            },
          }),
        })
      ).json();
      if (res?.events) {
        setPreviews(res.events);
      }
      if (!res?.events || res.events.length === 0) {
        setTotalResults(0);
      }
      setDoneSearch(true);
    },
    [currPage, resultsPerPage]
  );

  const loadEventCount = useCallback(async (query) => {
    const res = await (
      await fetch("/api/feed/getEventCount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query }),
      })
    ).json();
    if (res && res.count) {
      setTotalResults(res.count);
    }
  }, []);

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

  // For initial loading, to check authorization
  useEffect(() => {
    async function authOrRedirect() {
      if (!(await isAuth())) {
        navigate("/", { replace: true });
      }
      getUserPassportInfo();
      // Can return to clean up previous effect, eg stop fetch
    }
    authOrRedirect();
  }, [isAuth, navigate, loadEventPreviews]);

  // To get search results
  useEffect(() => {
    loadEventPreviews(findQuery);
    if (currPage === 0) {
      loadEventCount(findQuery);
    }
  }, [currPage, loadEventPreviews, loadEventCount, findQuery]);

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
          handleSearchOrFilter={find}
          disableButtons={!doneSearch}
        />

        <PaginationComponent
          currPage={currPage}
          setPage={setPage}
          resultsPerPage={resultsPerPage}
          totalResults={totalResults}
          disableButtons={!doneSearch}
        />
        <div className="centering-container alert-container">
          <AlertComponent />
        </div>

        {
          // TODO: make this its own component
        }
        <div className="row previews-row">
          {previews.length ? (
            previews.map((p, i) => (
              <div className="col" key={p._id}>
                <EventPreview
                  previewObject={p}
                  userId={user._id}
                  onRSVP={handleRSVP}
                  onLike={handleLike}
                  className={`color-${i % 3}`}
                  onClickDetails={() => {
                    setCurrentEventId(p._id);
                    setCurrentEventPreview(p);
                  }}
                  loading={!doneSearch}
                ></EventPreview>
              </div>
            ))
          ) : doneSearch ? (
            <div className="dbMessage">
              <div>No events are listed for your organization.</div>
              <div>Check back later or create a new event yourself!</div>
            </div>
          ) : (
            <div className="dbMessage">Checking events...</div>
          )}
        </div>

        <EventDetailsModal
          eventPreview={currentEventPreview}
          eventId={currentEventId}
        ></EventDetailsModal>
      </BasePage>
    </div>
  );
}

EventFeedPage.propTypes = {
  isAuth: PropTypes.func.isRequired,
};

export default EventFeedPage;
