import React from "react";
import ItineraryList from "../../Components/ItineraryList";

import { ItineraryListProvider } from "../../contexts/ItineraryListContext";
export default function MyItineraryList() {
  return (
    <ItineraryListProvider>
      <ItineraryList />
    </ItineraryListProvider>
  );
}
