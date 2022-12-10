import React from "react";
import PropTypes from "prop-types";
import FilterForm from "./FilterForm.js";

function FilterComponent({
  checkboxOptions,
  currentSelections,
  setSelections,
  filter,
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
            filter={filter}
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
  filter: PropTypes.func.isRequired,
};

export default FilterComponent;
