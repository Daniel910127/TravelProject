import React, { useContext, useState } from "react";
import produce from "immer";
import { TravelInfoStateContext } from "..";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../StrictModeDroppable";


export default function Days() {
  const { travelInfo, setTravelInfo } = useContext(TravelInfoStateContext);
  const { travelList, startDate, dayCount, startTime } = travelInfo;



  return <div>Days</div>;
}
