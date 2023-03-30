import React from "react";
import { useEffect, useRef } from "react";
import SpotGallery from "./SpotGallery";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "antd";
export default function SpotCard(props) {
  console.log(props);
  const {
    s_Name,
    s_picture,
    s_Summary,
    s_OpenTime,
    s_Tel,
    s_Address,
    s_Category,
  } = props.spot;
  const tel_link = useRef();
  useEffect(() => {
    tel_link.current.href = `tel:${s_Tel}`;
  }, [s_Tel]);
  const category = s_Category.split(",");
  //console.log(s_Name);
  return (
    <div className="spotCard spotCard-container">
      <div className="spotTitle">
        <h4>{s_Name}</h4>
        <div className="spotCategory">
          {category.map((c) => {
            return <span>{c}</span>;
          })}
        </div>
      </div>
      <SpotGallery s_picture={s_picture}></SpotGallery>
      <div className="spotInfo">
        <ul>
          <li className="spotInfo__address">
            <FontAwesomeIcon
              icon="fa-solid fa-location-dot"
              className="spotInfo__icon"
            />
            <p>{s_Address}</p>
          </li>
          <li className="spotInfo__openTime">
            <FontAwesomeIcon
              icon="fa-regular fa-clock"
              className="spotInfo__icon"
            />
            <p>{s_OpenTime}</p>
          </li>
          <li className="spotInfo__tel">
            <FontAwesomeIcon
              icon="fa-solid fa-phone"
              className="spotInfo__icon"
            />
            <a href="true" ref={tel_link}>
              {s_Tel}
            </a>
          </li>
          <li className="spotInfo__summary">
            <FontAwesomeIcon
              icon="fa-regular fa-bookmark"
              className="spotInfo__icon"
            />
            <p>{s_Summary}</p>
          </li>
        </ul>
      </div>
      {/* {s_picture.map((picture) => (
        <img
          key={picture.sp_Id}
          alt={s_Name}
          src={`http://127.0.0.1:8000${picture.sp_URL}`}
          loading="lazy"
        ></img>
      ))} */}
    </div>
  );
}
