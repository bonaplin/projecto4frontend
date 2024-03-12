import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoriesButton() {
  function handleClick() {
    console.log("CategoriesButton click");
    navigate("/categories");
  }
  const navigate = useNavigate();

  console.log("CategoriesButton");
  return <div onClick={handleClick}>Categories</div>;
}
