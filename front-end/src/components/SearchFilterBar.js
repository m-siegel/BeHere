/* Ilana-Mahmea */

import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchComponent from "./SearchComponent.js";
import FilterComponent from "./FilterComponent.js";
import "../stylesheets/SearchFilterBar.css";

/**
 * Displays a preview of information for an event. Enables interaction with the event.
 */
function SearchFilterBar() {
  // States

  // For search
  const categoriesArray = [
    "Anywhere",
    "Name",
    "Description",
    "Tags",
    "Location",
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCategory] = useState("Anywhere"); // TODO: faster as a number (index)

  // For filter
  const [currentSelections, setSelections] = useState({
    tags: {
      Active: false,
      Games: false,
      Food: false,
      Drink: false,
      "Music/Entertainment": false,
      Outdoor: false,
      "Art/Craft": false,
      Learning: false,
      "Tours/Exploration": false,
      Networking: false,
      Hangout: false,
      Party: false,
    },
    // TODO: include this?
    // dateTimeRange: {
    //   start: "",
    //   end: "",
    // },
  });

  // Functions

  // For search

  function handleSearch() {
    console.log({
      searchTerm: searchTerm,
      category: currentCategory,
    });
  }

  return (
    <div className="SearchFilterBar row">
      <SearchComponent
        categoriesArray={categoriesArray}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentCategory={"currentCategory"}
        setCategory={setCategory}
        search={handleSearch}
      />

      {/* <div className="row">
        <FilterComponent />
      </div> */}
    </div>
  );
}

SearchFilterBar.propTypes = {};

export default SearchFilterBar;
