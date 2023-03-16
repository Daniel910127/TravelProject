import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SpotCard from "../../Components/SpotCard";
import SpotMap from "../../Components/SpotMap";
import './style.css'

export default function Spot() {
  const [spot_list, setSpotList] = useState([]);

  useEffect(() => {
    axios({
      url: "http://127.0.0.1:8000/api/spot-image-list/",
      method: "GET",
    })
      .then((response) => {
        //console.log(response);
        setSpotList(response.data);
      })
      .catch((err) => console.err(err));
  }, []);

  return (
    <div className="SpotView">
      {spot_list.length > 0 && <SpotCard {...spot_list[0]} /> }
      {spot_list.length >0 && <SpotMap {...spot_list[0]}/>}
    </div>
  );
}
