import React, { useContext, useEffect } from "react";
import { useState, createContext } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";

const SearchStateContext = createContext({});

export default function SearchContext(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [spots, setSpots] = useState([]);

  const [filterSpots, setFilterSpots] = useState([]);
  const [resultSpots, setResultSpots] = useState([]);
  const spotFilter = (checkedCategoryTitles,) => {
    const newFilterSpots = spots.filter((spot) =>
      checkedCategoryTitles.some((title) => spot.s_Category.includes(title))
    );
    return newFilterSpots;
  };

  /* first load  */
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/hot-place")
      .then((response) => response.data)
      .then((data) => {
        setSpots(data);
      });
  }, []);

  useEffect(() => {
    if (searchParams.getAll("category").length === 0) {
      //有query
      setFilterSpots(spots);
      setResultSpots(spots);
    } else {
      const newFilterSpots = spotFilter(searchParams.getAll("category"));
      setFilterSpots(newFilterSpots);
      setResultSpots(newFilterSpots);
    }
  }, [spots,searchParams]);

  /*---------------------------------------------------------------- */

  // useEffect(() => {
  //   if (searchParams.getAll("category").length === 0) {
  //     //   console.log("0000");
  //     setFilterSpots(spots);
  //     setResultSpots(spots);
  //   } else {
  //     setResultSpots(filterSpots);
  //   }
  //   //console.log("searchParams chage");
  // }, [searchParams]);

  //console.log(searchParams.getAll("category"));
  //console.log(filterSpots);
  return (
    <SearchStateContext.Provider
      value={{
        searchParams,
        setSearchParams,
        spots,
        setSpots,
        filterSpots,
        setFilterSpots,
        resultSpots,
        setResultSpots,
        spotFilter,
      }}
    >
      {props.children}
    </SearchStateContext.Provider>
  );
}

export { SearchStateContext };
