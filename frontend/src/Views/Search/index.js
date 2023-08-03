import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import NavBar from "../../Components/NavBar";
import HotPlace from "../../Components/HotPlace";
import Container from "@mui/material/Container";
import Banner from "../../Components/Banner";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SpotSearch from "../../Components/SpotSearch";

import axios from "axios";

export default function Search({type}) {
  return (
    <>
      <NavBar />

      <Container fixed>
        <Typography variant="h4" color={"#444"} sx={{ textAlign: "center" }}>
          景點探索
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

        <SpotSearch type={type}></SpotSearch>
      </Container>
    </>
  );
}
