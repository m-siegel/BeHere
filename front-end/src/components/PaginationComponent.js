import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/PaginationComponent.css";

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
        Results {currPage * resultsPerPage + 1} to{" "}
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
