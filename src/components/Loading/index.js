import React from "react";
import "./styles.css";

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default Loading;
