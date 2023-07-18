import React from "react";

// import ItineraryList from "../../Components/ItineraryList";
import { ItineraryCreateProvider } from "../../contexts/ItineraryCreateContext";
import NewItineraryForm from "../../Components/NewItineraryForm";

export default function MyItineraryList() {
  return (
    <ItineraryCreateProvider>
      <NewItineraryForm />
    </ItineraryCreateProvider>
  );
}
