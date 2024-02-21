import ChangePageButton from "./ChangePageButton";
import React, {useEffect, useState} from "react"
import { GetRandomInt } from "../utils";
import {completeList} from "../data-sets/compose-translate";
import './TranslateSentence.css';

// creates a list with five random sentences form the dataset 
const sentenceList = completeList.sort(() => Math.random() - 0.5).slice(0, 2); //TODO change to five

function TranslateSentence() {
  const [userAnswer, setUserAnswer] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isEnglishToSwedish, setIsEnglishToSwedish] = useState(true);
  
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [checkButtonDisabled, setCheckButtonDisabled] = useState(true);
  const [inputDisabled, setInputDisabled] = useState(false);

  const [showRoundScore, setRoundScore] = useState(false);
  const [score, setScore] = useState(0);

  const currSentence = sentenceList[sentenceIndex];
  
  // Switch the direction of translation randomly
  useEffect(() => {
    setIsEnglishToSwedish(Math.random() < 0.5 ? true : false);
  }, [sentenceIndex]);

  const checkAnswer = () => {
    const ansToCheck = isEnglishToSwedish === true
      ? currSentence.swedish.toLowerCase()
      : currSentence.english.toLowerCase();

    // The use of the const isCorrect is needed since otherwise it gets
    // into trouble with the asynchronous parts of isAnswerCorrect
    const isCorrect = userAnswer.toLowerCase() === ansToCheck;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    // set the states of the buttons/input
    setNextButtonDisabled(false);
    setCheckButtonDisabled(true);
    setInputDisabled(true);
  };

  const handleNextButtonClicked = () => {
    if (sentenceIndex + 1 < sentenceList.length) {
      setSentenceIndex(sentenceIndex + 1);
    } else {
       setRoundScore(true);
     }
 
     //reset answer and next-button
     setNextButtonDisabled(true);
     setUserAnswer("");
     setIsAnswerCorrect(null);
     setCheckButtonDisabled(true);
     setInputDisabled(false);
   };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUserAnswer(inputValue);

    // If there is some input, the check button should be enabled - otherwise not
    setCheckButtonDisabled(inputValue.trim() === '');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <div>
      <ChangePageButton to="/" label="Go to Home" />

      <div>
        {showRoundScore ? (
          <div className="round-score">
            <h2>
              You got {score} out of {sentenceList.length} correct
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

            {/* TODO denna vill itne funka att få rätt färg nu tydligen  */}
            <h2>{isEnglishToSwedish === true ? currSentence.english : currSentence.swedish}</h2>
            
            <div className={`answer-container ${isAnswerCorrect !== null ? (isAnswerCorrect ? 'correct' : 'wrong') : ''}`}>
              <input
                className="input"
                type="text"
                placeholder="Type here"
                value={userAnswer}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={inputDisabled}
              />
              {/* <button onClick={checkAnswer}>Check</button> */}
              {/* skriv om detta TODO, ovan och nedan */}
              <button
                className="check-button"
                onClick={checkAnswer}
                disabled={checkButtonDisabled}
              >Check</button>
            </div>

            Score is {score}
            <button
              className="next-button"
              onClick={handleNextButtonClicked}
              disabled={nextButtonDisabled}
            ></button>
          </div>
        )}
      </div>  
    </div>
  );
}

export default TranslateSentence;
