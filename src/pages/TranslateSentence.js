import ChangePageButton from "./ChangePageButton";

import React, {useEffect, useState} from "react"
import { ShuffleArray } from "../utils";
import {completeList} from "../data-sets/compose-translate";
import './TranslateSentence.css';

import EndQuizButton from "./EndQuizButton";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// creates a list with five random sentences form the dataset 
//var sentenceList = completeList.sort(() => Math.random() - 0.5).slice(0, 5);
var quizSentences = ShuffleArray(completeList).slice(0, 5);

function TranslateSentence() {
  // consts for the user input
  const [userAnswer, setUserAnswer] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isEnglishToSwedish, setIsEnglishToSwedish] = useState(true);

  // consts for the buttons and other elements in the gui
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [checkButtonDisabled, setCheckButtonDisabled] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [showCorrectSentence, setShowCorrectSentence] = useState(false);

  // consts for the score
  const [showRoundScore, setRoundScore] = useState(false);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();
  const {state} = useLocation();
  var quizList = [];
  if (state !== null) {
    quizList = state.fullQuiz;
  }

  const currSentence = quizSentences[sentenceIndex];
  
  // Switch the direction of translation randomly
  useEffect(() => {
    setIsEnglishToSwedish(Math.random() < 0.5 ? true : false);
  }, [sentenceIndex]);

  const checkAnswer = () => {
    const ansToCheck =
      isEnglishToSwedish === true
        ? currSentence.swedish.toLowerCase()
        : currSentence.english.toLowerCase();

    // The use of the const isCorrect is needed since otherwise it gets
    // into trouble with the asynchronous parts of isAnswerCorrect
    const isCorrect = userAnswer.toLowerCase() === ansToCheck;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);

      var currentScore = localStorage.getItem("quizScore");
      currentScore = parseFloat(currentScore) + 1.0;
      console.log(currentScore);
      localStorage.setItem("quizScore", currentScore);
    } else {
      setShowCorrectSentence(true);
    }

    // set the states of the buttons/input
    setNextButtonDisabled(false);
    setCheckButtonDisabled(true);
    setInputDisabled(true);
  };

   const handleNextButtonClicked = () => {
    // TODO: @CS, maybe this shuffle is overkill?
    quizSentences = ShuffleArray(quizSentences);
    setSentenceIndex((sentenceIndex + 1) % quizSentences.length);
    if (quizList.length !== 0) {
      quizList.shift();
      //console.log(quizList.length);
    }
    if (quizList.length === 0) {
      navigate("/learn");
    } else {
      navigate(quizList[0].route, {state:{fullQuiz: quizList}});
    }

    //reset answer and GUI-elements
    setNextButtonDisabled(true);
    setUserAnswer("");
    setIsAnswerCorrect(null);
    setCheckButtonDisabled(true);
    setInputDisabled(false);
    setShowCorrectSentence(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUserAnswer(inputValue);

    // If there is some input, the check button should be enabled - otherwise not
    setCheckButtonDisabled(inputValue.trim() === "");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    }
  };

  return (
    <div className="translate-sentence">
      <div className="cancel-header">
        <EndQuizButton to={"/learn"} />
      </div>
      <div className="translate-page">
        <div>
          {showRoundScore ? (
            <div className="round-score">
              <h2>
                You got {score} out of {quizSentences.length} correct
              </h2>
              <ChangePageButton to="/" label="End round" />
            </div>
          ) : (
            <div>
              <h3>
                {isEnglishToSwedish === true
                  ? "Translate this to Swedish"
                  : "Translate this to English"}
              </h3>
              <h2>
                {isEnglishToSwedish === true
                  ? currSentence.english
                  : currSentence.swedish}
              </h2>
              <div className="element-container">
                <div
                  className={`answer-container ${
                    isAnswerCorrect !== null
                      ? isAnswerCorrect
                        ? "correct"
                        : "wrong"
                      : ""
                  }`}
                >
                  <input
                    className="translate-input"
                    type="text"
                    placeholder="Type here"
                    value={userAnswer}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    disabled={inputDisabled}
                  />
                  <button
                    className="check-button"
                    onClick={checkAnswer}
                    disabled={checkButtonDisabled}
                  >
                    Check
                  </button>
                </div>
              </div>
              <button
                className="next-button"
                onClick={handleNextButtonClicked}
                disabled={nextButtonDisabled}
              >
                Next
              </button>
              {showCorrectSentence && !isAnswerCorrect && (
                <div className="correct-sentence">
                  Correct answer:{" "}
                  {isEnglishToSwedish
                    ? currSentence.swedish
                    : currSentence.english}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TranslateSentence;
