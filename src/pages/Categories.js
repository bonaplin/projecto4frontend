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
import ModalYesNo from "../components/modal/ModalYesNo";
import Modal from "react-responsive-modal";
function Categories() {
  const navigate = useNavigate();
  const token = userStore.getState().token;
  const username = userStore.getState().username;
  const role = userStore.getState().role;
  const [categorieData, setCategorieData] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

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
      alert(await response.text());
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
  async function handleDeleteCategory() {
    const category = editCategory;
    const response = await fetch(
      `http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/delete/${category.id}`,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );

    if (response.ok) {
      fetchCategories();
      setIsDeleteModalOpen(false);
    } else if (!response.ok) {
      alert(await response.text());
    }
  }
  /* ******* ******* *********************************** *****/

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
        body: JSON.stringify(category),
      }
    );

    if (response.ok) {
      fetchCategories();
      setIsEditModalOpen(false);
      console.log("Categorie Updated");
    } else if (!response.ok) {
      alert(await response.text());
    }
  }
  /* ******* ******* *********************************** *****/

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
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(category),
      }
    );
    if (response.ok) {
      fetchCategories();
      setIsModalOpen(false);
    } else {
      alert(await response.text());
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
              <span>
                <AddCircleIcon
                  className="add-some"
                  onClick={handleAddCategoryButton}
                  fontSize="large"
                />
              </span>

              <CategoryModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateCategory}
                title_modal="Create Category"
                user={{}} // Pass an empty user object to the UserModal
              />
            </>
          )}
          {isEditModalOpen && (
            <CategoryModal
              open={isEditModalOpen}
              title_modal="Edit Category"
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={handleEditCategory}
              category={editCategory}
            />
          )}
          {isDeleteModalOpen && (
            <>
              <ModalYesNo
                title="Delete Category"
                message="Are you sure you want to delete this category?"
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onYes={handleDeleteCategory}
                onNo={() => setIsDeleteModalOpen(false)}
              />
            </>
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
