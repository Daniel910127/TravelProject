import React from "react";
import NavBar from "../../Components/NavBar";
import HotPlace from "../../Components/HotPlace";
import Container from "@mui/material/Container";
import Banner from "../../Components/Banner";
import Box from "@mui/material/Box";
export default function Home() {
  return (
    <>
    

      <Container fixed>
        <Box sx={{ marginBottom: 3 }}>
          <Banner></Banner>
        </Box>
        <HotPlace></HotPlace>
      </Container>
    </>
  );
}
