import React, { useState } from "react";

function useAlert() {
  const [type, setType] = useState("info");
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState(null);

  const AlertComponent = () => {
    if (heading || message) {
      return (
        <div className="Alert">
          <div
            className={`alert alert-${type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{`${heading ? heading : ""}`}</strong>{" "}
            {message ? message : ""}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </div>
      );
    }
    return <div></div>;
  };

  const setAlert = (obj) => {
    setType(obj.type);
    setHeading(obj.heading);
    setMessage(obj.message);
  };

  return [AlertComponent, setAlert];
}

export default useAlert;
