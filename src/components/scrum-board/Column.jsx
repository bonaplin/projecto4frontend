import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import "./scroll.css";
import Task from "./Task";

const Container = styled.div`
  background-color: #dfe6e9;
  border-radius: 2px;
  width: 220px;
  height: 475px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid gray;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: #dfe6e9;
  text-align: center;
`;

const TaskList = styled.div`
  padding: 3px;
  transition: background-color 0.2s ease;
  background-color: #f4f5f7;
  flex-grow: 1;
  min-height: 100px;
`;
export default function Column({ title, tasks, id }) {
  return (
    <Container className="column">
      <Title style={{ backgroundColor: "lightblue", position: "stick" }}>
        {title}
      </Title>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.draggableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {/*Provide Your tasks*/}
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}

            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
