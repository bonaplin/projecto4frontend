import React from "react";
import Sidebar from "../components/navbar/Sidebar.js";
import "../index.css";
import { userStore } from "../stores/UserStore.js";
import Footer from "../components/footer/Footer.js";
import "./Home.css";
import TaskColumn from "../components/task/column/TaskColumn.js";
import Header from "../components/header/Header.js";
function Home() {
  const username = userStore((state) => state.username);
  return (
    <div className="Home">
      <Header />
      <Sidebar
        pageWrapId={"home-page-wrap"}
        outerContainerId={"home-outer-container"}
      />
      <div className="page-wrap" id="home-page-wrap">
        <h4>{username}! / filters / settings / ... </h4>
        <div className="scrum-board">
          <TaskColumn className="task-column" title="To Do">
            {" "}
            s
          </TaskColumn>
          <TaskColumn className="task-column" title="In Progress">
            {" "}
            d
          </TaskColumn>
          <TaskColumn className="task-column" title="Done">
            {" "}
            f
          </TaskColumn>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

// import React from "react";
// import Sidebar from "../components/navbar/Sidebar.js";
// import "../index.css";
// import { userStore } from "../stores/UserStore.js";
// import Footer from "../components/footer/Footer.js";
// import "./Home.css";
// import TaskColumn from "../components/task/column/TaskColumn.js";
// import Header from "../components/header/Header.js";
// function Home() {
//   const username = userStore((state) => state.username);
//   return (
//     <div className="Home">
//       <Header />
//       <Sidebar
//         pageWrapId={"home-page-wrap"}
//         outerContainerId={"home-outer-container"}
//       />
//       <div className="page-wrap" id="home-page-wrap">
//         <h4>{username}! / filters / settings / ... </h4>
//         <div className="scrum-board">
//           <TaskColumn className="task-column" title="To Do">
//             {" "}
//             s
//           </TaskColumn>
//           <TaskColumn className="task-column" title="In Progress">
//             {" "}
//             d
//           </TaskColumn>
//           <TaskColumn className="task-column" title="Done">
//             {" "}
//             f
//           </TaskColumn>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Home;
