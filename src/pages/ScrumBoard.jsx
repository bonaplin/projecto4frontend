import React, { useEffect, useState } from "react";
import { userStore } from "../stores/UserStore";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../components/scrum-board/Column";
import Header from "../components/header/Header";

export default function ScrumBoard() {
  const token = userStore.getState().token; // Get the token from the store

  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  function removeItemById(array, id) {
    return array.filter((item) => String(item.id) !== id);
  }

  function findItemById(array, id) {
    return array.find((item) => String(item.id) === id);
  }

  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const { destination, source, draggableId } = result;

    // Create new arrays for the tasks
    let newTodo = [...todo];
    let newDoing = [...doing];
    let newDone = [...done];

    // Find the task and remove it from its source column
    const allTasks = [...newTodo, ...newDoing, ...newDone];
    const task = findItemById(allTasks, draggableId);

    // Remove the task from the source column
    if (source.droppableId === "100") {
      newTodo = removeItemById(newTodo, draggableId);
    } else if (source.droppableId === "200") {
      newDoing = removeItemById(newDoing, draggableId);
    } else if (source.droppableId === "300") {
      newDone = removeItemById(newDone, draggableId);
    }

    // Add the task to the destination column
    let newStatus;
    if (destination.droppableId === "100") {
      newTodo = [{ ...task, doing: true }, ...newTodo];
      newStatus = 100;
      console.log(newStatus);
    } else if (destination.droppableId === "200") {
      newDoing = [{ ...task, todo: true }, ...newDoing];
      newStatus = 200;
      console.log(newStatus);
    } else if (destination.droppableId === "300") {
      newDone = [{ ...task, done: true }, ...newDone];
      newStatus = 300;
    }

    // Update the state once with the new arrays
    setTodo(newTodo);
    setDoing(newDoing);
    setDone(newDone);
  }
  useEffect(() => {
    const fetchTasksTodo = async () => {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/status/?status=100",
        {
          headers: {
            token: token,
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch tasks:", response.statusText);
        return;
      }
      const todo = await response.json();
      setTodo(todo);
    };
    fetchTasksTodo();
  }, []);

  useEffect(() => {
    const fetchTasksDoing = async () => {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/status/?status=200",
        {
          headers: {
            token: token,
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch tasks:", response.statusText);
        return;
      }
      const doing = await response.json();
      setDoing(doing);
    };
    fetchTasksDoing();
  }, []);

  useEffect(() => {
    const fetchTasksDone = async () => {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/status/?status=300",
        {
          headers: {
            token: token, // replace `token` with your actual token
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch tasks:", response.statusText);
        return;
      }
      const done = await response.json();
      setDone(done);
    };
    fetchTasksDone();
  }, []);
  return (
    <>
      <Header />
      <DragDropContext onDragEnd={handleDragEnd}>
        <h2 style={{ textAlign: "center" }}>PORGRESS BOARD</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Column title={"TO DO"} tasks={todo} id={"100"} />
          <Column title={"DOING"} tasks={doing} id={"200"} />
          <Column title={"DONE"} tasks={done} id={"300"} />
        </div>
      </DragDropContext>
    </>
  );
}
