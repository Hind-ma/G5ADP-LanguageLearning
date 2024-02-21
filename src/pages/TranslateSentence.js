import ChangePageButton from "./ChangePageButton";
import React, {useEffect, useState} from "react"
import { GetRandomInt } from "../utils";
import {completeList} from "../data-sets/compose-translate";
import './TranslateSentence.css';

// creates a list with five random sentences form the dataset 
const sentenceList = completeList.sort(() => Math.random() - 0.5).slice(0, 5);

function TranslateSentence() {
  const [userAnswer, setUserAnswer] = useState("");
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [translationDirection, setTranslationDirection] = useState("englishToSwedish");
  
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [showRoundScore, setRoundScore] = useState(false);
  const [score, setScore] = useState(0);

  const currSentence = sentenceList[sentenceIndex];
  
  // Switch the direction of translation randomly
  useEffect(() => {
    setTranslationDirection(Math.random() < 0.5 ? "englishToSwedish" : "swedishToEnglish");
  }, [sentenceIndex]);

  const checkAnswer = () => {
    const ansToCheck = translationDirection === "englishToSwedish"
      ? currSentence.swedish.toLowerCase()
      : currSentence.english.toLowerCase();

    if (userAnswer.toLowerCase() === ansToCheck) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }

    setNextButtonDisabled(false);

    if (isAnswerCorrect) {
      setScore(score + 1);
    }
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
   };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
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
              {translationDirection === "englishToSwedish"
                ? "Translate this to Swedish"
                : "Translate this to English"}
            </h3>

            {/* TODO denna vill itne funka att få rätt färg nu tydligen  */}
            <h2>{translationDirection === "englishToSwedish" ? currSentence.english : currSentence.swedish}</h2>
            
            <div className="answer-container">
              <input
                type="text"
                placeholder="Type here"
                value={userAnswer}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              {/* <button onClick={checkAnswer}>Check</button> */}
              {/* skriv om detta TODO, ovan och nedan */}
              <img className="pen-icon" src="./editSymbol"/>
            </div>

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
