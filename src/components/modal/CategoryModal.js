import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import FormInput from "../formInput/FormInput";

const CategoryModal = ({
  open,
  onClose,
  onSubmit,
  title_category,
  category = {},
}) => {
  const [title, setTitle] = useState(category.title);
  const [description, setDescription] = useState(category.description);

  console.log("CategoryModal -> category", category);

  useEffect(() => {
    setTitle(category.title);
    setDescription(category.description);
  }, [category]); // Depend on category
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
    });
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <Modal open={open} onClose={onClose} title={title_category}>
      {title_category === "Delete Category" ? (
        <form onSubmit={handleSubmit}>
          <div className="delete-modal-headers">
            <p>Are you sure you want to delete this category?</p>
          </div>
          <button type="submit">Yes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      ) : (
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
      )}
    </Modal>
  );
};

export default CategoryModal;
