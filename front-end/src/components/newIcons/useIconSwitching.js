// TODO: delete?

import React, { useState } from "react";
import PropTypes from "prop-types";

function useSwitchComponents(icons) {
  const [current, _setCurrent] = useState(0);

  const setCurrent = (val) => {
    val = val < 0 || val >= icons.length ? 0 : val;
    _setCurrent(val);
  };

  return [current, setCurrent];
}

useSwitchComponents.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.element),
};

export default useSwitchComponents;
