import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";
import { userStore } from "../../stores/UserStore";
import Dropdown from "../dropdown/Dropdown";
import FormSelect from "../formInput/FormSelect";
const TaskModal = ({ open, onClose, onSubmit, title_modal, task = {} }) => {
  const today = new Date().toISOString();
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [initialDate, setStartDate] = useState(
    task.initialDate
      ? new Date(task.initialDate).toISOString().split("T")[0]
      : today
  );
  const [finalDate, setEndDate] = useState(
    task.finalDate ? new Date(task.finalDate).toISOString().split("T")[0] : ""
  );
  const [priority, setPriority] = useState(task.priority || "");
  const [status, setStatus] = useState(task.status || "");
  const [category, setCategory] = useState(task.category || "");
  const [categories, setCategories] = useState([]);
  const id = task.id;
  const token = userStore.getState().token;

  // if (title_modal === "Add task") {
  //   setTitle("");
  //   setDescription("");
  //   setStartDate(today);
  //   setEndDate("");
  //   setPriority(200);
  //   setStatus(100);
  //   setCategory("Backlog");
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      initialDate,
      finalDate,
      priority,
      status,
      category,
      id,
    });
    resetForm();
  };
  const resetForm = () => {
    const form = document.querySelector("form");
    if (form) form.reset();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setStartDate(null);
    setEndDate(null);
    setPriority("");
    setStatus("");
    setCategory("");
    onClose();
  };

  //

  useEffect(() => {
    fetch("http://localhost:8080/demo-1.0-SNAPSHOT/rest/category/all", {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (
    <>
      <Modal open={open} onClose={handleClose} title={title_modal}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FormInput
              placeholder={"Enter task title"}
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <FormInput
              placeholder={"Enter task description"}
              name="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <FormSelect
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categories.map((category) => ({
                value: category.title,
                label: category.title,
              }))}
            />
            <FormSelect
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={[
                { value: 100, label: "Low" },
                { value: 200, label: "Medium" },
                { value: 300, label: "High" },
              ]}
            />
            {title_modal === "Edit task" ? (
              <FormSelect
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { value: 100, label: "Todo" },
                  { value: 200, label: "Doing" },
                  { value: 300, label: "Done" },
                ]}
              />
            ) : null}
            <FormInput
              type="date"
              name="date"
              label="Start Date"
              value={initialDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FormInput
              type="date"
              name="date"
              label="End Date"
              value={finalDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <button className="submit-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default TaskModal;
