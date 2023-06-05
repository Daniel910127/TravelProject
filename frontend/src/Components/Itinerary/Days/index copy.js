import React, { useContext, useState } from "react";
import produce from "immer";
import { TravelInfoStateContext } from "..";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../StrictModeDroppable";

export default function Days() {
  const { travelInfo, setTravelInfo, days, setDays } = useContext(
    TravelInfoStateContext
  );
  const { travelList, startDate, dayCount, startTime } = travelInfo;

  const onDragEnd = (event) => {
    console.log(event);
    // let frontOrder,backOrder;

    const frontDay = event.destination.index + 1;
    const backDay = event.destination.index + 2;

    let backOrderIndex = -1;
    let backOrder = Infinity;

    for (let i = 0; i < travelList.length; i++) {
      if (travelList[i].day === backDay && travelList[i].order < backOrder) {
        backOrder = travelList[i].order;
        backOrderIndex = i;
      }
    }
    console.log(backOrderIndex);

    let frontOrder = -Infinity;
    let frontOrderIndex = -1;

    for (let i = 0; i < travelList.length; i++) {
      if (travelList[i].day === frontDay && travelList[i].order > frontOrder) {
        frontOrder = travelList[i].order;
        frontOrderIndex = i;
      }
    }

    // const moveDayData = travelList.filter(
    //   (item) => item.day === event.source.index + 1
    // );

    console.log(travelList[frontOrderIndex], travelList[backOrderIndex]);
    console.log(frontOrder, backOrder);

    setTravelInfo(
      produce((draft) => {
        const moveDayData = draft.travelList.filter(
          (item) => item.day === event.source.index + 1
        );
        const orderInterval = (backOrder - frontOrder) / moveDayData.length;
        moveDayData.forEach((item, index) => {
          item.order = frontOrder + orderInterval * (index + 1);
          item.day = event.destination.index + 1;
        });
        // draft.travelList[0].order = 999;
        // draft.travelList[0].day = 3;
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId="days">
        {/* // droppableId: 該 Droppable 的唯一識別ID */}

        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {/*
          provided.innerRef
          套件的機制所需, 直接去取用 dom 的 ref, 就是套用的例行公事
        */}

            {days.map((item, index) => (
              // 以 map 方式渲染每個拖曳卡片 (Draggable)

              <Draggable draggableId={item} index={index} key={item}>
                {/* // draggableId: 該卡片的唯一識別ID */}
                {(provided, snapshot) => (
                  /* 
                ...provided.droppableProps
                ...provided.draggableProps
                ...provided.dragHandleProps 
                單純展開其他必要的 props 
              */

                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {/* 實際上的卡片內容 */}
                    {item}
                    {/* 實際上的卡片內容 */}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
