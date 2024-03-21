import React from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import ScrumBoard from "./pages/ScrumBoard";
import Task from "./components/scrum-board/Task";
// Import other pages here

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
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
