import React from "react";
import "./loader.css";


/**
 * Spinning loader for when you are waiting for a response
 * @returns Spinning loader
 */
const Loader = () => {
  return (
    <div className="pinwheel">
      <div className="pinwheel__line"></div>
      <div className="pinwheel__line"></div>
      <div className="pinwheel__line"></div>
      <div className="pinwheel__line"></div>
      <div className="pinwheel__line"></div>
      <div className="pinwheel__line"></div>
    </div>
  );
};

export { Loader };
