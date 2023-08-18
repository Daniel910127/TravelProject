import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SpotCard from "../../Components/SpotCard";
import SpotMap from "../../Components/SpotMap";
// import "./style.css";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import NotFound from "../../Views/NotFound";
import { authApi } from "../../utils/apis/authApi";
import { useParams } from 'react-router-dom';

const SpotCardWrapper = styled('div')(({ theme }) => ({
  position: "absolute",
  marginTop: "2rem",
  marginLeft: "2rem",
  zIndex: 999,
}));
const SpotMapWrapper = styled('div')(({ theme }) => ({
  position: "relative",
  height: "calc(100vh - 54px)",
  width: "100%",
  background: "red",
}));
export default function Spot({type}) {
  const [spot, setSpot] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log("spot view");
  useEffect(() => {
    console.log("get spot data");
    authApi
      .get(`http://127.0.0.1:8000/api/${type}/${id}/`)
      .then((response) => {
        console.log(response);
        setSpot(response.data.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="SpotView">
      {loading && <p>Loading...</p>}
      {spot && (
        <SpotCardWrapper >
          <SpotCard spot={spot}/>
        </SpotCardWrapper>
      )}
      {spot && (
        <SpotMapWrapper>
          <SpotMap spot={spot} />
        </SpotMapWrapper>
      )}
      {error && <NotFound></NotFound>}
    </div>
  );
}
