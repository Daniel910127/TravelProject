import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { TravelInfoStateContext } from "../index";
import { useState, useContext } from "react";
import StayTime from "./stayTime";

const DragItem = styled.div`
  user-select: none;
  min-height: 50px;
  padding: 16px;
  font-size: 1em;
  text-align: center;
  background-color: #7895b2;
  color: #e8dfca;
  margin-bottom: 20px;
  position: relative;
`;

// const TimeAvatar = styled.div`
//   width: 24px;
//   height: 24px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 999px;
//   background-color: #e38b29;
//   color: black;
//   position: absolute;
//   right: 2%;
//   top: -20%;
// `;

const Card = ({ item, startTime, index, count }) => {
  const { name, order, stayTime, transportTime } = item;
  const {travelInfo,setTravelInfo} = useContext(TravelInfoStateContext)
  // console.log('@@@@',travelInfo);
  // console.log(startTime)
  const secToClock = {
    getHour: function (sec) {
      const hour = Math.floor(sec / 3600); // Divide seconds by 3600 to get the number of hours
      return hour < 10 ? "0" + hour : hour.toString();
    },

    getMin: function (sec) {
      const min = Math.floor((sec % 3600) / 60); // Calculate the remaining seconds after getting hours, divide by 60 to get minutes
      return min < 10 ? "0" + min : min.toString();
    },
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h4>
              {name}
              {count}
            </h4>
            <span>{`${startTime.getHours()} : ${startTime.getMinutes()}`}</span>
            <p>
              停留時間:{secToClock.getHour(stayTime)} :{" "}
              {secToClock.getMin(stayTime)}
            </p>
            <StayTime item={item}/>
            <p>
              到下個景點的時間:{secToClock.getHour(transportTime)} :
              {secToClock.getMin(transportTime)}
            </p>

            {/* {order} */}
            {/* {transportTime}
            {transportMode} */}

            {/* <TimeAvatar>{item.score}</TimeAvatar> */}
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default Card;
