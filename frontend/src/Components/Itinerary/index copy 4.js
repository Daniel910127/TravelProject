import React from "react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../StrictModeDroppable";
import Card from "./Card";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { useEffect } from "react";

const DropContextWrapper = styled.div`
  font-family: sans-serif;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 17px;
  min-height: 500px;
`;

const DroppableContainer = styled.div`
  background-color: #f5efe6;
  height: 100%;
`;

const SectionWrapper = styled.div`
  flex-basis: 50%;
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  position: relative;
`;

const SectionTitleInfo = styled.p`
  position: absolute;
  top: 0;
  right: 0;
`;

const WarningText = styled.p`
  color: red;
`;

function Itinerary() {
  const [travelList, setTravelList] = useState([]);
  // const [dayCount, setDayCount] = useState();
  /* {
    day1: {
      items: [
        {
          content: "台南景點A",
          id: nanoid(),
          order: 1,
        },
        { content: "台南景點B", id: nanoid(), order: 2 },
        { content: "台南景點C", id: nanoid(), order: 3 },
        {
          content: "台南景點D",
          id: nanoid(),
          order: 4,
        },
      ],
    },
    day2: {
      items: [
        {
          content: "台南景點E",
          id: nanoid(),
          order: 5,
        },
      ],
    },
  } */

  useEffect(() => {
    setTravelList([
      {
        content: "台南景點A",
        id: nanoid(),
        order: 1,
        day: 1,
      },
      { content: "台南景點B", id: nanoid(), order: 2, day: 1 },
      { content: "台南景點C", id: nanoid(), order: 3, day: 1 },
      {
        content: "台南景點D",
        id: nanoid(),
        order: 4,
        day: 1,
      },
      {
        content: "台南景點E",
        id: nanoid(),
        order: 5,
        day: 2,
      },
    ]);
  }, []);

  // 將數據按 day 分組

  // useEffect(travelList)

  // const groupedData = travelList.reduce((acc, item) => {
  //   const { day, ...rest } = item;
  //   acc[day] = [...(acc[day] || []), rest];
  //   return acc;
  // }, {});

  // console.log(groupedData);
  // // const [totalScoreSum, setTotalScoreSum] = useState(0);

  const onDragEnd = (event) => {
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    const sourceDay = parseInt(source.droppableId);
    const destDay = parseInt(destination.droppableId);
    const sourceIndex = source.index;
    const destIndex = destination.index;

    if (sourceDay === destDay) {
      // Reorder items within the same day
      const items = Array.from(travelList);
      const [removed] = items.splice(sourceIndex, 1);
      items.splice(destIndex, 0, removed);

      // Update order of items within the same day
      items.forEach((item, index) => {
        if (item.day === sourceDay) {
          item.order = index + 1;
        }
      });

      setTravelList(items);
    } else {
      // Move item to a different day
      const sourceItems = Array.from(travelList).filter(
        (item) => item.day === sourceDay
      );
      const [removed] = sourceItems.splice(sourceIndex, 1);
      const destItems = Array.from(travelList).filter(
        (item) => item.day === destDay
      );
      destItems.splice(destIndex, 0, removed);

      // Update order of items in the source day
      sourceItems.forEach((item, index) => {
        item.day = sourceDay;
        item.order = index + 1;
      });

      // Update order of items in the destination day
      destItems.forEach((item, index) => {
        item.day = destDay;
        item.order = index + 1;
        if (!item.id) {
          item.id = nanoid();
        }
      });

      const newTravelList = travelList.filter(
        (item) => item.day !== sourceDay && item.day !== destDay
      );

      setTravelList([...newTravelList, ...sourceItems, ...destItems]);
    }

    /* if (sourceDay === destDay) {
      // Reorder items within the same day
      const items = Array.from(travelList);
      console.log('@items',items);
      const removed = items[sourceIndex];
      console.log('@remove',removed);
      
      items.splice(sourceIndex, 1);
      items.splice(destIndex, 0, removed);
      setTravelList(items);
    } else {
      // Move item to a different day
      const sourceItems = Array.from(travelList).filter(
        (item) => item.day === sourceDay
      );
      
      const [removed] = sourceItems.splice(sourceIndex, 1);
      const destItems = Array.from(travelList).filter(
        (item) => item.day === destDay
      );
      destItems.splice(destIndex, 0, removed);

      const newTravelList = travelList.filter(
        (item) => item.day !== sourceDay && item.day !== destDay
      );

      console.log([...newTravelList, ...sourceItems, ...destItems]);
      setTravelList([...newTravelList, ...sourceItems, ...destItems]);
    } */
  };

  const days = Array.from(new Set(travelList.map((item) => item.day))).sort();
  // console.log("@days", days);
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <DropContextWrapper>
          {days.map((day) => {
            return (
              <SectionWrapper key={day}>
                <h2>{day}</h2>

                <StrictModeDroppable droppableId={`${day}`}>
                  {(provided, snapshot) => (
                    <DroppableContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {travelList
                        .filter((item) => item.day === day)
                        .map((item, index) => (
                          <Card item={item} index={index} key={item.id} />
                        ))}
                      {provided.placeholder}
                    </DroppableContainer>
                  )}
                </StrictModeDroppable>
              </SectionWrapper>
            );
          })}
        </DropContextWrapper>
      </DragDropContext>
    </>
  );
}

export default Itinerary;
