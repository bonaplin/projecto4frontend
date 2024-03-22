import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

test("renders Column with title and tasks", () => {
  const tasks = [
    { id: "task1", content: "Task 1" },
    { id: "task2", content: "Task 2" },
  ];
  const { getByText, debug } = render(
    <DragDropContext>
      <Column
        title="Test Column"
        tasks={tasks}
        id="column1"
        handleDelete={() => {}}
        handleEdit={() => {}}
        handleView={() => {}}
      />
    </DragDropContext>
  );
});
