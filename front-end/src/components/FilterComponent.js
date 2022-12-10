import React from "react";
import PropTypes from "prop-types";

function FilterComponent({ currentSelections, setSelections }) {
  return <div className="FilterComponent">FilterComponent</div>;
}

FilterComponent.propTypes = {
  currentSelections: PropTypes.func.isRequired,
  setSelections: PropTypes.func.isRequired,
};

export default FilterComponent;
