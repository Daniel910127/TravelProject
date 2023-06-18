import React, { useContext, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import styled from "styled-components";
import {
  Link,
  DirectLink,
  Element as ScrollElement,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

import { TravelInfoStateContext } from "..";
import { StrictModeDroppable } from "../../StrictModeDroppable";
import Card from "../Card";

const DropContextWrapper = styled.div`
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${"" /* gap: 17px; */}
  min-height: 500px;
  width: 100%;
`;

const DroppableContainer = styled.div`
  background-color: #f5efe6;
  min-height: 30px;
  height: 100%;
`;

const SectionWrapper = styled.div`
  flex-basis: 50%;
`;

const OnDay = styled.span`
  display: inline-block;
  background-color:${props => props.color};
  color: #fff;
  padding: 6px;
  border-radius: 6px;
`;
const PlanWrapper = styled.div``;

export default function Plan() {
  const { travelInfo, setTravelInfo, days, setDays } = useContext(
    TravelInfoStateContext
  );
  const { travelList, t_StartDate, dayCount, t_StartTime } = travelInfo;
  const color = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];

  const onDragEnd = (event) => {
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

    if (source.droppableId === destination.droppableId) {
      const destItems = Array.from(travelList).filter(
        (item) => item.tls_Day === destDay
      );
      const [removed] = destItems.splice(sourceIndex, 1);

      destItems.splice(destIndex, 0, removed);

      const newTravelList = travelList.filter(
        (item) => item.tls_Day !== destDay
      );
      // console.log(newTravelList, destItems)
      let tempItems = [...newTravelList, ...destItems];
      //day排序
      items = [];
      for (let day = 1; day <= dayCount; day++) {
        let dayArray = tempItems.filter((item) => item.tls_Day === day);
        items.push(...dayArray);
      }
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

      const newTravelList = travelList.filter(
        (item) => item.tls_Day !== sourceDay && item.tls_Day !== destDay
      );

      let tempItems = [...newTravelList, ...sourceItems, ...destItems];

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
    setTravelInfo({ ...travelInfo, travelList: items });

    //dropend ajax
    const data = items.filter((item) => `${item.s_Id}` === draggableId)[0];
    // console.log("axiosData", data);
  };

  return (
    <PlanWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <DropContextWrapper>
          {days.map((day, dayIndex) => {
            const currTime = new Date(t_StartDate);
            currTime.setUTCHours(-8); //時區-8
            {
              /* console.log(day, currTime); */
            }
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

                console.log("itemstart", startTime);

                return (
                  <Card
                    item={item}
                    startTime={startTime}
                    index={index}
                    key={item.s_Id}
                  />
                );
              });
            return (
              <SectionWrapper key={day}>
                <ScrollElement name={day}>
                  <OnDay color={color[(dayIndex + 1) % 4]}>{day}</OnDay>
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
                </ScrollElement>
              </SectionWrapper>
            );
          })}
        </DropContextWrapper>
      </DragDropContext>
    </PlanWrapper>
  );
}
