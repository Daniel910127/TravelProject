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
  const [travelList, setTravelList] = useState({});

  useEffect(() => {
    setTravelList({
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
    });
  }, []);

  // const [totalScoreSum, setTotalScoreSum] = useState(0);

  const onDragEnd = (event) => {
    console.log("dragend event", event);
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    // 拷貝新的items (來自state)
    let newTravelList = { ...travelList };

    /* const destinationOrder =
      newTravelList[destination.droppableId].items[destination.index].order; */

    /* const destinationNextOrder = newTravelList[destination.droppableId].items[
      destination.index + 1
    ]
      ? newTravelList[destination.droppableId].items[destination.index + 1]
          .order
      : newTravelList[destination.droppableId].items[destination.index].order +
        1;

    const newSourceOrder = destinationOrder;
 */
    // splice(start, deleteCount, item )
    // 從source剪下被拖曳的元素
    const [remove] = newTravelList[source.droppableId].items.splice(
      source.index,
      1
    );

    // 在destination位置貼上被拖曳的元素
    newTravelList[destination.droppableId].items.splice(
      destination.index,
      0,
      remove
    );

    // set state新的 TravelList
    setTravelList(newTravelList);

    // 計算sprint內的分數總和
    // const newTotalScoreSum = newTravelList.sprintList.items.reduce(
    //   (acc, val) => acc + val.score,
    //   0
    // );
    // setTotalScoreSum(newTotalScoreSum);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <DropContextWrapper>
          {Object.keys(travelList).map((day) => {
            return (
              <SectionWrapper key={day}>
                <h2>{day}</h2>

                <StrictModeDroppable droppableId={day}>
                  {(provided, snapshot) => (
                    <DroppableContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {travelList[day].items.map((item, index) => (
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
