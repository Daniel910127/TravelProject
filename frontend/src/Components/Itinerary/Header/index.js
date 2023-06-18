import React from "react";
import { useContext } from "react";
import { TravelInfoStateContext } from "..";
import "react-dates/initialize";
import DateRangePickerExample from "./DateRange";
import styled from "styled-components";
// import "./react_dates_overrides.css";

const HeaderWrapper = styled.div`
  position: relative;
  height: 260px;
  ${"" /* background-color: blue; */}
  background-size: cover;
  background-image: url(${(props) => props.bgImg});
  padding: 30px;
  margin-bottom: 100px;
`;

const InfoPanel = styled.div`
  position: relative;
  background-color: white;
  padding: 30px;
  border-radius: 9px;
  height: 180px;
  width: 100%;
  top: 60%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px;

  display:flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 32px;
    color: #545454;
    font-weight: 600;
  }
`;

export default function Header() {
  const { travelInfo, setTravelInfo } = useContext(TravelInfoStateContext);

  return (
    <HeaderWrapper bgImg={`https://picsum.photos/600/400`}>
      <InfoPanel>
        <h3>台南三日遊</h3>
        <div className="custom-picker">
          <DateRangePickerExample />
        </div>
      </InfoPanel>
    </HeaderWrapper>
  );
}
