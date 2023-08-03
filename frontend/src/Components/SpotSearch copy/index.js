import React from "react";
import SearchResult from "./SearchResult";
import SearchForm from "./SearchForm";
import SearchContext from "./SearchContext";

import SearchDivider from "./SearchDivider";
export default function SpotSearch() {
  
  return (
    <SearchContext>
      <SearchForm></SearchForm>
      <SearchDivider />
      <SearchResult></SearchResult>
    </SearchContext>
  );
}
