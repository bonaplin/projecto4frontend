import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import Footer from "../components/footer/Footer";
import "./Users.css";

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
          <h4>/ filters / settings / ... </h4>
          <div className="main-board">
            <div className="table-board">
              <Table class="table" data={userData} />
            </div>
            <div className="preview-board">preview</div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Users;
/*<Table data={userData} />*/
