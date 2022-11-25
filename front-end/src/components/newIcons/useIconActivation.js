// TODO: delete?

import React, { useState } from "react";
import PropTypes from "prop-types";

function useIconActivation(iconRegular, iconActive, initialState = false) {
  // TODO: can this just be a const, not a state?
  const [active, setActive] = useState(initialState);

  return [active ? iconActive : iconRegular, setActive];
}

useIconActivation.propTypes = {
  iconRegular: PropTypes.element.isRequired,
  iconActive: PropTypes.element.isRequired,
  initialState: PropTypes.bool,
};

export default useIconActivation;
