/* Ilana-Mahmea */

import "../../stylesheets/NotAuthBasePage.css";
import React from "react";
import PropTypes from "prop-types";
import ExamplePhotoSlideshow from "./ExamplePhotoSlideshow.js";

function NotAuthBasePage(props) {
  return (
    <div className="NotAuthBasePage">
      <div className="container-fluid">
        <div className="row">
          <aside className="col d-none d-md-flex img-col">
            <ExamplePhotoSlideshow />
          </aside>

          <main className="col text-col">
            <div className="row">{props.children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

NotAuthBasePage.propTypes = {
  children: PropTypes.oneOfType([
    // https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default NotAuthBasePage;
