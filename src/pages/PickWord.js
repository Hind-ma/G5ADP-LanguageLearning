import ChangePageButton from "./ChangePageButton";
import React, { useState } from "react";
import "./PickWord.css";
import { wordList } from "../data-sets/pickLearnConnect";
import EndQuizButton from "./EndQuizButton";

import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ShuffleArray } from "../utils";

//var questions = wordList.sort(() => Math.random() - 0.5).slice(0, 5);
var questions = ShuffleArray(wordList).slice(0, 5);

function PickWord() {
  const [showRoundScore, setRoundScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clickedOptionButton, setClickedOptionButton] = useState(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [correctOptionSelected, setCorrectOptionSelected] = useState(false);
  const [optionsSelected, setOptionsSelected] = useState([]);

  const navigate = useNavigate();
  const {state} = useLocation();
  var quizList = [];
  if (state !== null) {
    quizList = state.fullQuiz;
  }
  const optionClicked = (correctOption, option) => {
    setClickedOptionButton(option);

    if (correctOption === option) {
      setCorrectOptionSelected(true);
      setNextButtonDisabled(false);
      setScore(score + 1);
    } else {
      setOptionsSelected((currentSelected) => [...currentSelected, option]);
      setNextButtonDisabled(true);
    }
  };

  const handleNextButtonClicked = () => {
    if (quizList.length !== 0) {
      quizList.shift();
      console.log(quizList.length);
    }
    if (quizList.length === 0) {
      navigate("/learn");
    } else {
      navigate(quizList[0].route, {state: {fullQuiz: quizList}});
    }

    // TODO: @CS, maybe this shuffle is overkill?
    questions = ShuffleArray(wordList).slice(0, 5);
    
    // Reset currentQuestion index
    setCurrentQuestion(currentQuestion => (currentQuestion + 1) % questions.length);
 
     // Reset clicked button and disable the next button
     setClickedOptionButton(null);
     setNextButtonDisabled(true);
     setCorrectOptionSelected(false);
     setOptionsSelected([]);
   };

  return (
    <div className="pick-word">
      <div className="cancel-header">
        <EndQuizButton to={"/learn"} />
      </div>

      <div className="pickword-element-container">
        {showRoundScore ? (
          <div className="round-score">
            <h2>
              You got {score} out of {questions.length} correct
            </h2>
            {/*<ChangePageButton to="/home" label="End round" />*/}
          </div>
        ) : (
          <div>
            Press on the Swedish word for{" "}
            <strong>{questions[currentQuestion].english}</strong>
            <div>
              <div className="pickword-button-container">
                {questions[currentQuestion].options.map((option) => {
                  return (
                    <button
                      className={`color-button ${
                        clickedOptionButton === option
                          ? questions[currentQuestion].swedish === option
                            ? " correct"
                            : " wrong"
                          : correctOptionSelected
                          ? " not-chosen"
                          : optionsSelected.includes(option)
                          ? " not-correct"
                          : ""
                      }`}
                      onClick={() =>
                        optionClicked(
                          questions[currentQuestion].swedish,
                          option
                        )
                      }
                      key={option}
                      //disabled={showRoundScore}
                      disabled={
                        optionsSelected.includes(option) | correctOptionSelected
                      }
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              className="next-button"
              onClick={handleNextButtonClicked}
              disabled={nextButtonDisabled}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PickWord;
