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

const Item = styled.div`
  display: flex;
  ${"" /* padding: 16px; */}
  width: 100%;
  gap: 24px;
`;

const IntroductionContainer = styled.div`
  position: relative;
  background-color: #f3f4f5;
  width: 320px;
  padding: 12px;
  border-radius: 12px;
  z-index: 1;
`;

const Title = styled.h3`
  color: #545454;
`;

const Summary = styled.p`
  color: #989898;
`;

const IntroductionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ImgContainer = styled.div`
  flex-grow: 1;
  width: 200px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
`;

const Img = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const Transport = styled.div`
  position: relative;
  display: flex;
  left: 50px;
  ${"" /* height: 100px; */}
  ${"" /* border-left: 1px solid black; */}
  align-items: center;

  ::before {
    content: "";
    position: absolute;
    ${"" /* top: -40px; */}
    left: 0;
    width: 1px;
    height: 100px;
    background-color: red;
    opacity: 0.5;
  }
`;
const Card = ({ item, startTime, index, count }) => {
  const { s_Name, tl_StayTime, tl_TransportTime, s_Summary, s_Picture } = item;

  console.log(item, item.s_Picture);

  const { travelInfo, setTravelInfo, focusSpot, setFocusSpot } = useContext(
    TravelInfoStateContext
  );

  // console.log('startTime',startTime)

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
    <Draggable draggableId={`${item.s_Id}`} index={index}>
      {(provided, snapshot) => {
        const style = {
          ...provided.draggableProps.style,
          backgroundColor: snapshot.isDragging ? "blue" : "white",
          fontSize: 18,
          marginBottom:0
        };

        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={style}
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
            <Transport>
              <span>{tl_TransportTime}</span>
            </Transport>

            <Item>
              <IntroductionContainer>
                <IntroductionHead>
                  <Title>
                    {s_Name}
                    {/* {count} */}
                  </Title>
                  {/* <span>{`${startTime.getHours()} : ${startTime.getMinutes()}`}</span> */}
                  {/* <p>
                    停留時間:{secToClock.getHour(tl_StayTime)} :{" "}
                    {secToClock.getMin(tl_StayTime)}
                  </p> */}
                  <StayTime item={item} startTime={startTime} />
                  {/* <p>
                    到下個景點的時間:{secToClock.getHour(tl_TransportTime)} :
                    {secToClock.getMin(tl_TransportTime)}
                  </p> */}
                </IntroductionHead>
                <Summary>{s_Summary}</Summary>
              </IntroductionContainer>

              <ImgContainer>
                <Img src={`http://127.0.0.1:8000${s_Picture[0].sp_URL}`}></Img>
              </ImgContainer>

              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => {
                  // console.log('kill ',item);
                  /* ajax delete travelList item  */
                  const newTravelList = produce((draft) => {
                    const targetItemIndex = draft.travelList.findIndex(
                      (i) => i.s_Id === item.s_Id
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
            </Item>

            {/* {order} */}
            {/* {tl_TransportTime}
            {transportMode} */}

            {/* <TimeAvatar>{item.score}</TimeAvatar> */}
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default Card;
