import React, { useContext, useState } from "react";
import { useMap, useMapEvent } from "react-leaflet/hooks";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TravelInfoStateContext } from "..";
import {pinIcon} from "./pinIcon";


function MyMap(props) {
  const map = useMap();
  const { setFocusSpot } = useContext(TravelInfoStateContext);
  map.flyTo(props.mapCenter, 16, true);
  map.on("moveend", () => {
    setFocusSpot(null);
  });
  return null;
}

export default function Map() {
  const {
    travelInfo: { travelList },
    days,
    focusSpot,
    setFocusSpot,
  } = useContext(TravelInfoStateContext);

  // console.log('focus',focusSpot,travelList)
  const center = focusSpot
    ? [focusSpot.location.s_Latitude, focusSpot.location.s_Longitude]
    : [travelList[0].location.s_Latitude, travelList[0].location.s_Longitude];

  const handleClickMarker = (spot) => {
    setFocusSpot(spot);
    // console.log(markerPosition);
    // setMapCenter(markerPosition);
  };
  const color = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];
  // const position = [51.505, -0.09];

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      {focusSpot ? <MyMap mapCenter={center} /> : <></>}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {travelList.map((spot, index) => {
        return (
          <Marker
            position={[spot.location.s_Latitude, spot.location.s_Longitude]}
            key={spot.s_Id}
            icon={pinIcon(index, color[spot.tls_Day % 4])}
            eventHandlers={{
              click: (event) => {
                // console.log(event.containerPoint);
                handleClickMarker(spot);
              }, // 在点击标记时调用事件处理程序
            }}
          ></Marker>
        );
      })}
      {/* <Marker position={position} icon={iconLocation(props.spot.s_Name)}>
        </Marker> */}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
