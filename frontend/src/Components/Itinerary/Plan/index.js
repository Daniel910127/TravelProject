import React, { useContext, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import axios from "axios";

import {
  Link,
  DirectLink,
  Element as ScrollElement,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

import { styled } from "@mui/material/styles";

import { TravelInfoStateContext } from "..";
import { StrictModeDroppable } from "../../StrictModeDroppable";
import CustomMuiTextField from "../../CustomMuiTextField";

import Card from "../Card";

import updateOrderAPI from "../../../utils/updateOrderAPI";
import DayStartTime from "../DayStartTime";
import SearchSpot from "../SearchSpot";
import RecommendSwiper from "../RecommendSwiper";

const DropContextWrapper = styled("div")(({ theme }) => ({
  position: 'relative',
  fontFamily: 'sans-serif',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '500px',
}));

const DroppableContainer = styled("div")(({ theme }) => ({
  minHeight: '60px',
  height: '100%',
}));

const SectionWrapper = styled("div")(({ theme }) => ({
  marginBottom: '2rem',
}));

const DayHeader = styled("div")(({ theme }) => ({
  
  display: 'flex',
  padding:'0 30px',
  alignItems:'center',

}));

const OnDay  = styled("span")(({ theme,color}) => ({
  display: 'inline-block',
  backgroundColor: color,
  color: '#fff',
  padding: '6px',
  borderRadius: '6px',
  
  marginRight: '.6rem',
}));



const AddMoreContainer = styled("div")(({ theme }) => ({
  margin:'0 30px',
  paddingBottom:'24px',
  borderBottom: `1px solid ${theme.palette.divider}`,
}))


export default function Plan() {
  const { travelInfo, setTravelInfo, days, setDays } = useContext(
    TravelInfoStateContext
  );

  const {
    travelList,
    t_StartDate,
    dayCount,
    t_StartTime,
    t_StartTime: dayStartTime,
  } = travelInfo;
  const color = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];

  const onDragEnd = async (event) => {
    const { source, destination, draggableId } = event;
    // console.log(event);
    let items = Array.from(travelList);

    if (!destination) {
      return;
    }

    const sourceDay = parseInt(source.droppableId);
    const destDay = parseInt(destination.droppableId);
    const sourceIndex = source.index;
    const destIndex = destination.index;

    if (sourceDay === destDay && sourceIndex === destIndex) {
      return;
    }

    if (sourceDay === destDay) {
      const destItems = Array.from(travelList).filter(
        (item) => item.tls_Day === destDay
      );
      const [removed] = destItems.splice(sourceIndex, 1);

      destItems.splice(destIndex, 0, removed);

      const anotherTravelList = travelList.filter(
        (item) => item.tls_Day !== destDay
      );

      // console.log(anotherTravelList, destItems)
      let tempItems = [...anotherTravelList, ...destItems];

      //day排序
      items = [];
      for (let day = 1; day <= dayCount; day++) {
        let dayItems = tempItems.filter((item) => item.tls_Day === day);
        items.push(...dayItems);
      }

      console.log("同天", items);
    } else {
      const sourceItems = Array.from(travelList).filter(
        (item) => item.tls_Day === sourceDay
      );
      const [removed] = sourceItems.splice(sourceIndex, 1);
      const destItems = Array.from(travelList).filter(
        (item) => item.tls_Day === destDay
      );
      destItems.splice(destIndex, 0, removed);

      // Update order of items in the source day
      sourceItems.forEach((item, index) => {
        // console.log("@", item);
        item.tls_Day = sourceDay;
      });

      // Update order of items in the destination day
      destItems.forEach((item, index) => {
        item.tls_Day = destDay;
      });

      const anotherTravelList = travelList.filter(
        (item) => item.tls_Day !== sourceDay && item.tls_Day !== destDay
      );

      let tempItems = [...anotherTravelList, ...sourceItems, ...destItems];

      items = [];
      for (let day = 1; day <= dayCount; day++) {
        let dayArray = tempItems.filter((item) => item.tls_Day === day);
        items.push(...dayArray);
      }
    }

    const itemIndex = items.findIndex((item) => `${item.s_Id}` === draggableId);

    const preOrder = items[itemIndex - 1]
      ? items[itemIndex - 1].tl_Order
      : false;

    const nextOrder = items[itemIndex + 1]
      ? items[itemIndex + 1].tl_Order
      : false;
    // console.log(preOrder, nextOrder);
    let updateOrder;
    if (!preOrder) {
      updateOrder = (0 + items[1].tl_Order) / 2;
    } else if (!nextOrder) {
      updateOrder = items[items.length - 2].tl_Order + 1;
    } else {
      updateOrder = (preOrder + nextOrder) / 2;
    }

    items[itemIndex].tl_Order = updateOrder;

    items.sort((a, b) => a.tl_Order - b.tl_Order);
    // console.log(items)

    const updateOrderData = items.filter(
      (item) => `${item.s_Id}` === draggableId
    )[0];

    /* console.log(updateOrderData);
    console.log(destDay, updateOrder);

    try {
      const updateTravelList = await updateOrderAPI(
        `https://private-bee5ac-travel36.apiary-mock.com/api/itinerary/1/detail`,
        {
          tl_Order: updateOrder,
          tls_Day: destDay,
        }
      );

      console.log("updateTravelList", updateTravelList);
      setTravelInfo(updateTravelList);
    } catch (err) {
      console.log(err);
    } */ //後端api完成才能接

    setTravelInfo({ ...travelInfo, travelList: items }); //前端暫時測試功能

    //dropend ajax

    // console.log("axiosData", data);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DropContextWrapper>
        {days.map((day, dayIndex) => {
          const currTime = new Date(t_StartDate);
          currTime.setUTCHours(-8); //時區-8
          currTime.setDate(currTime.getDate() + dayIndex - 1);
          currTime.setTime(
            currTime.getTime() + t_StartTime[dayIndex + 1] * 1000
          );
          const DroppableItems = travelList
            .filter((item) => item.tls_Day === dayIndex + 1)
            .map((item, index) => {
              const startTime = new Date(currTime.getTime());
              currTime.setTime(
                currTime.getTime() +
                  item.tl_TransportTime * 1000 +
                  item.tl_StayTime * 1000
              );

              // console.log(item)
              const orderIndex = travelList.findIndex((i) => {
                return i.tl_Id === item.tl_Id;
              });

              return (
                <Card
                  item={item}
                  startTime={startTime}
                  index={index}
                  key={item.s_Id}
                  orderIndex={orderIndex}
                />
              );
            });

          // console.log(first)
          return (
            <SectionWrapper key={day}>
              <ScrollElement name={day}>


                <DayHeader>
                  <OnDay color={color[(dayIndex + 1) % 4]}>
                    第{dayIndex + 1}天
                  </OnDay>
                  {dayStartTime[dayIndex + 1] && (
                    <DayStartTime
                      day={dayIndex + 1}
                      time={dayStartTime[dayIndex + 1]}
                    />
                  )}
                </DayHeader>

                <StrictModeDroppable droppableId={`${dayIndex + 1}`}>
                  {(provided, snapshot) => (
                    <DroppableContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {DroppableItems}
                      {provided.placeholder}
                    </DroppableContainer>
                  )}
                </StrictModeDroppable>

                <AddMoreContainer>
                  <SearchSpot />
                  <RecommendSwiper></RecommendSwiper>
                </AddMoreContainer>
              </ScrollElement>
            </SectionWrapper>
          );
        })}
      </DropContextWrapper>
    </DragDropContext>
  );
}
