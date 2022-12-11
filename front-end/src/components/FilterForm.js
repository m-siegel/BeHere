import React from "react";
import PropTypes from "prop-types";

function FilterForm({
  checkboxOptions,
  currentSelections,
  setSelections,
  find,
}) {
  function toggleOption(opt, val) {
    const newObj = { ...currentSelections };
    newObj.tags[`${opt}`] = val;
    setSelections(newObj);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    find();
  }

  return (
    <div className="FilterForm">
      <form className="form-check" id="filterForm" onSubmit={handleSubmit}>
        <section>
          <h3>Tags</h3>
          {checkboxOptions.map((option) => (
            <div key={option}>
              <input
                className="form-check-input"
                id={option}
                name="tag"
                type="checkbox"
                value={option}
                checked={currentSelections[option]}
                onChange={(evt) => toggleOption(option, evt.target.checked)}
              />
              <label className="form-check-label" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
        </section>
        <button className="btn btn-action" type="submit">
          Apply Filters
        </button>
      </form>
    </div>
  );
}

FilterForm.propTypes = {
  checkboxOptions: PropTypes.arrayOf(PropTypes.string).isRequired, // TODO: do without this
  currentSelections: PropTypes.object.isRequired,
  setSelections: PropTypes.func.isRequired,
  find: PropTypes.func.isRequired,
};

export default FilterForm;
