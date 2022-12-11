/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import SearchComponent from "./SearchComponent.js";
import FilterComponent from "./FilterComponent.js";
import "../stylesheets/SearchFilterBar.css";

/**
 * Contains the search and filter components
 * @param {Array<string>} categoriesArray
 * @param {string} searchTerm
 * @param {func} setSearchTerm
 * @param {string} currentCategory
 * @param {func} setCategory
 * @param {Array<string>} checkboxOptions
 * @param {object<string: bool>} currentSelections
 * @param {func} setSelections
 * @param {func} handleSearchOrFilter
 * @param {bool} disableButtons
 * @returns {element} Component row with search and filter capabilities.
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
  handleSearchOrFilter,
  disableButtons,
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
          handleSearch={handleSearchOrFilter}
          disableButtons={disableButtons}
        />
      </div>

      <div className="col-auto">
        <FilterComponent
          checkboxOptions={checkboxOptions}
          currentSelections={currentSelections}
          setSelections={setSelections}
          handleFilter={handleSearchOrFilter}
          disableButtons={disableButtons}
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
  handleSearchOrFilter: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool,
};

export default SearchFilterBar;
