/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import FilterForm from "./FilterForm.js";
import "../stylesheets/FilterComponent.css";

/**
 * A button and an offcanvas that contains a FilterForm.
 * @param {Array<string>} checkboxOptions Options to display as checkboxes.
 * @param {object<string: bool>} currentSelections Lookup for whether each of the checkbox options is selected.
 * @param {func} setSelections Setter for anscestor's state that determines currentSelections.
 * @param {func} handleFilter Function to call when the FilterForm's onSubmit event is triggered, after initial event's default is prevented.
 * @param {bool} disableButtons Whether or not to disable the submit button for FilterForm.
 * @returns {element} A button and an offcanvas that contains a FilterForm.
 */
function FilterComponent({
  checkboxOptions,
  currentSelections,
  setSelections,
  handleFilter,
  disableButtons,
}) {
  return (
    <div className="FilterComponent">
      <button
        className="btn btn-grey"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasFilterForm"
        aria-controls="offcanvasFilterForm"
      >
        Filter Results
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasFilterForm"
        aria-labelledby="offcanvasFilterFormLabel"
      >
        <div className="offcanvas-header">
          <h2 className="offcanvas-title" id="offcanvasFilterFormLabel">
            Filter Results
          </h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <FilterForm
            currentSelections={currentSelections}
            setSelections={setSelections}
            checkboxOptions={checkboxOptions}
            handleFilter={handleFilter}
            disableButtons={disableButtons}
          />
        </div>
      </div>
    </div>
  );
}

FilterComponent.propTypes = {
  checkboxOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentSelections: PropTypes.object.isRequired,
  setSelections: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool,
};

export default FilterComponent;
