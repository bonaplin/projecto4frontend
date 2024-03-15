import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Users.css";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryModal from "../components/modal/CategoryModal";
import { userStore } from "../stores/UserStore";

function Categories() {
  const navigate = useNavigate();
  const token = userStore.getState().token;
  const username = userStore.getState().username;
  const role = userStore.getState().role;
  const [categorieData, setCategorieData] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const handleAddUserButton = () => {
    console.log("Add User Button");
  };

  const fetchCategories = async () => {
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/all",
      {
        headers: {
          token: token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setCategorieData(data);
  };

  /* ******* ******* *********************************** *****/
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = (category) => {
    setEditCategory(category);
    setIsDeleteModalOpen(true);
    console.dir(category);
  };
  async function handleDeleteCategory(category) {
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/delete/${category.id}`,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );

    if (response.status === 200) {
      fetchCategories();
      setIsDeleteModalOpen(false);
    } else if (response.status === 400) {
    }
  }
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEdit = (category) => {
    setEditCategory(category);
    setIsEditModalOpen(true);
  };
  async function handleEditCategory(category) {
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/update/${category.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Add this line
          token: token,
        },
      }
    );

    if (response.status === 200) {
      fetchCategories();
      setIsEditModalOpen(false);
      console.log("Categorie Updated");
    } else if (response.status === 400) {
      const body = await response.text();
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddCategoryButton = () => {
    setIsModalOpen(true);
  };

  async function handleCreateCategory(category) {
    console.log("Create Category", category);
    category.owner = username;
    const response = await fetch(
      "http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
          token: token,
        },
        body: JSON.stringify(category),
      }
    );
    if (response.status === 200) {
      fetchCategories();
      setIsModalOpen(false);
    } else {
      console.log(await response.text());
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []); // Add dependencies here if any

  /* ******* ******* *********************************** *****/

  let columns = ["title", "description", "owner", "actions"];

  /* ACESS RULLES
  if (role === "sm") {
    // Filter the userData array to exclude inactive users
    categorieData = categorieData.filter((user) => user.active);
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
    categorieData = [""];
  }
  */

  return (
    <>
      <Header />
      <div className="Home users">
        <div className="page-wrap">
          <h2>All Category</h2>
          {role === "po" && (
            <>
              <span className="add-some">
                <AddCircleIcon
                  onClick={handleAddCategoryButton}
                  fontSize="large"
                />
              </span>

              <CategoryModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateCategory}
                title_category="Create Category"
                user={{}} // Pass an empty user object to the UserModal
              />
            </>
          )}
          {isEditModalOpen && (
            <CategoryModal
              open={isEditModalOpen}
              title_category="Edit Category"
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={handleEditCategory}
              category={editCategory}
            />
          )}
          {isDeleteModalOpen && (
            <CategoryModal
              open={isDeleteModalOpen}
              title_category="Delete Category"
              onClose={() => setIsDeleteModalOpen(false)}
              onSubmit={handleDeleteCategory}
              category={editCategory}
            />
          )}
          <div className="main-board">
            <div className="table-board">
              <Table
                class="table"
                type="category"
                data={categorieData}
                columns={columns}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Categories;

/* <Table
class="table"
data={userData}
columns={columns}
handleEdit={handleEdit}
handleDelete={handleDelete}
handleDeleteTasks={handleDeleteTasks}
handleActiveChange={handleActiveChange}
/> */
