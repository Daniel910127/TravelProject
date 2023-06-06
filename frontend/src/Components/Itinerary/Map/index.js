import React from 'react'
import { MapContainer, TileLayer, Marker, Popup,ZoomControl ,Tooltip} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const position = [51.505, -0.09]
  return (
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
        {/* <Marker position={position} icon={iconLocation(props.spot.s_Name)}>
        </Marker> */}
        <ZoomControl position="bottomright" />
      </MapContainer>
  )
}
