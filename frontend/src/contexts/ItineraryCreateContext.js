import React from "react";

import { useState, createContext } from "react";

const ItineraryCreateContext = createContext();

export function ItineraryCreateProvider({ children }) {
  const [itineraryCreateInfo, setItineraryCreateInfo] = useState({
    t_Name: null,
    playZone: null,
    custom: false,
    t_StartDate: null,
    t_StayDay: null,
    t_Privacy: null,
  });

  return (
    <ItineraryCreateContext.Provider
      value={{ itineraryCreateInfo, setItineraryCreateInfo }}
    >
      {children}
    </ItineraryCreateContext.Provider>
  );
}

export default ItineraryCreateContext;
