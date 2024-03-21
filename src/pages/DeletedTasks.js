import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Users.css";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { userStore } from "../stores/UserStore";
import ModalYesNo from "../components/modal/ModalYesNo";

function DeletedTasks() {
  const navigate = useNavigate();
  const token = userStore.getState().token;
  const role = userStore.getState().role;
  const [deletedTasksData, setDeletedTasksData] = useState([]);
  const [taskselected, setTaskselected] = useState(null);

  const fetchCategories = async () => {
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/inactive",
      {
        headers: {
          token: token,
        },
      }
    );

    if (!response.ok) {
      alert(await response.text());
    }
    const data = await response.json();
    setDeletedTasksData(data);
  };

  /* ******* ******* *********************************** *****/

  /* ******* ******* *********************************** *****/

  useEffect(() => {
    fetchCategories();
  }, []); // Add dependencies here if any

  /* ******* ******* *********************************** *****/

  let columns = ["id", "title", "description", "owner", "actions"];

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  function handleDelete(task) {
    setTaskselected(task);
    setIsDeleteTaskModalOpen(true);
  }
  async function handleDeleteTask() {
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/delete/${taskselected.id}`,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );
    if (response.ok) {
      fetchCategories();
      setIsDeleteTaskModalOpen(false);
    } else {
      alert(await response.text());
    }
  }
  const [isRestoreTaskModalOpen, setIsRestoreTaskModalOpen] = useState(false);
  function handleRestore(task) {
    setTaskselected(task);
    setIsRestoreTaskModalOpen(true);
  }
  async function handleRestoreTask() {
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/restore/${taskselected.id}`,
      {
        method: "PUT",
        headers: {
          token: token,
        },
      }
    );
    if (response.ok) {
      fetchCategories();
      setIsRestoreTaskModalOpen(false);
    } else {
      alert(await response.text());
    }
  }
  const [isDeleteAllTasksModalOpen, setIsDeleteAllTasksModalOpen] =
    useState(false);
  function handleDeleteAll() {
    setIsDeleteAllTasksModalOpen(true);
  }
  async function handleDeleteAllTasks() {
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/deleteAll",
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );
    if (response.ok) {
      fetchCategories();
      setIsDeleteAllTasksModalOpen(false);
    } else {
      alert(await response.text());
    }
  }
  const [isRestoreAllTaskModalOpen, setIsRestoreAllTaskModalOpen] =
    useState(false);
  function handleRestoreAll() {
    setIsRestoreAllTaskModalOpen(true);
  }
  async function handleRestoreAllTask() {
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/task/restoreAll",
      {
        method: "PUT",
        headers: {
          token: token,
        },
      }
    );
    if (response.ok) {
      fetchCategories();
      setIsRestoreAllTaskModalOpen(false);
    } else {
      alert(await response.text());
    }
  }

  return (
    <>
      <Header />
      {(role === "po" || role === "sm") && (
        <div className="Home users">
          <div className="page-wrap">
            <h2>Deleted Tasks List</h2>
            {role === "po" && (
              <div className="top-buttons">
                <div>
                  <DeleteForeverIcon
                    onClick={handleDeleteAll}
                    className="add-some"
                    fontSize="large"
                  />
                </div>
                <div>
                  <RestoreFromTrashIcon
                    onClick={handleRestoreAll}
                    className="restore-some"
                    fontSize="large"
                  />
                </div>
              </div>
            )}
            {isDeleteAllTasksModalOpen && (
              <ModalYesNo
                title="Delete All Tasks"
                message="Are you sure you want to delete all tasks?"
                open={isDeleteAllTasksModalOpen}
                onClose={() => setIsDeleteAllTasksModalOpen(false)}
                onYes={handleDeleteAllTasks}
                onNo={() => setIsDeleteAllTasksModalOpen(false)}
              />
            )}
            {isRestoreAllTaskModalOpen && (
              <ModalYesNo
                title="Restore All Tasks"
                message="Are you sure you want to restore all tasks?"
                open={isRestoreAllTaskModalOpen}
                onClose={() => setIsRestoreAllTaskModalOpen(false)}
                onYes={handleRestoreAllTask}
                onNo={() => setIsRestoreAllTaskModalOpen(false)}
              />
            )}
            {isDeleteTaskModalOpen && (
              <ModalYesNo
                title="Delete Task"
                message="Are you sure you want to delete this task?"
                open={isDeleteTaskModalOpen}
                onClose={() => setIsDeleteTaskModalOpen(false)}
                onYes={handleDeleteTask}
                onNo={() => setIsDeleteTaskModalOpen(false)}
              />
            )}
            {isRestoreTaskModalOpen && (
              <ModalYesNo
                title="Restore Task"
                message="Are you sure you want to Restore this task?"
                open={isRestoreTaskModalOpen}
                onClose={() => setIsRestoreTaskModalOpen(false)}
                onYes={handleRestoreTask}
                onNo={() => setIsRestoreTaskModalOpen(false)}
              />
            )}

            <div className="main-board">
              <div className="table-board">
                <Table
                  class="table"
                  type="deleted_tasks"
                  data={deletedTasksData}
                  columns={columns}
                  handleDelete={handleDelete}
                  handleEdit={handleRestore}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
export default DeletedTasks;
