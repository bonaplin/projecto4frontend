import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import "./Users.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Users() {
  const location = useLocation();
  const userData = location.state.userData;

  console.log("Entrou em Users.js");
  console.log(userData);
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
              <Table class="table" data={userData} />
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
