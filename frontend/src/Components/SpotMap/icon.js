import L from "leaflet";
import mapIcon from "./iconmonstr-location-1.svg";

const iconLocation = (title) => {
  return new L.DivIcon({
    //iconUrl: mapIcon,
    html:
      `
      <div class="locationMark">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
      <span>${title}</span>
      </div>`,
    // iconAnchor: null,
    // popupAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(50,50),
    className: "location_icon",
    // className: 'leaflet-div-icon'
  });
};


export { iconLocation };
