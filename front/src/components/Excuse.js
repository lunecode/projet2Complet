import React from "react";
import "./Excuse.css";

const Excuse = ({ excuse }) => {
  return (
    <div className="frame">
      <div className="copybutton">Copy</div>
      <div>"{excuse}"</div>
    </div>
  );
};

export default Excuse;
