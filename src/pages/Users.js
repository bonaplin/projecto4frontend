import React, { useState } from "react";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import "./Users.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { userStore } from "../stores/UserStore";
import UserModal from "../components/modal/UserModal";

function Users() {
  let userData = userStore((state) => state.user);
  const role = userStore.getState().role;
  const [isModalOpen, setModalOpen] = useState(false);
  const updateUserActiveStatus = userStore(
    (state) => state.updateUserActiveStatus
  );

  const handleEdit = (user) => {
    console.log("Editing user:", user);
  };
  const handleDelete = (user) => {
    console.log("Deleting user:", user);
  };
  const handleActiveChange = (user) => {
    console.log("Changing active status for user:", user);
  };
  const handleInputChange = (e) => {
    console.log("Handling input change:", e);
  };
  const handleClickSave = () => {
    console.log("Saving new user");
  };

  /* ******* ******* ADD USER BUTTON  ***************** *****/
  const handleAddUserButton = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const handleCreateUser = (user) => {
    console.log("Creating user:", user);
  };
  /* ******* ******* *********************************** *****/

  let columns = [
    "photoURL",
    "username",
    "firstname",
    "lastname",
    "phone",
    "role",
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
          {role === "po" && (
            <>
              <span className="add-some">
                <AddCircleIcon onClick={handleAddUserButton} fontSize="large" />
              </span>

              <UserModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateUser}
              />
            </>
          )}

          <div className="main-board">
            <div className="table-board">
              <Table
                class="table"
                data={userData}
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleActiveChange={handleActiveChange}
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
