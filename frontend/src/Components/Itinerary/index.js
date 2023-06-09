import React from "react";
import { useState, createContext } from "react";

import { nanoid } from "nanoid";
import styled from "styled-components";
import { useEffect } from "react";
import ItineraryHeader from "./Header";
import Days from "./Days";
import Plan from "./Plan";
import "./style.css";
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
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100vh - 64px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

const DaysWrapper = styled.div`

  width:50px;
`;
const PlanWrapper = styled.div`
  width: 400px;
`;

const PlanContainer = styled.div`
 
  width: 100%;
  height: 100%;
 
`;

const MapWrapper = styled.div`
  background: #f1f1f1;
  position:relative;
  flex-grow: 1;
  ${'' /* overflow:hidden; */}
  ${
    "" /* position: fixed;
  top: 0;
  bottom: 0; */
  }
  ${"" /* right: 0; */}
`;

const ItineraryHeaderContainer = styled.div``;

const MapContainer = styled.div`
  ${"" /* position: relative; */}
  position:fixed;
  height:calc(100% - 64px);
  width: calc(100% - 450px);  
  ${'' /* right:0; */}
  ${'' /* overflow:hidden; */}
  background-color: #666;
`;

const TravelInfoStateContext = createContext({
  setTravelInfo: () => {},
  travelInfo: {},
  setDays: () => {},
  days: [],
  focusSpot: {},
  setFocusSpot: () => {},
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

  const [focusSpot, setFocusSpot] = useState({});

  useEffect(() => {
    setTravelInfo({
      t_Name:'台南三日遊',
      t_Description:'三天自由行',
      
      travelList: [
        {
          name: "台南景點A",
          location: { lng: 120.2027424, lat: 22.9927286 },
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
          location: { lng: 120.1991239, lat: 22.9897205 },
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
          location: { lng: 155.41666, lat: 36.21666 },
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

    setFocusSpot(travelList[0]);
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

  console.log(focusSpot,'@@@@')

  return (
    <TravelInfoStateContext.Provider
      value={{
        travelInfo,
        setTravelInfo,
        days,
        setDays,
        focusSpot,
        setFocusSpot,
      }}
    >
      <ItineraryContainer id="scroll-container">
        <DaysWrapper>
          <Days></Days>
        </DaysWrapper>
        <PlanWrapper>
          <PlanContainer>
            <ItineraryHeaderContainer>
              <ItineraryHeader />
            </ItineraryHeaderContainer>
            <Plan></Plan>
          </PlanContainer>
        </PlanWrapper>
        <MapWrapper>
          <MapContainer>
            <Map></Map>
          </MapContainer>
        </MapWrapper>
      </ItineraryContainer>
    </TravelInfoStateContext.Provider>
  );
}
export { TravelInfoStateContext };
export default Itinerary;
