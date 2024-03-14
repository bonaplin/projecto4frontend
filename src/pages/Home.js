import React, { useEffect, useState } from "react";
import "../index.css";
import { userStore } from "../stores/UserStore.js";
import Footer from "../components/footer/Footer.js";
import "./Home.css";
import TaskColumn from "../components/task/column/TaskColumn.js";
import Header from "../components/header/Header.js";
import { TaskElement } from "../components/task/TaskElement.js";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//import Sidebar from "../components/navbar/Sidebar.js";
function Home() {
  const username = userStore((state) => state.username);
  const [todo, setTodo] = useState([]);
  const [doing, setDoing] = useState([]);
  const [done, setDone] = useState([]);

  const token = userStore.getState().token; // Get the token from the store

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/all",
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
      console.log(tasks);

      separateTasksByStatus(tasks);
    };

    fetchTasks();
  }, []);

  const separateTasksByStatus = (tasks) => {
    setTodo(tasks.filter((task) => task.status === 100));
    setDoing(tasks.filter((task) => task.status === 200));
    setDone(tasks.filter((task) => task.status === 300));
  };
  console.log("todo", todo);

  return (
    <>
      <Header />
      <div className="Home">
        <div className="page-wrap" id="home-page-wrap">
          <h2>Tasks</h2>
          <span className="add-some">
            <AddCircleIcon fontSize="large" />
          </span>
          <div className="scrum-board">
            <TaskColumn className="task-column" title="ToDo">
              {todo.map((task) => (
                <TaskElement
                  key={task.title}
                  title={task.description}
                  owner={task.owner}
                  category={task.category}
                  priority={task.priority}
                />
              ))}
            </TaskColumn>

            <TaskColumn className="task-column" title="Doing">
              {doing.map((task) => (
                <TaskElement
                  key={task.title}
                  title={task.description}
                  owner={task.owner}
                  category={task.category}
                  priority={task.priority}
                />
              ))}
            </TaskColumn>

            <TaskColumn className="task-column" title="Done">
              {done.map((task) => (
                <TaskElement
                  key={task.title}
                  title={task.description}
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
