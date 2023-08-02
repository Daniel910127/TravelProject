import L from "leaflet";
import mapIcon from "./iconmonstr-location-1.svg";

const pinIcon = (index, color) => {
  return new L.DivIcon({
    //iconUrl: mapIcon,
    html: `
      <div style="position:relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill=${color} stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>  
        <span style="position:absolute ; color: #fff ;top:40%;left:48%;transform:translate(-50%, -50% );font-size:14px;" >${index +1}</span>
      </div>`,
    // iconAnchor: null,
    // popupAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(50, 50),
    className: 'map-pin',
    // className: 'leaflet-div-icon'
  });
};

export { pinIcon };
