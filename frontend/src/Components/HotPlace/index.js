import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import SpotLittleCard from "../SpotLittleCard";
import Typography from "@mui/material/Typography";
export default function HotPlace() {
  // const [hotPlace, setHotPlace] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/hot-place?_limit=10&_page=1")
  //     .then((response) => {
  //       setHotPlace(response.data);
  //     });
  // }, []);

  // return <div>HotPlace2</div>

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  let init = false;
  useEffect(() => {
    if (init) return;
    if (loading) return;
    setLoading(true);
    console.log(pageNumber);
    fetch(`http://localhost:3000/hot-place?_limit=10&_page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setItems((prevItems) => [...prevItems, ...data]);
        setLoading(false);
      });
    return () => {
      init = true;
    };
  }, [pageNumber]);

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
        sx={{ textAlign: "center", }}
      >
        熱門景點
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
        {loading && <div>Loading...</div>}
        <div id="sentinel"></div>
      </div>
    </>
  );
}
