/* Ilana-Mahmea */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import photoDataArray from "../../util/exampleImagesData.js";

function ExamplePhotoSlideshow() {
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setCurrIndex((currIndex + 1) % photoDataArray.length),
      4000
    );
    return () => {
      clearTimeout(timeoutId);
    };
  }, [currIndex]);

  return (
    <div className="ExamplePhotoSlideshow">
      <img
        src={photoDataArray[currIndex].sourcePath}
        alt={photoDataArray[currIndex].altText}
      />
      <div className="credit-and-disclaimer row">
        <div className="credit row">
          <p>
            Photo by{" "}
            <Link to={photoDataArray[currIndex].photoByLink}>
              {photoDataArray[currIndex].photoBy}
            </Link>
          </p>
        </div>
        <br />
        <div className="disclaimer row">
          <p>
            This stock photo does not imply an endorsement of <i>Be Here</i> by
            the people featured.
          </p>
        </div>
      </div>
    </div>
  );
}

ExamplePhotoSlideshow.propTypes = {};

export default ExamplePhotoSlideshow;
