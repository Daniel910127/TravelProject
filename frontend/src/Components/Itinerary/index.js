import React from "react";
import { useState, createContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../StrictModeDroppable";
import Card from "./Card";
import { nanoid } from "nanoid";
import styled from "styled-components";
import { useEffect } from "react";
import Header from "./Header";

const TravelInfoStateContext = createContext({
  setTravelInfo: () => { },
  travelInfo: {},
});

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
  const [travelInfo, setTravelInfo] = useState({
    travelList: [],
    startDate: Date.now(),
    dayCount: 0,
    startTime: {},
  });
  // const prevTravelInfo = usePrevious(travelInfo)
  const [days, setDays] = useState(["8/11", "8/12", "8/13"]);

  const [spotStartTime, setSpotStartTime] = useState();
  // const [dayCount, setDayCount] = useState(3)

  //每日開始時間startTime:{1:'28800'} (秒)
  //旅遊開始日期startDate:'2023/5/12'

  //  travelList:[
  //    {
  //      name: "台南景點A",
  //      location:{lng:121.41666,lat:31.21666},
  //      address:'台南xx路xx號'
  //      id: `s_001`,
  //      order: 1,
  //      day: 1,
  //      stayTime: 3600, (秒)
  //      TransportMode: 1,
  //      TransportTime:3600,  (秒)
  //      photo:'imgurl'
  //
  //    },]
  //

  useEffect(() => {
    setTravelInfo({
      travelList: [
        {
          name: "台南景點A",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_001`,
          order: 1,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 1600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點B",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_567`,
          order: 2,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點C",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_111`,
          order: 3,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點D",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_346`,
          order: 4,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點E",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_235`,
          order: 5,
          day: 1,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點F",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_136`,
          order: 6,
          day: 2,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
        {
          name: "台南景點G",
          location: { lng: 121.41666, lat: 31.21666 },
          address: "台南xx路xx號",
          id: `s_777`,
          order: 7,
          day: 2,
          stayTime: 3600,
          transportMode: 1,
          transportTime: 3600,
          photo: "imgurl",
          note: "xxxxxxxxxxx",
        },
      ],
      startDate: "2023-05-18",
      dayCount: 4,
      startTime: { 1: 28800, 2: 28800, 3: 28800, 4: 28800 },
    });
  }, []);

  const { travelList, dayCount, startTime, startDate } = travelInfo;

  useEffect(() => {
    const startDate = new Date(travelInfo.startDate);
    // console.log(currentDate.getDate() + 1)
    const updatedDays = [];
    startDate.setDate(startDate.getDate() - 1);
    for (let i = 1; i <= travelInfo.dayCount; i++) {
      startDate.setDate(startDate.getDate() + 1);
      updatedDays.push(`${startDate.getMonth() + 1}/${startDate.getDate()}`);
    }

    setDays(updatedDays);
  }, [travelInfo.dayCount]);

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

      const newTravelList = travelList.filter((item) => item.day !== destDay);
      // console.log(newTravelList, destItems)
      let tempItems = [...newTravelList, ...destItems];
      //day排序
      items = [];
      for (let day = 1; day <= dayCount; day++) {
        let dayArray = tempItems.filter((item) => item.day === day);
        items.push(...dayArray);
      }
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
        console.log('@', item)
        item.day = sourceDay;
      });

      // Update order of items in the destination day
      destItems.forEach((item, index) => {
        item.day = destDay;
      });

      const newTravelList = travelList.filter(
        (item) => item.day !== sourceDay && item.day !== destDay
      );

      let tempItems = [...newTravelList, ...sourceItems, ...destItems];

      items = [];
      for (let day = 1; day <= dayCount; day++) {
        let dayArray = tempItems.filter((item) => item.day === day);
        items.push(...dayArray);
      }
    }

    const itemIndex = items.findIndex((item) => item.id === draggableId);

    const preOrder = items[itemIndex - 1] ? items[itemIndex - 1].order : false;

    const nextOrder = items[itemIndex + 1] ? items[itemIndex + 1].order : false;
    // console.log(preOrder, nextOrder);
    let updateOrder;
    if (!preOrder) {
      updateOrder = (0 + items[1].order) / 2;
    } else if (!nextOrder) {
      updateOrder = items[items.length - 2].order + 1;
    } else {
      updateOrder = (preOrder + nextOrder) / 2;
    }

    items[itemIndex].order = updateOrder;

    items.sort((a, b) => a.order - b.order);
    // console.log(items)
    setTravelInfo({ ...travelInfo, travelList: items });

    //dropend ajax
    const data = items.filter((item) => item.id === draggableId)[0];
    console.log("axiosData", data);
  };

  return (
    <TravelInfoStateContext.Provider value={{ travelInfo, setTravelInfo }}>

      <Header />

      <DragDropContext onDragEnd={onDragEnd}>
        <DropContextWrapper>
          {days.map((day, dayIndex) => {
            console.log(day);
            const currTime = new Date(startDate);

            currTime.setDate(currTime.getDate() + dayIndex - 1);

            currTime.setTime(
              currTime.getTime() + startTime[dayIndex + 1] * 1000
            );

            const DroppableItems = travelList
              .filter((item) => item.day === dayIndex + 1)
              .map((item, index) => {
                const startTime = new Date(currTime.getTime());

                {
                  /* console.log('starttime',item,startTime) */
                }

                currTime.setTime(
                  currTime.getTime() +
                  item.transportTime * 1000 +
                  item.stayTime * 1000
                );
                return (
                  <Card
                    item={item}
                    startTime={startTime}
                    index={index}
                    key={item.id}
                  />



                );
              });

            return (
              <SectionWrapper key={day}>
                <h2>{day}</h2>

                <StrictModeDroppable droppableId={`${dayIndex + 1}`}>
                  {(provided, snapshot) => (
                    <DroppableContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {DroppableItems}
                      {/* {
                        travelList.filter((item) => item.day === dayIndex + 1)
                          .map((item, index) => {
                            const startTime = new Date(currTime.getTime())
                            
                            console.log('starttime',item,startTime)

                            // const tempTime = currTime.getTime()

                            currTime.setTime(currTime.getTime() + item.transportTime * 1000 + item.stayTime * 1000)
                            return (
                              <Card item={item} startTime={startTime} index={index} key={item.id} />
                            )
                          })} */}
                      {provided.placeholder}
                    </DroppableContainer>
                  )}
                </StrictModeDroppable>
              </SectionWrapper>
            );
          })}
        </DropContextWrapper>
      </DragDropContext>
    </TravelInfoStateContext.Provider>
  );
}
export { TravelInfoStateContext };
export default Itinerary;
