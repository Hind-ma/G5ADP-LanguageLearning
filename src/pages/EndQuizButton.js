import React from "react";
import { useNavigate } from "react-router-dom";

const EndQuizButton = ({ to }) => {
  const nav = useNavigate();

  const changePage = () => {
    nav(to);
  };

  return (
    <button className="quit-quiz-button" onClick={changePage}>
      <svg
        className="cancel-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          className="cancel-path"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
        />
      </svg>
    </button>
  );
};

export default EndQuizButton;
