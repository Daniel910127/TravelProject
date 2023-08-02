
import { Draggable } from "react-beautiful-dnd";
import { TravelInfoStateContext } from "../index";
import { useState, useContext } from "react";
import StayTime from "./stayTime";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import produce, { setAutoFreeze, setUseProxies } from "immer";
import secToClock from "../../../utils/secToClock";
import toStrClock from "../../../utils/toStrClock";
import PinIcon from "./PinIcon";
import CustomMuiTypography from "../../CustomMuiTypography";
import { styled } from "@mui/material/styles";
const DragItem = styled("div")(({ theme }) => ({
  userSelect: 'none',

  padding:'16px 52px',
  fontSize: '1em',
  textAlign: 'center',

  marginBottom: '20px',
  position: 'relative',
  textAlign: 'left',
  width: '100%',
}))

const Item = styled("div")(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: '1rem',
}))

const IntroductionContainer = styled("div")(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'white',
  padding: '20px',
  width:'100%',
  borderRadius: '12px',
  display:'flex',
  gap:'8px',
  flexDirection: 'column-reverse',
  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    flexDirection: 'row'
    
 },
}))

const IntroPanel = styled("div")(({ theme }) => ({
  flex: '1.3 1',
}))

const ImgContainer = styled("div")(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  flex: '1 1',
  aspectRatio: '4 / 3',
  [`@media screen and (min-width: ${theme.breakpoints.values.md}px)`]: {
    alignSelf: 'start',
 },
}))

const IntroductionHead = styled("div")(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
}))

const Img = styled("img")(({ theme }) => ({
  objectFit: 'cover',
  width:'100%',
  height:'100%',
  
}))

const Transport = styled("div")(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  left: '50px',
  alignItems: 'center',

  '::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    width: '1px',
    height: '100px',
    backgroundColor: 'red',
    opacity: 0.5,
  }
}));




const color = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];
const Card = ({ item, startTime, index, orderIndex }) => {
  const { s_Name, tl_StayTime, tl_TransportTime, s_Summary, s_Picture } = item;

  // console.log(item, item.s_Picture);

  const { travelInfo, setTravelInfo, focusSpot, setFocusSpot } = useContext(
    TravelInfoStateContext
  );

  // console.log('startTime',startTime)

  const [hover, setHover] = useState(false);

  return (
    <Draggable draggableId={`${item.s_Id}`} index={index}>
      {(provided, snapshot) => {
        // console.log(provided, "provider");
        const style = {
          ...provided.draggableProps.style,
          borderLeft: snapshot.isDragging ? "4px solid blue" : "4px solid transparent",
          fontSize: 18,
          marginBottom: 0,
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
            {index !== 0 ? (
              <Transport>
                <span>
                  {toStrClock(
                    secToClock.getHour(tl_TransportTime),
                    secToClock.getMin(tl_TransportTime)
                  )}
                </span>
              </Transport>
            ) : null}

            <Item>
              <IntroductionContainer>
                <IntroPanel>
                  <PinIcon index={orderIndex} color={color[item.tls_Day % 4]} />
                  <IntroductionHead>
                    <CustomMuiTypography variant={"h6"}>
                      {s_Name}
                    </CustomMuiTypography>
                    <StayTime item={item} startTime={startTime} />
                  </IntroductionHead>
                  <CustomMuiTypography variant={"body2"}>
                    {s_Summary}
                  </CustomMuiTypography>
                </IntroPanel>

                <ImgContainer>
                  <Img src={`https://picsum.photos/300/200`}></Img>
                </ImgContainer>
              </IntroductionContainer>

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
                  height: "40px",
                  width: "40px",
                  position: "absolute",
                  top: "16px",
                  right: "6px",
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
