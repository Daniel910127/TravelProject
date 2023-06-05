import ItineraryComp from "../../Components/Itinerary";

import NavBar from "../../Components/NavBar";
import HotPlace from "../../Components/HotPlace";
import Container from "@mui/material/Container";
import Banner from "../../Components/Banner";
import Box from "@mui/material/Box";
import React from "react";

export default function Itinerary() {
  return (
    <>
      <NavBar />
      <Box sx={{ position: "absolute", top: "64px",width:'100%'}}>
        <ItineraryComp></ItineraryComp>
      </Box>
    </>
  );
}
