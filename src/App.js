import React from "react";
import "./App.css";

import Login from "./pages/Login";
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
