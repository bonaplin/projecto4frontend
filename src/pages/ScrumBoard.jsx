import React, { useEffect, useState } from "react";
import { userStore } from "../stores/UserStore";
import "./ScrumBoard.css";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../components/scrum-board/Column";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskModal from "../components/modal/TaskModal.js";
import ModalYesNo from "../components/modal/ModalYesNo.js";
import Task from "../components/scrum-board/Task.js";
import { categoriesStore } from "../stores/CategoriesStore.js";
import Dropdown from "../components/dropdown/Dropdown.js";
export default function ScrumBoard() {
  const token = userStore.getState().token; // Get the token from the store
  const [isAddTaskModal, setIsAddTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  const [username, setUsername] = useState(null);
  const [category, setCategory] = useState(null);

  function removeItemById(array, id) {
    return array.filter((item) => String(item.id) !== id);
  }

  function findItemById(array, id) {
    return array.find((item) => String(item.id) === id);
  }

  function handleDragEnd(result) {
    console.log(result.draggableId);

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
      updateStatus(result.draggableId, newStatus);
      //request to update task
    } else if (destination.droppableId === "200") {
      newDoing = [{ ...task, todo: true }, ...newDoing];
      newStatus = 200;
      updateStatus(result.draggableId, newStatus);
      //request to update task
    } else if (destination.droppableId === "300") {
      newDone = [{ ...task, done: true }, ...newDone];
      newStatus = 300;
      updateStatus(result.draggableId, newStatus);
      //request to update task
    }

    // Update the state once with the new arrays
    setTodo(newTodo);
    setDoing(newDoing);
    setDone(newDone);
  }
  //! TODO
  // useEffect(() => {
  //   async function fetchTasksTodo() {
  //     const response = await fetch(
  //       "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/status/?status=100",
  //       {
  //         headers: {
  //           token: token,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       console.error("Failed to fetch tasks:", response.statusText);
  //       return;
  //     }
  //     const todo = await response.json();
  //     setTodo(todo);
  //   }
  //   fetchTasksTodo();
  // }, []);
  // //! DOING
  // useEffect(() => {
  //   async function fetchTasksDoing() {
  //     const response = await fetch(
  //       "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/status/?status=200",
  //       {
  //         headers: {
  //           token: token,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       console.error("Failed to fetch tasks:", response.statusText);
  //       return;
  //     }
  //     const doing = await response.json();
  //     setDoing(doing);
  //   }
  //   fetchTasksDoing();
  // }, []);

  // //! DONE
  // useEffect(() => {
  //   async function fetchTasksDone() {
  //     const response = await fetch(
  //       "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/status/?status=300",
  //       {
  //         headers: {
  //           token: token, // replace `token` with your actual token
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       console.error("Failed to fetch tasks:", response.statusText);
  //       return;
  //     }
  //     const done = await response.json();
  //     setDone(done);
  //   }
  //   fetchTasksDone();
  // }, []);

  async function updateStatus(id, newStatus) {
    const response = fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/updateStatus/?id=${id}&status=${newStatus}`,
      {
        "Content-Type": "application/json",
        method: "PUT",
        headers: { token: token },
      }
    ).then((response) => {
      if (response.ok) {
        console.log("Task updated successfully");
      } else {
        console.error("Failed to update task:", response.statusText);
      }
    });
  }
  function handleAddClick() {
    setIsAddTaskModal(true);
  }
  async function AddTask(task) {
    console.log("task", task);
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(task),
      }
    )
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          console.log("Task added successfully");
          setIsAddTaskModal(false);
        }
      })
      .catch((error) => {
        console.error("Failed to add task:", error);
      });
  }
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
    console.log("task", task);
  };
  async function handleEditTask(task) {
    console.log("inputs", JSON.stringify(task));
    console.log(task);
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/update/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(task),
      }
    )
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          console.log("Task deleted successfully");
          setIsEditModalOpen(false);
        } else {
          console.error("Failed to delete task:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
      });
  }

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };
  async function handleDeleteTask(task) {
    console.log("task", task);
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/desactivate/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          console.log("Task deleted successfully");
          setIsDeleteModalOpen(false);
        } else {
          console.error("Failed to delete task:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
      });
  }
  useEffect(() => {
    async function fetchTasks() {
      let url = "";
      if (username !== null && category !== null) {
        url = `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/all/?username=${username}&category=${category}`;
      } else if (username !== null && category === null) {
        url = `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/all/?username=${username}`;
      } else if (username === null && category !== null) {
        url = `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/all/?username=${category}`;
      } else {
        url = `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/all/`;
      }
      try {
        const response = await fetch(url, {
          headers: {
            token: token,
          },
        });
        console.log(response.status);
        if (response.ok) {
          const data = await response.json();
          const todo = data.filter((task) => task.status === 100);
          const doing = data.filter((task) => task.status === 200);
          const done = data.filter((task) => task.status === 300);

          console.log("todo", todo);
          console.log("doing", doing);
          console.log("done", done);

          setTodo(todo);
          setDoing(doing);
          setDone(done);
        } else {
          console.error("Failed to fetch tasks:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    }
    fetchTasks();
  }, [username, category]);

  function handleResetFilter() {
    setUsername(null);
    setCategory(null);
  }

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/all",
        {
          headers: {
            token: token, // replace `token` with your actual token
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch users:", response.statusText);
        return;
      }
      const users = await response.json();
      const userNames = users.map((user) => user.username);
      setUsers(userNames); // replace `setUsers` with your actual state update function
    }
    fetchUsers();
  }, []);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/all",
        {
          headers: {
            token: token, // replace `token` with your actual token
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch categories:", response.statusText);
        return;
      }
      const categories = await response.json();
      const categoryTitles = categories.map((category) => category.title);
      setCategories(categoryTitles); // replace `setCategories` with your actual state update function
    }
    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="Home">
        <div className="page-wrap">
          <h2>Tasks</h2>
          <div>
            <AddCircleIcon
              onClick={handleAddClick}
              className="add-some"
              fontSize="large"
            />
            <div className="filter-container">
              <div className="filter-side">
                <Dropdown
                  data={users}
                  type={"Username"}
                  onChange={(selectedValue) => setUsername(selectedValue)}
                />
                <Dropdown
                  data={categories}
                  type={"Category"}
                  onChange={(selectedValue) => setCategory(selectedValue)}
                />
                <button onClick={handleResetFilter}>Reset Filter</button>
              </div>
            </div>
          </div>
          {isDeleteModalOpen && (
            <ModalYesNo
              open={isDeleteModalOpen}
              onClose={() => setIsDeleteModalOpen(false)}
              title={"Delete task"}
              message={"Are you sure you want to delete this task?"}
              onYes={() => {
                setIsDeleteModalOpen(false);
                handleDeleteTask(selectedTask);
              }}
              onNo={() => setIsDeleteModalOpen(false)}
            />
          )}
          {isEditModalOpen && (
            <TaskModal
              open={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              title_modal="Edit task"
              onSubmit={handleEditTask}
              task={selectedTask}
            />
          )}
          {
            <TaskModal
              open={isAddTaskModal}
              title_modal="Add task"
              onClose={() => setIsAddTaskModal(false)}
              onSubmit={AddTask}
              task={selectedTask}
            />
          }
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="scrum-board">
              <Column
                title={"TO DO"}
                tasks={todo}
                id={"100"}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
              <Column
                title={"DOING"}
                tasks={doing}
                id={"200"}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
              <Column
                title={"DONE"}
                tasks={done}
                id={"300"}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />{" "}
            </div>{" "}
          </DragDropContext>
        </div>
        <Footer />
      </div>
    </>
  );
}
