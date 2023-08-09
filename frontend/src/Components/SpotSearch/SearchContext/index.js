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
              spot.Category.includes(title)
            );
      // console.log('checkedRegionsTitles',checkedRegionsTitles)
      const isRegionMatch =
        checkedRegionsTitles.length === 0
          ? true
          : checkedRegionsTitles.some((region) =>
              spot.District.includes(region)
            );

      const isKeywordMatch =
        keyword.length === 0 ? true : spot.Name.includes(keyword);
      return isCategoryMatch && isRegionMatch && isKeywordMatch;
    });

    return newFilterSpots;
  };




  /* first load  */
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/${props.type}`)
      .then((response) => response.data)
      .then((data) => {
        data.sort(function(spot1, spot2) {
          return spot2.Reviews - spot1.Reviews;
        });

        const newData = data.map((originalObject) => {
          const newObject = {};
          for (const key in originalObject) {
            if (originalObject.hasOwnProperty(key)) {
              const newKey = key.replace(/^(s|f|h)_/, ''); // 使用正则表达式去掉 s_
              newObject[newKey] = originalObject[key];
            }
          }
          return newObject;
        });
        // console.log(newData);
        setSpots(newData);
      });
  }, [props.type]);

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
