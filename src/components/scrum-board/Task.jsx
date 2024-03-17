import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
const Container = styled.div`
  border-radius: 10px;
  padding: 8px;
  color: white;
  margin-bottom: 8px;
  min-height: 50px;
  margin-right: 8px;
  margin-left: 8px;
  background-color: ${(props) =>
    props.isDragging ? "lightgreen" : "lightblue"};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2px;
`;

function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#f2d7d5"
      : "#dfe6e9"
    : props.isBacklog
    ? "#f2d7d5"
    : "#dfe6e9";
}

const TextContent = styled.div``;

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={`${task.id}`} key={`${task.id}`} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                #{task.id}
                {"  "}
              </small>
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <TextContent>{task.title}</TextContent>
          </div>
          <Icons>
            <div>
              <InsertEmoticonIcon />
            </div>
          </Icons>
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}
