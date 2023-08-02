import React from "react";

export default function PinIcon({ index, color }) {
  return (
    <div style={{ position: "absolute",top:0,left:0,transform: "translate(-50%, 0 )" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill={color}
        stroke="#fff"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="10" r="3" />
        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
      </svg>
      <span
        style={{
          position: "absolute",
          color: "#fff",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50% )",
          fontSize: "14px",
        }}
      >
        {index + 1}
      </span>
    </div>
  );
}
