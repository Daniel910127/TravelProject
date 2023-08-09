import React, { useContext } from "react";
import { SearchStateContext } from "../SearchContext";
import CustomMuiTypography from "../../CustomMuiTypography";
// import { Divider } from "@mui/material";
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
      <CustomMuiTypography variant="caption" >共{resultSpots.length}個結果</CustomMuiTypography>
      {/* <Divider variant="middle" /> */}
    </div>
  );
}
