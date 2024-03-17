import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

export default function ScrumBoard() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
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
    let newCompleted = [...completed];
    let newIncomplete = [...incomplete];
    let newThirdColumnTasks = [...done];

    // Find the task and remove it from its source column
    const allTasks = [
      ...newIncomplete,
      ...newCompleted,
      ...newThirdColumnTasks,
    ];
    const task = findItemById(allTasks, draggableId);
    if (source.droppableId === "2") {
      newCompleted = removeItemById(newCompleted, draggableId);
    } else if (source.droppableId === "3") {
      newThirdColumnTasks = removeItemById(newThirdColumnTasks, draggableId);
    } else {
      newIncomplete = removeItemById(newIncomplete, draggableId);
    }

    // Add the task to the destination column
    if (destination.droppableId === "2") {
      newCompleted = [{ ...task, completed: true }, ...newCompleted];
    } else if (destination.droppableId === "3") {
      newThirdColumnTasks = [
        { ...task, completed: task.completed },
        ...newThirdColumnTasks,
      ];
    } else {
      newIncomplete = [{ ...task, completed: false }, ...newIncomplete];
    }

    // Update the state once with the new arrays
    setCompleted(newCompleted);
    setIncomplete(newIncomplete);
    setDone(newThirdColumnTasks);
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
        console.log(json);
      });
  }, []);

  return (
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
        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
        <Column title={"DONE"} tasks={completed} id={"2"} />
        <Column title={"BACKLOG"} tasks={done} id={"3"} />
      </div>
    </DragDropContext>
  );
}

// export default function ScrumBoard() {
//   const onDragEnd = () => {};

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided) => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             <h1>Scrum Board</h1>
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }
