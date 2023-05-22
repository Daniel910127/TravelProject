import React from "react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../StrictModeDroppable";
import Card from "./Card";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { useEffect } from "react";
import usePrevious from "../../util/usePrevious";

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
  const [travelInfo, setTravelInfo] = useState({ travelList: [], startTime: Date.now(), dayCount: 3 });
  // const prevTravelInfo = usePrevious(travelInfo)
  const [days, setDays] = useState(['8/11', '8/12','8/13']);
  




  useEffect(() => {
    setTravelInfo(
      {
        travelList: [
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
            day: 3,
          },
        ],
        startTime: Date.now(),
        dayCount: 3,
      }

    );

  }, []);


  // useEffect(() => {
  //   const currentDate = new Date(travelInfo.startTime);
  //   let updatedDays = [];
  
  //   for (let i = 0; i < travelInfo.dayCount; i++) {
  //     console.log(currentDate.getDate())
  //     currentDate.setDate(currentDate.getDate() + i );
  //     updatedDays.push(currentDate.getDate());
  //   }
    
  //   console.log(updatedDays)
  //   setDays(updatedDays);
  // }, [travelInfo.dayCount]);


  const { travelList ,dayCount} = travelInfo;

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
        (item) => item.day === destDay
      );
      const [removed] = destItems.splice(sourceIndex, 1);

      destItems.splice(destIndex, 0, removed);


      const newTravelList = travelList.filter(
        (item) => item.day !== destDay
      );


      // console.log(newTravelList, destItems)

      let tempItems = [...newTravelList, ...destItems];
      items = [];
      for (let day = 1; day <= dayCount; day++) {
        let dayArray = tempItems.filter(item => item.day === day);
        items.push(...dayArray);
      }

      // console.log('@@@@@', items);
    } else {

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


      // console.log(newTravelList, sourceItems, destItems)

      let tempItems = [...newTravelList, ...sourceItems, ...destItems];


      items = [];


      for (let day = 1; day <= dayCount; day++) {
        let dayArray = tempItems.filter(item => item.day === day);
        items.push(...dayArray);
      }

      // console.log('@@@@@', items);
    }



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

    // console.log("@items", items);
    items.sort((a, b) => a.order - b.order);

    setTravelInfo({ travelList: items });


    //ajax
    const data = items.filter(item => item.id === draggableId)[0]
    console.log('axiosData', data)
  };

  // const days = Array.from(new Set(travelList.map((item) => item.day))).sort();
  // console.log("@treavel info ", travelInfo);


  return (

    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <DropContextWrapper>
          {days.map((day, index) => {


            return (
              <SectionWrapper key={day}>
                <h2>{day}</h2>

                <StrictModeDroppable droppableId={`${index + 1}`}>
                  {(provided, snapshot) => (
                    <DroppableContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {
                        travelList.filter((item) => item.day === index + 1)
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
