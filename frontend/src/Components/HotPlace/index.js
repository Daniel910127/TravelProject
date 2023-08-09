import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import SpotLittleCard from "../SpotLittleCard";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Box from "@mui/material/Box";
export default function HotPlace() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 使用axios進行資料請求
    axios
      .get("http://127.0.0.1:8000/api/spot/hot")
      .then((response) => {
        // 資料請求成功時，將資料更新到狀態中，並設置loading為false
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // 請求失敗時，你可能想要處理錯誤或給予使用者錯誤訊息
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); // 空的依賴陣列，表示只會在組件初始化時執行一次

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const firstEntry = entries[0];
  //       if (firstEntry.isIntersecting) {
  //         setPageNumber((prevPageNumber) => prevPageNumber + 1);
  //         // console.log(pageNumber);
  //       }
  //     }
  //     // { threshold: 1 }
  //   );
  //   observer.observe(document.querySelector("#sentinel"));

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <>
      <Typography variant="h4" color={"#444"} sx={{ textAlign: "center" }}>
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
        columns={{ xs: 1, sm: 2 }}
        alignItems="stretch"
        justifyItems={"center"}
      >
        {data.map((item, index) => {
          if (index < 4) {
            return (
              <Grid
                key={item.s_Id}
                xs={1}
                md={1}
                display={"flex"}
                flexBasis={300}
                justifyContent={"center"}
                flexGrow={1}
              >
                <SpotLittleCard
                  Id={item.s_Id}
                  Name={item.s_Name}
                  Pictures={item.s_picture}
                  District={item.s_District}
                ></SpotLittleCard>
              </Grid>
            );
          }
        })}
      </Grid>
      <Box sx={{display:'flex',justifyContent:'center',marginTop:'1rem'}}>
        <Button
          variant="outlined"
          endIcon={<ArrowRightIcon />}
          
        >
          查看更多熱門景點
        </Button>
      </Box>

      <div>
        {loading && <div>Loading...</div>}
        <div id="sentinel"></div>
      </div>
    </>
  );
}
