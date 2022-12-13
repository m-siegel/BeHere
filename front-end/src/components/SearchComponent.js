/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
// import FormInput from "./FormInput.js";

/**
 * Search bar.
 * @param {Array<string>} categoriesArray Options for the selection menu.
 * @param {string} searchTerm The current search term, to be displayed in the search box.
 * @param {func} setSearchTerm Setter for the ancestor's state that controles searchTerm.
 *     Will be used onChange of text input in search box.
 * @param {string} currentCategory The current category selected and to be displayed by the selection menu.
 * @param {func} setCategory Setter for the ancestor's state that controles currentCategory.
 *     Will be used onChange of selection input.
 * @param {func} handleSearch Function to call when search form is submitted, after initial event's default is prevented.
 * @param {bool} disableButtons Whether or not to disable the submit button.
 * @returns {element} Component with input text for search term and selection input for search modifier.
 */
function SearchComponent({
  searchTerm,
  setSearchTerm,
  categoriesArray,
  currentCategory,
  setCategory,
  handleSearch,
  disableButtons,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch();
  }

  return (
    <div className="SearchComponent">
      <form id="searchForm" onSubmit={handleSubmit}>
        <div className="row">
          <span className="col-auto connector-text">Find events with </span>
          <span className="col-auto">
            <input
              aria-label="search-term"
              type="text"
              value={searchTerm}
              className="form-control"
              id="searchTerm"
              placeholder="search term"
              onChange={(evt) => setSearchTerm(evt.target.value)}
            />
            {/* <label htmlFor="searchTerm">Search Term</label> */}
          </span>
          <span className="col-auto connector-text">in their</span>
          <span className="col-auto">
            <select
              className="form-select"
              aria-label="Search alternatives"
              name="event-attribute"
              selected={currentCategory}
              onChange={(evt) => setCategory(evt.target.value)}
            >
              {categoriesArray.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </span>
          <span className="col-auto">
            <button
              className="btn btn-action"
              type="submit"
              disabled={disableButtons}
            >
              Search
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

SearchComponent.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  categoriesArray: PropTypes.arrayOf(PropTypes.string),
  currentCategory: PropTypes.string, // NOTE: would be faster as a number
  setCategory: PropTypes.func,
  handleSearch: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool,
};

export default SearchComponent;
