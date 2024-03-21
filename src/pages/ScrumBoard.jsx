import React, { useEffect, useState } from "react";
import { userStore } from "../stores/UserStore";
import { categoriesStore } from "../stores/CategoriesStore";
import "./ScrumBoard.css";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../components/scrum-board/Column";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestoreIcon from "@mui/icons-material/Restore";
import TaskModal from "../components/modal/TaskModal.js";
import ModalYesNo from "../components/modal/ModalYesNo.js";
import TaskViewModal from "../components/modal/TaskViewModal.js";
import Dropdown from "../components/dropdown/Dropdown.js";
import { tsuccess, terror } from "../components/messages/Message";
export default function ScrumBoard() {
  const token = userStore.getState().token; // Get the token from the store
  const [isAddTaskModal, setIsAddTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const role = userStore.getState().role;
  const [isChanged, setIsChanged] = useState(false);
  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  const [usernameDD, setUsername] = useState(null);
  const [categoryDD, setCategory] = useState(null);

  function removeItemById(array, id) {
    return array.filter((item) => String(item.id) !== id);
  }

  function findItemById(array, id) {
    return array.find((item) => String(item.id) === id);
  }

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
        console.log("resposta" + response.status);
        console.log("Task updated successfully");
        tsuccess("Task updated successfully");
      } else {
        console.error("Failed to update task:", response.statusText);
        terror("Failed to update task");
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
        if (response.status === 200) {
          console.log("Task added successfully");
          setIsAddTaskModal(false);
          setIsChanged(!isChanged);
          tsuccess("Task added successfully");
        }
      })
      .catch((error) => {
        console.error("Failed to add task:", error);
        terror("Failed to add task");
      });
  }

  // Task buttons -------------------------------------------------------------- BUTTONS
  //EDIT
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };
  async function handleEditTask(task) {
    console.log("task", task);
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
          console.log(task);
          setIsEditModalOpen(false);
          setIsChanged(!isChanged);
          tsuccess("Task updated successfully");
        } else {
          console.error("Failed to delete task:", response.statusText);
          terror("Failed to delete task");
        }
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
      });
  }
  //DELETE
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
          setIsChanged(!isChanged);
          tsuccess("Task deleted successfully");
        } else {
          console.error("Failed to delete task:", response.statusText);
          terror("Failed to delete task");
        }
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
        error("Failed to delete task");
      });
  }
  //VIEW
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const handleView = (task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  async function handleViewTask(task) {
    console.log("task", task);
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/get?id=${task.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          setIsViewModalOpen(false);
          //setIsChanged(!isChanged);
        } else {
          console.error("Failed to view task:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Failed to view task:", error);
      });
  }
  // ---------------------------------------------------------------------------- BUTTONS

  useEffect(() => {
    async function fetchTasks() {
      let url = "";
      if (usernameDD !== null && categoryDD !== null) {
        url = `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/all/?username=${usernameDD}&category=${categoryDD}`;
      } else if (usernameDD !== null && categoryDD === null) {
        url = `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/all/?username=${usernameDD}`;
      } else if (usernameDD === null && categoryDD !== null) {
        url = `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/all/?category=${categoryDD}`;
      } else {
        url = `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/active/`;
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

          setTodo(todo);
          setDoing(doing);
          setDone(done);
        } else {
          terror("Failed to fetch tasks");
          console.error("Failed to fetch tasks:", response.statusText);
        }
      } catch (error) {
        terror("Failed to fetch tasks");
      }
    }
    fetchTasks();
  }, [usernameDD, categoryDD, isChanged]);

  function handleResetFilter() {
    setUsername(null);
    setCategory(null);
  }

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch users ----------------------------
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/all",
        {
          headers: {
            token: token,
          },
        }
      );
      if (!response.ok) {
        terror("Failed to fetch users:", response.statusText);
        return;
      }
      const users = await response.json();
      const userNames = users.map((user) => user.username);
      setUsers(userNames);
    }
    fetchUsers();
  }, [userStore.getState().users]);

  // Fetch categories -----------------------
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/all",
        {
          headers: {
            token: token,
          },
        }
      );
      if (!response.ok) {
        console.error("Failed to fetch categories:", response.statusText);
        return;
      }
      const categories = await response.json();
      const categoryTitles = categories.map((category) => category.title);
      setCategories(categoryTitles);
    }
    fetchCategories();
  }, [categoriesStore.getState().categories]);

  // Update task move to another column
  const fetchTasks = async (status, setTask) => {
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/status/?status=${status}`,
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
    const tasks = await response.json();
    setTask(tasks);
  };
  useEffect(() => {
    fetchTasks(100, setTodo);
    fetchTasks(200, setDoing);
    fetchTasks(300, setDone);
  }, [isChanged]);
  //-----------------------------------------
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

    // Add the task to the destination column depending on the droppableId
    if (destination.droppableId === "100") {
      task.todo = true;
      task.doing = false;
      task.done = false;
      task.status = 100;
      newTodo.splice(destination.index, 0, task);
      updateStatus(result.draggableId, 100);
    } else if (destination.droppableId === "200") {
      task.todo = false;
      task.done = true;
      task.doing = false;
      task.status = 200;
      newDoing.splice(destination.index, 0, task);
      updateStatus(result.draggableId, 200);
    } else if (destination.droppableId === "300") {
      task.done = false;
      task.todo = false;
      task.doing = true;
      newDone.splice(destination.index, 0, task);
      task.status = 300;
      updateStatus(result.draggableId, 300);
    }

    // Update the state once with the new arrays
    setSelectedTask(task);
    setTodo(newTodo);
    setDoing(newDoing);
    setDone(newDone);
  }

  function handleCloseAddModal() {
    setIsAddTaskModal(false);
    setSelectedTask({});
  }
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
            {(role === "po" || role === "sm") && (
              <div className="filter-container">
                <div className="filter-side">
                  <Dropdown
                    data={users}
                    type={"All"}
                    onChange={(selectedValue) => setUsername(selectedValue)}
                  />
                  <Dropdown
                    data={categories}
                    type={"All"}
                    onChange={(selectedValue) => setCategory(selectedValue)}
                  />
                  <RestoreIcon
                    className="restore-button"
                    onClick={handleResetFilter}
                    fontSize="large"
                  />
                </div>
              </div>
            )}
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
          {isViewModalOpen && (
            <TaskViewModal
              open={isViewModalOpen}
              onClose={() => setIsViewModalOpen(false)}
              title_modal="View task"
              onSubmit={handleViewTask}
              task={selectedTask}
            />
          )}
          {
            <TaskModal
              open={isAddTaskModal}
              title_modal="Add task"
              onClose={handleCloseAddModal}
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
                handleView={handleView}
              />
              <Column
                title={"DOING"}
                tasks={doing}
                id={"200"}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleView={handleView}
              />
              <Column
                title={"DONE"}
                tasks={done}
                id={"300"}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleView={handleView}
              />{" "}
            </div>{" "}
          </DragDropContext>
        </div>
        <Footer />
      </div>
    </>
  );
}
