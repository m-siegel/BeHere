import React from "react";
import PropTypes from "prop-types";

function ConfirmDeleteComponent({ del }) {
  if (del) {
    return (
      <div className="card">
        <div className="card-body">
          <p>
            Are you sure you want to delete this event? Once this is done, it
            cannot be reversed.
          </p>
          <div className="centering-container">
            <button className="btn btn-secondary mb-3">Cancel</button>
          </div>
          <div className="centering-container">
            <button className="btn btn-danger">Yes, Delete event</button>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

ConfirmDeleteComponent.propTypes = {
  del: PropTypes.bool.isRequired,
};

export default ConfirmDeleteComponent;
