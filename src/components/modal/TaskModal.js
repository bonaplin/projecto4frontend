import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";
import { userStore } from "../../stores/UserStore";

const TaskModal = ({ open, onClose, onSubmit, title_modal, task = {} }) => {
  const today = new Date().toISOString();
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [initialDate, setStartDate] = useState(task.startDate || today);
  const [finalDate, setEndDate] = useState(task.endDate || "");
  const [priority, setPriority] = useState(task.priority || 200);
  const [status, setStatus] = useState(task.status || 100);
  const [category, setCategory] = useState(task.category || "Backlog");
  const [categories, setCategories] = useState([]);
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
        <label className="label-input">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.title} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </label>

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
        <label className="label-input">
          Priority
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={100}>Low</option>
            <option value={200}>Medium</option>
            <option value={300}>High</option>
          </select>
        </label>
        <label className="label-input">
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value={100}>Todo</option>
            <option value={200}>Doing</option>
            <option value={300}>Done</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default TaskModal;
