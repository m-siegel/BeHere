/* Ilana-Mahmea */

import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchComponent from "./SearchComponent.js";
import FilterComponent from "./FilterComponent.js";
import "../stylesheets/SearchFilterBar.css";

/**
 */
function SearchFilterBar({
  categoriesArray,
  searchTerm,
  setSearchTerm,
  currentCategory,
  setCategory,
  checkboxOptions,
  currentSelections,
  setSelections,
  find,
}) {
  return (
    <div className="SearchFilterBar row">
      <div className="col-auto">
        <SearchComponent
          categoriesArray={categoriesArray}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentCategory={currentCategory} // Changed this
          setCategory={setCategory}
          find={find}
        />
      </div>

      <div className="col-auto">
        <FilterComponent
          checkboxOptions={checkboxOptions}
          currentSelections={currentSelections}
          setSelections={setSelections}
          find={find}
        />
      </div>
    </div>
  );
}

SearchFilterBar.propTypes = {
  categoriesArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  checkboxOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentSelections: PropTypes.object.isRequired,
  setSelections: PropTypes.func.isRequired,
  find: PropTypes.func.isRequired,
};

export default SearchFilterBar;
