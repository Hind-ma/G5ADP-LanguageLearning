import ChangePageButton from "./ChangePageButton";
import React, { useState } from "react";
import './PickWord.css';

function PickWord() {

  const [showRoundScore, setRoundScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clickedOptionButton, setClickedOptionButton] = useState(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [correctOptionSelected, setCorrectOptionSelected] = useState(false);

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

  const optionClicked = (isCorrect, buttonId) => {
    setClickedOptionButton(buttonId);

    if (isCorrect) {
      setCorrectOptionSelected(true);
      setNextButtonDisabled(false);
      setScore(score + 1);
    } else {
      setNextButtonDisabled(true);
    }

  }

  const handleNextButtonClicked = () => {
   if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setRoundScore(true);
    }

    // Reset clicked button and disable the next button
    setClickedOptionButton(null);
    setNextButtonDisabled(true);
    setCorrectOptionSelected(false);
  };

  return (
    <div>
      <ChangePageButton to="/home" label="Go to Home" />

      <div>   
        {showRoundScore ? (
          <div className="round-score">
            <h2>
              You got {score} out of {questions.length} correct
            </h2>
            <ChangePageButton to="/home" label="End round" />
          </div>
        ) : (
          <div>
            Press on the Swedish word for <strong>{questions[currentQuestion].text}</strong>
            
            <div className="element-container">
              <div className="pickword-button-container">
                {questions[currentQuestion].options.map((option) => {
                  return (
                    <button
                      className={`color-button ${
                        clickedOptionButton === option.id 
                        ? option.isCorrect 
                          ? ' correct' 
                          : ' wrong'
                        : correctOptionSelected
                          ? ' not-chosen'
                          : ''
                      }`}
                      onClick={() => optionClicked(option.isCorrect, option.id)}
                      key={option.id}
                      //disabled={showRoundScore}
                      disabled={correctOptionSelected}
                    >
                      {option.text}
                    </button>
                  );
                }
                )}             
              </div>

              <button
                className="next-button"
                onClick={handleNextButtonClicked}
                disabled={nextButtonDisabled}
              ></button>
            </div>
          </div>
        )} 
      </div>
    </div>
  );
}

export default PickWord;
