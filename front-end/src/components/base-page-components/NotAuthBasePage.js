/* Ilana-Mahmea */

import "../../stylesheets/NotAuthBasePage.css";
import React from "react";
import PropTypes from "prop-types";

function NotAuthBasePage(props) {
  return (
    <main className="NotAuthBasePage">
      <div className="container-fluid">
        <div className="row">
          <div className="col d-none d-md-flex img-col">{props.image}</div>

          <div className="col text-col">
            <div className="row">{props.children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

NotAuthBasePage.propTypes = {
  children: PropTypes.oneOfType([
    // https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  image: PropTypes.element.isRequired,
};

export default NotAuthBasePage;
