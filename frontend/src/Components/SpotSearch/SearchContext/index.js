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
  const spotFilter = (
    checkedCategoryTitles = [],
    checkedRegionsTitles = [],
    keyword = ""
  ) => {
    const newFilterSpots = spots.filter((spot) => {
      const isCategoryMatch =
        checkedCategoryTitles.length === 0
          ? true
          : checkedCategoryTitles.some((title) =>
              spot.s_Category.includes(title)
            );
      // console.log('checkedRegionsTitles',checkedRegionsTitles)
      const isRegionMatch =
        checkedRegionsTitles.length === 0
          ? true
          : checkedRegionsTitles.some((region) =>
              spot.s_District.includes(region)
            );

      const isKeywordMatch =
        keyword.length === 0 ? true : spot.s_Name.includes(keyword);
      return isCategoryMatch && isRegionMatch && isKeywordMatch;
    });

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
    if (
      searchParams.getAll("category").length === 0 &&
      searchParams.getAll("region").length === 0 &&
      searchParams.getAll("keyword").length === 0
    ) {
      //無query
      setFilterSpots(spots);
      setResultSpots(spots);
    } else {
      const newFilterSpots = spotFilter(
        searchParams.getAll("category"),
        searchParams.getAll("region"),
        searchParams.get("keyword")
      );

      // console.log('newFilterSpots',newFilterSpots);
      setFilterSpots(newFilterSpots);
      setResultSpots(newFilterSpots);
    }
  }, [spots, searchParams]);

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
