import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import EditProfile from "./pages/EditProfile";
import DeletedTasks from "./pages/DeletedTasks";
import ScrumBoard from "./pages/ScrumBoard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route index element={<App />} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/singup" element={<Singup />} />

      <Route path="/header" element={<Header />} />
      <Route path="/scrum-board" element={<ScrumBoard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/categories" element={<Categories />} />

      <Route path="/deleted-tasks" element={<DeletedTasks />} />

      <Route path="/footer" element={<Footer />} />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
