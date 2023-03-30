import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SpotCard from "../../Components/SpotCard";
import SpotMap from "../../Components/SpotMap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import NotFound from "../../Views/NotFound";

export default function Spot() {
  const [spot, setSpot] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("get spot data");
    axios({
      url: "http://127.0.0.1:8000/api/spot/七股鹽山/",
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        setSpot(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  },[]);

  return (
    <div className="SpotView">
      {loading && <p>Loading...</p>}
      {spot && <SpotCard spot={spot} />}
      {spot && <SpotMap spot={spot} />}
      {error && <NotFound></NotFound>}
    </div>
  );
}
