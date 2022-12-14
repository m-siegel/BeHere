/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";

/**
 * FilterForm.
 * @param {Array<string>} checkboxOptions Options to display as checkboxes.
 * @param {object<string: bool>} currentSelections Lookup for whether each of the checkbox options is selected.
 * @param {func} setSelections Setter for anscestor's state that determines currentSelections.
 * @param {func} handleFilter Function to call when the onSubmit event is triggered, after initial event's default is prevented.
 * @param {bool} disableButtons Whether or not to disable the submit button.
 * @returns {element} A checkbox form of filters to apply.
 */
function FilterForm({
  checkboxOptions,
  currentSelections,
  setSelections,
  handleFilter,
  disableButtons,
}) {
  function toggleOption(opt, val) {
    const newObj = { ...currentSelections };
    newObj.tags[`${opt}`] = val;
    setSelections(newObj);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleFilter();
  }

  function checkAll() {
    const newObj = { ...currentSelections };
    for (const opt in newObj.tags) {
      newObj.tags[opt] = true;
    }
    setSelections(newObj);
  }

  function uncheckAll() {
    const newObj = { ...currentSelections };
    for (const opt in newObj.tags) {
      newObj.tags[opt] = false;
    }
    setSelections(newObj);
  }

  return (
    <div className="FilterForm">
      <form className="form-check" id="filterForm" onSubmit={handleSubmit}>
        <section>
          <fieldset>
            <legend>Choose tags to filter by</legend>
            <div className="row">
              <div className="col-auto">
                <button
                  className="btn btn-sm btn-grey"
                  type="button"
                  onClick={checkAll}
                >
                  Check All
                </button>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-sm btn-grey"
                  type="button"
                  onClick={uncheckAll}
                >
                  Uncheck All
                </button>
              </div>
            </div>
            <div className="checkbox-holder">
              {checkboxOptions.map((option) => (
                <div key={option}>
                  <input
                    className="form-check-input"
                    id={option}
                    name="tag"
                    type="checkbox"
                    value={option}
                    checked={currentSelections.tags[option]}
                    onChange={(evt) => toggleOption(option, evt.target.checked)}
                  />
                  <label className="form-check-label" htmlFor={option}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </section>
        <button
          className="btn btn-action submit-button"
          type="submit"
          disabled={disableButtons}
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}

FilterForm.propTypes = {
  checkboxOptions: PropTypes.arrayOf(PropTypes.string).isRequired, // Would be better without this
  currentSelections: PropTypes.object.isRequired,
  setSelections: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool,
};

export default FilterForm;
