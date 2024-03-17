import React from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";

import Login from "./pages/Login";
import ScrumBoard from "./components/scrum-board/ScrumBoard";
import Task from "./components/scrum-board/Task";
// Import other pages here

function App() {
  return (
    <div className="App">
      <ScrumBoard />
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
