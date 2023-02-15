import React from "react";
import "./index.css";

const HeaderComponent = ({ heading }) => {
  return (
    <div className="heading-component">
      <p>{heading}</p>
    </div>
  );
};

export default HeaderComponent;
