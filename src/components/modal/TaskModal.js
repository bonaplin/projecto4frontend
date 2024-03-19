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
        <Dropdown
          data={categories.map((category) => ({
            value: category.title,
            label: category.title,
          }))}
          onChange={setCategory}
          type="Select a category"
        />

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

        <Dropdown
          data={[
            { value: 100, label: "Low" },
            { value: 200, label: "Medium" },
            { value: 300, label: "High" },
          ]}
          onChange={setPriority}
          type="Select a priority"
        />

        <Dropdown
          data={[
            { value: 100, label: "Todo" },
            { value: 200, label: "Doing" },
            { value: 300, label: "Done" },
          ]}
          onChange={setStatus}
          type="Select a status"
        />

        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default TaskModal;
