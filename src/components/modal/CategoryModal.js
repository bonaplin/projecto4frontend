import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  title_modal,
  category = {},
}) => {
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description);
  const [id, setId] = useState(category.id); // Add always a default value 0 for id.

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      id,
    });
    console.log("title " + title + "description " + description + "id" + id);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setId(0);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={title_modal}>
      {title_modal === "Delete Category" ? (
        <form onSubmit={handleSubmit}>
          <div className="delete-modal-headers">
            <p>Are you sure you want to delete this category?</p>
          </div>
          <button type="submit">Yes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      ) : title_modal === "Create Category" ? (
        <form onSubmit={handleSubmit}>
          <FormInput
            placeholder="Enter category name"
            type="text"
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormInput
            placeholder="Enter category description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      ) : title_modal === "Edit Category" ? (
        <form onSubmit={handleSubmit}>
          <FormInput
            placeholder="Enter category name"
            type="text"
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormInput
            placeholder="Enter category description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      ) : null}
    </Modal>
  );
};

export default CategoryModal;
