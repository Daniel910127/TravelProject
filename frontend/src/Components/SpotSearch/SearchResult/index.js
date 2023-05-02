import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import SpotLittleCard from "../../SpotLittleCard";
import Typography from "@mui/material/Typography";
import { SearchStateContext } from "../SearchContext";
export default function SearchResult() {
  const { resultSpots } = useContext(SearchStateContext);
  const [items, setItems] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  // let init = false;
  console.log("result", resultSpots);
  useEffect(() => {
    console.log("setitems");
    setItems([]);
    setPageNumber(0);
  }, [resultSpots]);

  useEffect(() => {
    // if (init) return;
    // if (loading) return;
    // setLoading(true);
    //console.log(pageNumber);
    //0~10   10~20
    setItems((prevItems) => {
      // console.log(
      //   "slice",
      //   0 + 10 * pageNumber,
      //   10 + 10 * pageNumber,
      //   resultSpots.slice(0 + 10 * pageNumber, 10 + 10 * pageNumber)
      // );
      return [
        ...prevItems,
        ...resultSpots.slice(0 + 10 * pageNumber, 10 + 10 * pageNumber),
      ];
    });
    //setLoading(false);

    // return () => {
    //   init = true;
    // };
  }, [pageNumber, resultSpots]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
          // console.log(pageNumber);
        }
      }
      // { threshold: 1 }
    );
    observer.observe(document.querySelector("#sentinel"));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        color={"#444"}
        sx={{ textAlign: "center", mt: "200px" }}
      >
        過濾景點
      </Typography>
      <span
        style={{
          backgroundColor: "#1976d2",
          display: "block",
          height: "4px",
          width: "100px",
          margin: "4px auto 20px auto",
        }}
      ></span>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 9, md: 16 }}
        alignItems="stretch"
        justifyItems={"center"}
      >
        {items.map((item) => (
          <Grid
            key={item.s_Id}
            xs={2}
            sm={3}
            md={4}
            display={"flex"}
            flexBasis={300}
            justifyContent={"center"}
            flexGrow={1}
          >
            <SpotLittleCard
              s_Id={item.s_Id}
              s_Name={item.s_Name}
              s_Pictures={item.s_picture}
              s_District={item.s_District}
            ></SpotLittleCard>
          </Grid>
        ))}
      </Grid>
      <div>
        {/* {loading && <div>Loading...</div>} */}
        <div id="sentinel"></div>
      </div>
    </>
  );
}
