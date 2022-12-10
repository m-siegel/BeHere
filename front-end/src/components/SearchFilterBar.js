/* Ilana-Mahmea */

import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchComponent from "./SearchComponent.js";
import FilterComponent from "./FilterComponent.js";
import "../stylesheets/SearchFilterBar.css";

/**
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
    tags: objFromOptions(),
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

  function handleFilter() {
    console.log({
      filters: currentSelections,
    });
  }

  return (
    <div className="SearchFilterBar row">
      <div className="col-auto">
        <SearchComponent
          categoriesArray={categoriesArray}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentCategory={"currentCategory"}
          setCategory={setCategory}
          search={handleSearch}
        />
      </div>

      <div className="col-auto">
        <FilterComponent
          checkboxOptions={checkboxOptions}
          currentSelections={currentSelections}
          setSelections={setSelections}
          filter={handleFilter}
        />
      </div>
    </div>
  );
}

SearchFilterBar.propTypes = {};

export default SearchFilterBar;
