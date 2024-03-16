import React, { useEffect, useState } from "react";
import "../index.css";
import { userStore } from "../stores/UserStore.js";
import Footer from "../components/footer/Footer.js";
import "./Home.css";
import TaskColumn from "../components/task/column/TaskColumn.js";
import Header from "../components/header/Header.js";
import { TaskElement } from "../components/task/TaskElement.js";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TaskModal from "../components/modal/TaskModal.js";
//import Sidebar from "../components/navbar/Sidebar.js";
function Home() {
  const [selectedTask, setSelectedTask] = useState({});
  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);
  const token = userStore.getState().token; // Get the token from the store
  const [isAddTaskModal, setIsAddTaskModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/active",
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
      const tasks = await response.json();

      separateTasksByStatus(tasks);
    };

    fetchTasks();
  }, [isAddTaskModal]);

  const separateTasksByStatus = (tasks) => {
    setTodo(tasks.filter((task) => task.status === 100));
    setDoing(tasks.filter((task) => task.status === 200));
    setDone(tasks.filter((task) => task.status === 300));
  };

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
    );
    if (response.ok) {
      console.log("Task added successfully");
    } else {
      console.error("Failed to add task:", response.statusText);
      return;
    }
  }

  return (
    <>
      <Header />
      <div className="Home">
        <div className="page-wrap" id="home-page-wrap">
          <h2>Tasks</h2>
          <div>
            <AddCircleIcon
              onClick={handleAddClick}
              className="add-some"
              fontSize="large"
            />
          </div>
          {
            <TaskModal
              open={isAddTaskModal}
              title_modal="Add task"
              onClose={() => setIsAddTaskModal(false)}
              onSubmit={AddTask}
              task={selectedTask}
            />
          }
          <div className="scrum-board">
            <TaskColumn className="task-column" title="ToDo">
              {todo.map((task) => (
                <TaskElement
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  owner={task.owner}
                  category={task.category}
                  priority={task.priority}
                />
              ))}
            </TaskColumn>

            <TaskColumn className="task-column" title="Doing">
              {doing.map((task) => (
                <TaskElement
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  owner={task.owner}
                  category={task.category}
                  priority={task.priority}
                />
              ))}
            </TaskColumn>

            <TaskColumn className="task-column" title="Done">
              {done.map((task) => (
                <TaskElement
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  owner={task.owner}
                  category={task.category}
                  priority={task.priority}
                />
              ))}
            </TaskColumn>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
