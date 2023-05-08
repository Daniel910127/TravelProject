import React from "react";
import { Draggable } from "react-beautiful-dnd";
export default function TravelItem(props) {
  const { item, index } = { ...props };
  console.log(index,item);
  return (
    <Draggable draggableId={item} index={index} >
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
  );
}
// style={{ background: "#666", marginBottom: "10px" ,userSelect:'none'}}