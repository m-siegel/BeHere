/* Ilana-Mahmea */

import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/PaginationComponent.css";

/**
 * Pagination Component with "Results __ to __ of __" text and Prev/Next buttons.
 * @param {*} currPage The current page.
 * @param {*} setPage Setter method for anscestor's state that controles currPage. Called when prev/next buttons are clicked.
 * @param {*} resultsPerPage Number of results per page; used to calculate how to fill in the blanks of "Results __ to __".
 * @param {*} totalResults Total number of results available.
 * @param {*} disableButtons Whether or not to disable the buttons.
 * @returns {element} Pagination Component with "Results __ to __ of __" text and Prev/Next buttons.
 */
function PaginationComponent({
  currPage,
  setPage,
  resultsPerPage,
  totalResults,
  disableButtons,
}) {
  return (
    <div className="PaginationComponent row">
      <div className="col-auto connector-text">
        Results {Math.min(currPage * resultsPerPage + 1, totalResults)} to{" "}
        {Math.min((currPage + 1) * resultsPerPage, totalResults)} of{" "}
        {totalResults}
      </div>
      <div
        className="btn-group btn-group-sm col-auto"
        role="group"
        aria-label="Small button group"
      >
        <button
          type="button"
          className="btn"
          disabled={currPage === 0 || disableButtons}
          onClick={() => setPage(currPage - 1)}
        >
          <span aria-hidden="true">&laquo;</span> Prev
        </button>
        <button
          type="button"
          className="btn"
          disabled={
            (currPage + 1) * resultsPerPage >= totalResults || disableButtons
          }
          onClick={() => setPage(currPage + 1)}
        >
          Next <span aria-hidden="true">&raquo;</span>
        </button>
      </div>
    </div>
  );
}

PaginationComponent.propTypes = {
  currPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  resultsPerPage: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  disableButtons: PropTypes.bool.isRequired,
};

export default PaginationComponent;
