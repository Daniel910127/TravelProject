import React from "react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../StrictModeDroppable";
import Card from "./Card";
import { nanoid } from "nanoid";
import styled from "styled-components";

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
  const [travelList, setTravelList] = useState({
    day1: {
      items: [
        {
          content: "台南景點A",
          id: nanoid(),
          // score: 5,
        },
        { content: "台南景點B", id: nanoid() },
        { content: "台南景點C", id: nanoid() },
        {
          content: "台南景點D",
          id: nanoid(),
          // score: 8,
        },
      ],
    },
    day2: {
      items: [
        {
          content: "台南景點E",
          id: nanoid(),
          // score: 5,
        },
      ],
    },
  });

  // const [totalScoreSum, setTotalScoreSum] = useState(0);

  const onDragEnd = (event) => {
    const { source, destination } = event;

    if (!destination) {
      return;
    }

    // 拷貝新的items (來自state)
    let newTravelList = { ...travelList };

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
          <SectionWrapper>
            <h2>day1</h2>
            <StrictModeDroppable droppableId="day1">
              {(provided, snapshot) => (
                <DroppableContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {travelList.day1.items.map((item, index) => (
                    <Card item={item} index={index} key={item.id} />
                  ))}
                  {provided.placeholder}
                </DroppableContainer>
              )}
            </StrictModeDroppable>
          </SectionWrapper>

          <SectionWrapper>
            <SectionTitleWrapper>
              <h2>day2</h2>
              {/* <SectionTitleInfo>20點/5人</SectionTitleInfo> */}
            </SectionTitleWrapper>

            <StrictModeDroppable droppableId="day2">
              {(provided, snapshot) => (
                <DroppableContainer
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {travelList.day2.items.map((item, index) => (
                    <Card item={item} index={index} key={item.id} />
                  ))}
                  {provided.placeholder}
                </DroppableContainer>
              )}
            </StrictModeDroppable>
            {/* <p>{`目前點數: ${totalScoreSum}`}</p> */}
            {/*  <WarningText>
              {totalScoreSum > 20 && "點數已超出上限，請移除一些項目"}
            </WarningText> */}
          </SectionWrapper>
        </DropContextWrapper>
      </DragDropContext>
    </>
  );
}

export default Itinerary;
