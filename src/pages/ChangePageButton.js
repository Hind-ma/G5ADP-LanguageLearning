import React from "react";
import { useNavigate } from "react-router-dom";

const ChangePageButton = ({ to, label, className }) => {
  const nav = useNavigate();

  const changePage = () => {
    nav(to);
  };

  return (
    <button className={className} onClick={changePage}>
      {label}
    </button>
  );
};

export default ChangePageButton;
