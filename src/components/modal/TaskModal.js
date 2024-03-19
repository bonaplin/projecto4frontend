import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";
import { userStore } from "../../stores/UserStore";
import Dropdown from "../dropdown/Dropdown";

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
  const [priority, setPriority] = useState(task.priority || 200);
  const [status, setStatus] = useState(task.status || 100);
  const [category, setCategory] = useState(task.category || "Backlog");
  const [categories, setCategories] = useState([]);
  const id = task.id;
  const token = userStore.getState().token;

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
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setPriority("");
    setStatus("");
    setCategory("");
    onClose();
  };

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
    <Modal open={open} onClose={onClose} title={title_modal}>
      <form onSubmit={handleSubmit}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category.title} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>

        <FormInput
          placeholder={"Enter task title"}
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormInput
          placeholder={"Enter task description"}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormInput
          type="date"
          label="Start Date"
          value={initialDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <FormInput
          type="date"
          label="End Date"
          value={finalDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value={100}>Low</option>
          <option value={200}>Medium</option>
          <option value={300}>High</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value={100}>Todo</option>
          <option value={200}>Doing</option>
          <option value={300}>Done</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default TaskModal;
