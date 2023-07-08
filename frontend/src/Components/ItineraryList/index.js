import React from "react";
import ItineraryInfoCard from "./ItineraryInfoCard";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useState, useEffect, useContext } from "react";
import ItineraryListContext from "../../contexts/ItineraryListContext";
export default function ItineraryList() {
  const { itineraryList } = useContext(ItineraryListContext);

  return itineraryList ? (
    <Grid container spacing={2}>
      {itineraryList.map((itinerary) => {
        const { t_Id, t_Name, t_StartDate, t_StayDay } = itinerary;

        return (
          <Grid xs={12} sm={4} key={t_Id}>
            <ItineraryInfoCard
              t_Id={t_Id}
              t_Name={t_Name}
              t_StartDate={t_StartDate}
              t_StayDay={t_StayDay}
            />
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <div>loading...</div>
  );
}
