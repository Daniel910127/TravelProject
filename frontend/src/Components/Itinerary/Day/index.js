import React from "react";
import TravelItem from "./TravelItem";
import { Droppable } from "react-beautiful-dnd";
export default function Day(props) {
  //console.log(props)
  const { items } = props;
  return (
    <Droppable droppableId={"drop-1"}>
      {(provided) => {
        /* console.log(provided.innerRef()); */

        return (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <TravelItem key={item} item={item} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        );
      }}
    </Droppable>
  );
}
