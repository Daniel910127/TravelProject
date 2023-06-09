import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { TravelInfoStateContext } from "../index";
import { useState, useContext } from "react";
import StayTime from "./stayTime";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import produce, { setAutoFreeze, setUseProxies } from "immer";
const DragItem = styled.div`
  user-select: none;
  ${"" /* min-height: 50px; */}
  padding: 16px;
  font-size: 1em;
  text-align: center;
  ${"" /* background-color: #7895b2; */}
  margin-bottom: 20px;
  position: relative;
`;

const Introduction = styled.div`
  background-color: #f3f4f5;
  padding: 16px;
`;

const Title = styled.h3`
  color: #545454;
`;

const Description = styled.p`
  color: #989898;
`;

const Card = ({ item, startTime, index, count }) => {
  const { name, order, stayTime, transportTime } = item;
  const { travelInfo, setTravelInfo, focusSpot, setFocusSpot } = useContext(
    TravelInfoStateContext
  );

  const [hover, setHover] = useState(false);
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
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            onClick={() => {
              setFocusSpot(item);
            }}
          >
            <Introduction>
              <Title>
                {name}
                {count}
              </Title>
              <span>{`${startTime.getHours()} : ${startTime.getMinutes()}`}</span>
              <p>
                停留時間:{secToClock.getHour(stayTime)} :{" "}
                {secToClock.getMin(stayTime)}
              </p>
              <StayTime item={item} startTime={startTime} />
              <p>
                到下個景點的時間:{secToClock.getHour(transportTime)} :
                {secToClock.getMin(transportTime)}
              </p>

              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => {
                  // console.log('kill ',item);
                  /* ajax delete travelList item  */
                  const newTravelList = produce((draft) => {
                    const targetItemIndex = draft.travelList.findIndex(
                      (i) => i.id === item.id
                    );
                    draft.travelList.splice(targetItemIndex, 1);
                  });

                  setTravelInfo(newTravelList);
                }}
                sx={{
                  visibility: hover ? "visible" : "hidden",
                  opacity: hover ? "1" : "0",
                  transition: "all .2s ease-in-out",
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Introduction>

            <Box>111</Box>

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
