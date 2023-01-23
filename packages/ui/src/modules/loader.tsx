import React from 'react';
import './loader.css'


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

export {Loader};