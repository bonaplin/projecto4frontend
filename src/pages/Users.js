import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import "./Users.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { userStore } from "../stores/UserStore";
import UserModal from "../components/modal/UserModal";

function Users() {
  let userData = userStore((state) => state.user);
  const [isChange, setIsChange] = useState(false); //to change the fetch
  const role = userStore.getState().role;
  const token = userStore.getState().token;
  // User selected
  const [editUser, setEditUser] = useState(null);

  /* ******* ******* ADD USER BUTTON  ***************** *****/
  const [isModalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleAddUserButton = () => {
    setModalOpen(true);
  };
  async function handleCreateUser(user) {
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
          role: role,
        },
        body: JSON.stringify(user),
      }
    );
    if (response.ok) {
      console.log("User Created");
      setModalOpen(false);
      setIsChange(!isChange);
    }

    if (!response.ok) {
      alert(response.status);
    }

    let userDetails = await response.json();
    console.log("User Created", userDetails);
  }
  // Modal -> EDIT /* ******* ******* *********************************** *****/
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEdit = (user) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };
  async function handleUpdateUser(user) {
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
          selectedUser: user.username,
        },
        body: JSON.stringify(user),
      }
    );
    if (response.ok) {
      console.log("User Updated");
      setIsEditModalOpen(false);
      setIsChange(!isChange);
    } else if (!response.ok) {
      console.log(user);
      alert(response.status);
    }
  }
  /* ******* ******* *********************************** *****/
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = (user) => {
    setEditUser(user);
    setIsDeleteModalOpen(true);
    console.dir(user);
  };
  async function handleDeleteUser(user) {
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
          selectedUser: user.username,
        },
      }
    );
    if (response.ok) {
      console.log("User Deleted");
      setIsChange(!isChange);
      setIsDeleteModalOpen(false);
    }

    if (!response.ok) {
      console.log(user);
      alert(`HTTP error! status: ${response.status}`);
    }

    let userDetails = await response.json();
    console.log("User Deleted", userDetails);
  }

  /* ******* ******* *********************************** *****/
  const [isDeleteTasksModalOpen, setIsDeleteModalTasksOpen] = useState(false);
  const handleDeleteTasks = (user) => {
    setEditUser(user);
    setIsDeleteModalTasksOpen(true);
    console.dir(user);
  };
  async function handleDeleteTasksUser(user) {
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/deleteTasks",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
          selectedUser: user.username,
        },
      }
    );
    if (response.ok) {
      console.log("User Tasks Deleted");
      setIsChange(!isChange);
      setIsDeleteModalTasksOpen(false);
    }

    if (!response.ok) {
      console.log(user);
      alert(`HTTP error! status: ${response.status}`);
    }

    let userDetails = await response.json();
    console.log("User Tasks Deleted", userDetails);
  }

  /* ******* ******* *********************************** *****/

  const handleActiveChange = (user) => {
    const newUser = { ...user, active: !user.active };
    console.dir("user :" + user + "newUser :" + newUser);
    handleUpdateUserActive(newUser);
  };

  async function handleUpdateUserActive(user) {
    const body = {
      username: user.username,
      active: user.active,
    };
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/updateactive",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(body),
      }
    );
    if (response.ok) {
      console.log("User Active Updated");
      setIsChange(!isChange);
    }

    if (!response.ok) {
      console.log(user);
      alert(`HTTP error! status: ${response.status}`);
    }

    let userDetails = await response.json();
    console.log("User Active Edited", userDetails);
  }
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

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "http://localhost:8080/demo-1.0-SNAPSHOT/rest/user/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      userData = await response.json();
      userStore.getState().setUsers(userData);
    }

    fetchUsers();
  }, [isChange]); // Dependency array includes editUser, so useEffect will run whenever editUser changes

  return (
    <>
      <Header />
      <div className="Home users">
        <div className="page-wrap">
          <h2>All Users</h2>
          {role === "po" && (
            <>
              <span>
                <AddCircleIcon
                  className="add-some"
                  onClick={handleAddUserButton}
                  fontSize="large"
                />
              </span>

              <UserModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateUser}
                title="Create User"
                user={{}} // Pass an empty user object to the UserModal
              />
            </>
          )}
          {isEditModalOpen && (
            <UserModal
              open={isEditModalOpen}
              title="Edit User"
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={handleUpdateUser} // You need to define this function to handle the user update
              user={editUser}
            />
          )}
          {isDeleteModalOpen && (
            <UserModal
              open={isDeleteModalOpen}
              title="Delete User"
              onClose={() => setIsDeleteModalOpen(false)}
              onSubmit={handleDeleteUser}
              user={editUser}
            />
          )}
          {isDeleteTasksModalOpen && (
            <UserModal
              open={isDeleteTasksModalOpen}
              title="Delete User Tasks"
              onClose={() => setIsDeleteModalTasksOpen(false)}
              onSubmit={handleDeleteTasksUser}
              user={editUser}
            />
          )}

          <div className="main-board">
            <div className="table-board">
              <Table
                class="table"
                data={userData}
                type="user"
                columns={columns}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDeleteTasks={handleDeleteTasks}
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
