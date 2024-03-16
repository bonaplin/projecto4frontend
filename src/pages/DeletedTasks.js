import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Users.css";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { userStore } from "../stores/UserStore";
import Modal from "../components/modal/Modal";
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

  return (
    <>
      <Header />
      <div className="Home users">
        <div className="page-wrap">
          <h2>Deleted Tasks List</h2>
          {role === "po" && (
            <div className="top-buttons">
              <div>
                <AddCircleIcon className="add-some" fontSize="large" />
              </div>
              <div>
                <RestoreFromTrashIcon
                  className="restore-some"
                  fontSize="large"
                />
              </div>
            </div>
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
              title="Delete Task"
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
    </>
  );
}
export default DeletedTasks;
