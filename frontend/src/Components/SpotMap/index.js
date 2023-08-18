import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { iconLocation } from "./icon";
import "./style.css";
import MarkerTitle from "./MarkerTitle";
import styled from "styled-components";
import trimPrefix from "../../utils/trimPrefix";


function SpotMap({spot}) {
  const trimSpot = trimPrefix(spot)
  const position = [trimSpot.Latitude,trimSpot.Longitude];
  return (
    
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          icon={iconLocation(trimSpot.Name)}
        ></Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>
   
  );
}

export default SpotMap;
