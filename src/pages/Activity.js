import React from "react";
import Sidebar from "../components/navbar/Sidebar";
import { useState, useEffect } from "react";
import "../pages/activity.css";
import { userStore } from "../stores/UserStore";

function Activity() {
  const username = userStore((state) => state.username);
  const [inputs, setInputs] = useState({});
  const [activities, setActivities] = useState([]);
  const [newactivity, setNewActivity] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/my_activities_backend/rest/activity/all",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.log(error);
        // Optionally, we can set an error state variable to display the error message
      }
    };
    fetchData();
  }, [newactivity]); // Empty dependency array to run only once

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/my_activities_backend/rest/activity/add", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(inputs),
    }).then(function (response) {
      if (response.status === 200) {
        setNewActivity(inputs);
      } else {
        alert("something went wrong :(");
      }
    });
  };
  return (
    <div className="Activity" id="activity-outer-container">
      <Sidebar
        pageWrapId={"activity-page-wrap"}
        outerContainerId={"activity-outer-container"}
      />
      <div className="page-wrap" id="activity-page-wrap">
        <div>
          <h1>My Activities</h1>
          <p>Welcome {username}</p>
        </div>

        <h3>Add a New Activity</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Activity Title:
              <input
                type="text"
                name="title"
                defaultValue=""
                onChange={handleChange}
              />
            </label>
            <label>
              Activity Description:
              <input
                type="text"
                name="description"
                defaultValue=""
                onChange={handleChange}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
        </div>

        <div>
          <table className="tables" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>{activity.title}</td>
                  <td>{activity.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Activity;
