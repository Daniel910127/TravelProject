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
import { iconLocation } from "./icon";

function MyMap(props) {
  const map = useMap();
  const { x, y } = map.getSize();

  console.log(props);
  console.log(x, y);

  map.flyTo(props.mapCenter, 18, true);
  // map.setZoom(23)
  // map.setZoom(14)
  return null;
}

export default function Map() {
  const {
    travelInfo: { travelList },
    days,
    focusSpot,
  } = useContext(TravelInfoStateContext);


  console.log('@@@@',focusSpot);

  const [mapCenter, setMapCenter] = useState([focusSpot.location.lat, focusSpot.location.lng]);

  const handleClickMarker = (markerPosition) => {
    console.log(markerPosition);
    setMapCenter(markerPosition);

  };
  const color = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];
  // const position = [51.505, -0.09];

  return (
    <MapContainer
      center={mapCenter}
      zoom={23}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <MyMap mapCenter={mapCenter} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {travelList.map((spot, index) => {
        return (
          <Marker
            position={[spot.location.lat, spot.location.lng]}
            icon={iconLocation(index, color[spot.day % 4])}
            eventHandlers={{
              click: (event) => {
                console.log(event.containerPoint);
                handleClickMarker([spot.location.lat, spot.location.lng]);
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
