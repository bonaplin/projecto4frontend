import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Singup";
import Singup from "./pages/Singup";
// Import other pages here

function App() {
  return <Login />;
}

// function App() {
//   return (
//     <div
//       className="App"
//       id="outer-container"
//       style={{ backgroundColor: "cyan" }}
//     >
//       <Header />
//       <div
//         className="page-wrap"
//         id="app-page-wrap"
//         style={{ backgroundColor: "orange" }}
//       >
//         <main>
//           <Login />
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// }

export default App;
