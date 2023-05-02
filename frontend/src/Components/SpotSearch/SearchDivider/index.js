import React, { useContext } from "react";
import { SearchStateContext } from "../SearchContext";
export default function SearchDivider() {
  const { resultSpots } = useContext(SearchStateContext);
  return (
    <div
      style={{
        margin: "24px 0",
        borderBottom: "1px solid #bbb",
        padding: "10px 0",
      }}
    >
      <p style={{ color: "#777" }}>共{resultSpots.length}個結果</p>
    </div>
  );
}
