import React from "react";

export default function MyButton(props) {
  const { title, isChecked } = props;
  return (
    <button
      style={{
        padding: "6px 12px",
        borderRadius: "16px",
        border: "none",
        backgroundColor: isChecked ?  "#1976d2" :"white",
        color:isChecked ? "white" : "black",
        transition: ".2s ease-in-out"
      }}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {title}
    </button>
  );
}
