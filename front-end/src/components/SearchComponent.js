import React from "react";
import PropTypes from "prop-types";
// import FormInput from "./FormInput.js";

function SearchComponent({
  searchTerm,
  setSearchTerm,
  categoriesArray,
  currentCategory,
  setCategory,
  find,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    find();
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
            <button className="btn btn-action" type="submit">
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
  currentCategory: PropTypes.string, // TODO: would be faster as a number
  setCategory: PropTypes.func,
  find: PropTypes.func.isRequired,
};

export default SearchComponent;
