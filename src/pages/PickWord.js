import ChangePageButton from "./ChangePageButton";
import React, { useState } from "react";

function PickWord() {

  const [showRoundScore, setRoundScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      text: "Lecture",
      options: [
        { id: 0, text: "Läxa", isCorrect: false },
        { id: 1, text: "Lärare", isCorrect: false },
        { id: 2, text: "Föreläsning", isCorrect: true },
        { id: 3, text: "Tenta", isCorrect: false },
      ],
    },
    {
      text: "Train",
      options: [
        { id: 0, text: "Tåg", isCorrect: true },
        { id: 1, text: "Tong", isCorrect: false },
        { id: 2, text: "Bil", isCorrect: false },
        { id: 3, text: "Byggnad", isCorrect: false },
      ],
    },
    {
      text: "Suitcase",
      options: [
        { id: 0, text: "Ryggsäck", isCorrect: false },
        { id: 1, text: "Resväska", isCorrect: true },
        { id: 2, text: "Tygkasse", isCorrect: false },
        { id: 3, text: "Datorväska", isCorrect: false },
      ],
    },
    {
      text: "Water",
      options: [
        { id: 0, text: "Hav", isCorrect: false },
        { id: 1, text: "Kran", isCorrect: false },
        { id: 2, text: "Damm", isCorrect: false },
        { id: 3, text: "Vatten", isCorrect: true },
      ],
    },
    {
      text: "Shoes",
      options: [
        { id: 0, text: "Skor", isCorrect: true },
        { id: 1, text: "Byxor", isCorrect: false },
        { id: 2, text: "Tröja", isCorrect: false },
        { id: 3, text: "Strumpor", isCorrect: false },
      ],
    },
  ]

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setRoundScore(true);
    }
  }

  return <div>
    <ChangePageButton to="/" label="Go to Home" />
    <h1>Pick the right answer</h1>

    <div>   
    {showRoundScore ?
      <div className="round-score">
        <h2>Round score is "{score}"</h2>
        <h2>
          {score} out of {questions.length} correct
        </h2>
        <ChangePageButton to="/" label="End round" />
      </div>
      :
      <div>
        <h2> Question {currentQuestion + 1} out of {questions.length}</h2>
        <h4>Current Score: {score}</h4>

        <h3 className="question-text">
          What is "{questions[currentQuestion].text}" in Swedish?
        </h3>
        <ul>
          {questions[currentQuestion].options.map((option) => {
            return (
              <button><li onClick={() => optionClicked(option.isCorrect)} key={option.id}>{option.text} </li></button>
            );
          }
          )}
        </ul>
      </div>
    } 
    </div>
  </div>;
}

export default PickWord;
