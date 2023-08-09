import React from "react";
import SearchResult from "./SearchResult";
import SearchForm from "./SearchForm";
import SearchContext from "./SearchContext";

import SearchDivider from "./SearchDivider";
export default function SpotSearch({type}) {
  console.log(type)
  return (
    <SearchContext type={type}>
      <SearchForm type={type}></SearchForm>
      <SearchDivider />
      
      <SearchResult></SearchResult>
    </SearchContext>
  );
}
