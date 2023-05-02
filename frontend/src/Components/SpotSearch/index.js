import React from "react";
import SearchResult from "./SearchResult";
import SearchForm from "./SearchForm";
import SearchContext from "./SearchContext";

export default function SpotSearch() {
  
  return (
    <SearchContext>
      <SearchForm></SearchForm>
      <SearchResult></SearchResult>
    </SearchContext>
  );
}
