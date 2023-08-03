import React, { useState } from "react";

export default function MyButton(props) {
  const { title, isChecked } = props;
  //const [isHover, setIsHover] = useState(false);
  return (
    <button
      style={{
        padding: "6px 12px",
        borderRadius: "16px",
        border: isChecked ? "1px solid #1976d2" : "1px solid #bbb",
        backgroundColor: isChecked ? "#1976d2" : "white",
        color: isChecked ? "white" : "black",
        transition: ".2s ease-in-out",
        cursor: "pointer" 
      }}
      onClick={(e) => {
        e.preventDefault();
      }}
      // onMouseEnter={() => {
      //   setIsHover(true);
      // }}
      // onMouseLeave={() => {
      //   setIsHover(false);
      // }}
    >
      {title}
    </button>
  );
}
