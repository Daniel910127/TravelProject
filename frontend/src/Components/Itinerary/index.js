import React from "react";
import { useState, createContext } from "react";

import { nanoid } from "nanoid";
import styled from "styled-components";
import { useEffect } from "react";
import ItineraryHeader from "./Header";
import Days from "./Days";
import Plan from "./Plan";

import {
  Link,
  DirectLink,
  Element as ScrollElement,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import Map from "./Map";

const ItineraryContainer = styled.div`
  display: flex;
  width: 100%;
  ${"" /* flex-direction: column; */}
`;

const DaysContainer = styled.div``;
const PlanWrapper = styled.div`
  
  display: flex;
  flex-grow: 1;
`;

const PlanContainer = styled.div`
  width: 900px;
`;

const ItineraryHeaderContainer = styled.div``;

const MapContainer = styled.div`
  
  width: 100%;
  height: 100%;
  
  background-color: #666;
`;

const TravelInfoStateContext = createContext({
  setTravelInfo: () => {},
  travelInfo: {},
  days: [],
  setDays: () => {},
});

function Itinerary() {
  const [travelInfo, setTravelInfo] = useState({
    travelList: [],
    startDate: Date.now(),
    dayCount: 0,
    startTime: {},
  });
  // const prevTravelInfo = usePrevious(travelInfo)
  const [days, setDays] = useState([]);

  const [spotStartTime, setSpotStartTime] = useState();

  useEffect(() => {
    setTravelInfo({
      travelList: [
        {
          name: "台南景點A",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_001`,
          order: 1,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 1600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點B",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_567`,
          order: 2,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點C",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_111`,
          order: 3,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點D",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_346`,
          order: 4,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點E",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_235`,
          order: 5,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點F",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_136`,
          order: 6,
          day: 2,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點G",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_777`,
          order: 7,
          day: 2,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
      ],
      startDate: "2023-05-18",
      dayCount: 4,
      startTime: { 1: 28800, 2: 18800, 3: 28800, 4: 28800 },
    });
  }, []);

  const { travelList, dayCount, startTime, startDate } = travelInfo;

  useEffect(() => {
    const startDate = new Date(travelInfo.startDate);
    // console.log(currentDate.getDate() + 1)
    const updatedDays = [];
    startDate.setDate(startDate.getDate() - 1);
    for (let i = 1; i <= travelInfo.dayCount; i++) {
      startDate.setDate(startDate.getDate() + 1);
      updatedDays.push(`${startDate.getMonth() + 1}/${startDate.getDate()}`);
    }

    setDays(updatedDays);
  }, [travelInfo.dayCount]);

  return (
    <TravelInfoStateContext.Provider
      value={{ travelInfo, setTravelInfo, days, setDays }}
    >
      <ItineraryContainer>
        <DaysContainer>
          <Days></Days>
        </DaysContainer>
        <PlanWrapper>
          <PlanContainer>
            <ItineraryHeaderContainer>
              <ItineraryHeader />
            </ItineraryHeaderContainer>
            <Plan></Plan>
          </PlanContainer>

          <MapContainer>
            <Map></Map>
          </MapContainer>
        </PlanWrapper>
      </ItineraryContainer>
    </TravelInfoStateContext.Provider>
  );
}
export { TravelInfoStateContext };
export default Itinerary;
