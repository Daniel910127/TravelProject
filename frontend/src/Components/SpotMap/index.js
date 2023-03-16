import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup,ZoomControl ,Tooltip} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {iconLocation} from './icon'
import './style.css'
import MarkerTitle from "./MarkerTitle";
function SpotMap(props) {
  const position = [props.s_Latitude, props.s_Longtitude];
  return (
    <div className="spotMap">
      {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height:'100px'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
        </MapContainer> */}
      <MapContainer
        center={position}
        zoom={23}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={iconLocation(props.s_Name)}>
        </Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}

export default SpotMap;
