import ChangePageButton from "./ChangePageButton";
import React, { useState } from "react";
import './PickWord.css';
import { wordList } from "../data-sets/pickLearnConnect";

const questions = wordList.sort(() => Math.random() - 0.5).slice(0, 5); 

function PickWord() {

  const [showRoundScore, setRoundScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clickedOptionButton, setClickedOptionButton] = useState(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);


  const optionClicked = (correctOption, option) => {

    setClickedOptionButton(option);
    setNextButtonDisabled(false);

    if (correctOption === option) {
      setScore(score + 1);
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
            Press on the Swedish word for <strong>{questions[currentQuestion].english}</strong>
            
            <div className="element-container">
              <div className="pickword-button-container">
                {questions[currentQuestion].options.map((option) => {
                  return (
                    <button
                      className={`color-button ${
                        clickedOptionButton === option 
                        ? questions[currentQuestion].swedish === option
                          ? ' correct' 
                          : ' wrong'
                        : clickedOptionButton !== null
                          ? ' not-chosen'
                          : ''
                      }`}
                      onClick={() => optionClicked(questions[currentQuestion].swedish, option)}
                      key={option}
                      //disabled={showRoundScore}
                      disabled={clickedOptionButton !== null}
                    >
                      {option}
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
