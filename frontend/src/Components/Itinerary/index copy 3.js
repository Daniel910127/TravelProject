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
  const [dayCount, setDayCount] = useState(0);
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
        id: `111`,
        order: 1,
        day: 1,
      },
      { content: "台南景點B", id: `222`, order: 2, day: 1 },
      { content: "台南景點C", id: `333`, order: 3, day: 1 },
      {
        content: "台南景點D",
        id: `444`,
        order: 4,
        day: 1,
      },
      {
        content: "台南景點E",
        id: `555`,
        order: 5,
        day: 2,
      },
      {
        content: "台南景點F",
        id: `666`,
        order: 6,
        day: 3,
      },
      {
        content: "台南景點G",
        id: `777`,
        order: 7,
        day: 4,
      },
    ]);
    setDayCount(4)
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
    const { source, destination, draggableId } = event;
    console.log(event);

    let items = Array.from(travelList);

    if (!destination) {
      return;
    }

    const sourceDay = parseInt(source.droppableId);
    const destDay = parseInt(destination.droppableId);
    const sourceIndex = source.index;
    const destIndex = destination.index;

    // const sourcetIndex = items.findIndex(item=>item.id=== destination.draggableId)

    // const destinationIndex = 

    if (source.droppableId === destination.droppableId) {
      // If the item was moved within the same Droppable,
      // update the travelList state accordingly.
      const droppableIndex = Number(source.droppableId);

      const [removed] = items.splice(source.index, 1);

      items.splice(destination.index, 0, removed);

      console.log(items);

      // setTravelList(items);
    } else {
      // If the item was moved to a different Droppable,
      // update its day value and the travelList state.
      // const sourceDroppableIndex = Number(source.droppableId);
      // const destinationDroppableIndex = Number(destination.droppableId);
      // // const items = Array.from(travelList);
      // const [removed] = items.splice(source.index, 1);
      // removed.day = destinationDroppableIndex;
      // items.splice(destination.index, 0, removed);
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

      });

      // Update order of items in the destination day
      destItems.forEach((item, index) => {
        item.day = destDay;

      });

      const newTravelList = travelList.filter(
        (item) => item.day !== sourceDay && item.day !== destDay
      );


      console.log(newTravelList, sourceItems, destItems)

      let tempItems = [...newTravelList, ...sourceItems, ...destItems];

      let days = new Set(items.map(item => item.day));


      items = [];

      days.forEach(day => {
        let dayArray = tempItems.filter(item => item.day === day);
        items.push(...dayArray);
      });
      console.log('@@@@@', items);
    }

    // console.log("@itemdest", items[itemDestinationIndex]);



    const itemIndex = items.findIndex((item) => item.id === draggableId);

    const preOrder = items[itemIndex - 1] ? items[itemIndex - 1].order : false;

    const nextOrder = items[itemIndex + 1] ? items[itemIndex + 1].order : false;
    console.log(preOrder, nextOrder);
    let updateOrder;
    if (!preOrder) {
      updateOrder = (0 + items[1].order) / 2;
    } else if (!nextOrder) {
      updateOrder = items[items.length - 2].order + 1;
    } else {
      updateOrder = (preOrder + nextOrder) / 2;
    }

    items[itemIndex].order = updateOrder;

    console.log("@items", items);
    items.sort((a, b) => a.order - b.order);

    setTravelList(items);
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
