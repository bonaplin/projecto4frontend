import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import "./Users.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { userStore } from "../stores/UserStore";

function Users() {
  let userData = userStore((state) => state.user);
  const role = userStore.getState().role;
  console.log("Entrou em Users.js");

  const handleEdit = (user) => {
    // Perform your edit operation here
    // This could involve navigating to an edit page, opening a modal, etc.
    console.log("Editing user:", user);
  };
  const handleDelete = (user) => {
    // Perform your delete operation here
    // This could involve opening a modal, showing a confirmation dialog, etc.
    console.log("Deleting user:", user);
  };

  // const columns =
  //   userData.length > 0 ? [...Object.keys(userData[0]), "actions"] : [];

  let columns = [
    "photoURL",
    "username",
    "firstname",
    "lastname",
    "phone",
    "active",
    "actions",
  ];
  if (role === "sm") {
    // Filter the userData array to exclude inactive users
    userData = userData.filter((user) => user.active);
    // Find the index of the "actions" column
    const actionsIndex = columns.indexOf("actions");
    // If the "actions" column exists, remove it
    if (actionsIndex !== -1) {
      columns.splice(actionsIndex, 1);
    }
    // Find the index of the "active" column
    const activeIndex = columns.indexOf("active");
    // If the "active" column exists, remove it
    if (activeIndex !== -1) {
      columns.splice(activeIndex, 1);
    }
  } else if (role === "po") {
    // Perform your operations for the "po" role here
  } else {
    columns = [""];
    userData = [""];
  }

  return (
    <>
      <Header />
      <div className="Home users">
        <div className="page-wrap">
          <h2>All Users</h2>
          <span className="add-some">
            <AddCircleIcon fontSize="large" />
          </span>
          <div className="main-board">
            <div className="table-board">
              <Table
                class="table"
                data={userData}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Users;
/*<Table data={userData} />*/
/*<Table class="table" data={userData} />*/
