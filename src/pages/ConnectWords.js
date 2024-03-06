// ConnectWords.js
import React, { useState, useEffect } from "react";
import ChangePageButton from "./ChangePageButton";
import "./ConnectWords.css";
import "../App.css";
import { wordList } from "../data-sets/pickLearnConnect";

import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ShuffleArray } from "../utils";

//var pairsList = wordList.sort(() => Math.random() - 0.5).slice(0, 4);
var pairsList = ShuffleArray(wordList).slice(0, 4);

const ConnectWords = () => {
  
  var [wordPairs, setWordPairs] = useState(pairsList);

  const navigate = useNavigate();
  const {state} = useLocation();
  var quizList = [];
  if (state !== null) {
    quizList = state.fullQuiz;
  }

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const [result, setResult] = useState({ tries: 0, correct: 0 });
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // to handle the shuffling of the swedish order 
  const [shuffledSwedishOrder, setShuffledSwedishOrder] = useState([]);
  const [shuffledEnglishOrder, setShuffledEnglishOrder] = useState([]);

  useEffect(() => {
    // Create a shuffled array of IDs when the component mounts, so only initial time
    const shuffledOrder = wordPairs.map((pair) => pair.id);
    for (let i = shuffledOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
    }
    setShuffledSwedishOrder(shuffledOrder);
  }, []);

  useEffect(() => {
    // Create a shuffled array of IDs when the component mounts, so only initial time
    const shuffledOrder = wordPairs.map((pair) => pair.id);
    for (let i = shuffledOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
    }
    setShuffledEnglishOrder(shuffledOrder);
  }, []);  

  const updateButtonState = (id, language, state) => {
    setWordPairs((prevWordPairs) =>
      prevWordPairs.map((pair) =>
        pair.id === id
          ? {
              ...pair,
              [language === "swedish" ? "stateSwe" : "stateEng"]: state,
            }
          : pair
      )
    );
  };

  // Update the state of the remaining buttons of the same language
  const updateRemainingLanguageButtons = (id, language, state) => {
    setWordPairs((prevWordPairs) =>
      prevWordPairs.map((pair) => {
        if (pair.id !== id && pair.stateEng !== "hidden" && pair.stateSwe !== "hidden") {
          updateButtonState(pair.id, language, state);
        }
        return pair;
      })
    );
  };

  const findClickedWord = () => {
    // Check if any swedish word has stateSwe set to 'clicked'
    const swedishClickedWord = wordPairs.find(
      (pair) => pair.stateSwe === "clicked"
    );

    // Check if any english word has stateEng set to 'clicked'
    const englishClickedWord = wordPairs.find(
      (pair) => pair.stateEng === "clicked"
    );

    // Return the id and language of the clicked word, or null if not found
    if (swedishClickedWord) {
      return { id: swedishClickedWord.id, language: "swedish" };
    } else if (englishClickedWord) {
      return { id: englishClickedWord.id, language: "english" };
    } else {
      return null;
    }
  };

  const handleWordClick = (selectedId, selectedLanguage) => {
    const firstClicked = findClickedWord();
    // if it is the first word clicked, highlight it
    if (!firstClicked) {
      updateButtonState(selectedId, selectedLanguage, "clicked");
      updateRemainingLanguageButtons(selectedId, selectedLanguage, "disabled");
    } else {
      handleSecondWordClick(selectedId, selectedLanguage, firstClicked);
    }
  };

  const handleSecondWordClick = (
    selectedId,
    selectedLanguage,
    firstClicked
  ) => {
    updateButtonState(selectedId, selectedLanguage, "clicked");

    // set all the other buttons in that language as disabled 
    updateRemainingLanguageButtons(selectedId, selectedLanguage, "disabled");
    
    // Check if the translation matches
    const isMatch = firstClicked.id === selectedId;

    if (isMatch) {
      // it is a match
      setResult((prevResult) => ({
        tries: prevResult.tries + 1,
        correct: prevResult.correct + 1,
      }));
      setMatchedPairs([...matchedPairs, selectedId]);
      updateButtonState(firstClicked.id, firstClicked.language, "correct");
      updateButtonState(selectedId, selectedLanguage, "correct");
      setTimeout(() => {
        updateButtonState(firstClicked.id, firstClicked.language, "hidden");
        updateButtonState(selectedId, selectedLanguage, "hidden");
        const oppositeLanguage = selectedLanguage === "swedish" ? "english" : "swedish";
        updateRemainingLanguageButtons(selectedId, oppositeLanguage, "");
        updateRemainingLanguageButtons(selectedId, selectedLanguage, "");
      }, 1000);
    } else {
      // wrong answer
      setResult((prevResult) => ({
        tries: prevResult.tries + 1,
        correct: prevResult.correct,
      }));
      setFeedbackMessage("Wrong! Try again.");
      updateButtonState(firstClicked.id, firstClicked.language, "wrong");
      updateButtonState(selectedId, selectedLanguage, "wrong");
      setTimeout(() => {
        setFeedbackMessage("");
        // reset the buttons for the firstClicked language
        updateButtonState(firstClicked.id, firstClicked.language, "");
        updateRemainingLanguageButtons(firstClicked.id, firstClicked.language, "");

        // reset the buttons for the second clicked language
        updateButtonState(selectedId, selectedLanguage, "");
        const oppositeLanguage = selectedLanguage === "swedish" ? "english" : "swedish";
        updateRemainingLanguageButtons(selectedId, selectedLanguage, "");
      }, 1000);
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
      // TODO: @CS, This is a temporary "working" solution
      //window.location.reload();
      navigate(quizList[0].route, {state: {fullQuiz: quizList}})
    }

    //reset answer and GUI-elements
    setNextButtonDisabled(true);
   };

  useEffect(() => {
    if (result.correct === wordPairs.length && matchedPairs.length === wordPairs.length) {
      //setFeedbackMessage(
      //  `You got ${result.correct} out of ${result.tries} on the first try!`
      //);
      //setShowResult(true);
      
      // TODO: @CS, something here
      setNextButtonDisabled(false);
    }
  }, [result, wordPairs.length, matchedPairs.length]);

  // used to display the sweidhs words according to the shuffled array
  const createNewArrayFromOrder = (idArray) => {
    const rearrangedPairs = idArray.map((id) =>
      wordPairs.find((pair) => pair.id === id)
    );
    return rearrangedPairs;
  };

  return (
    <div>
      <ChangePageButton to="/home" label="Go to Home" />

      {showResult ? (
        <div className="result-container">
          <p>{feedbackMessage}</p>
          {/*<ChangePageButton to="/home" label="Go to Home" />*/}
        </div>
      ) : (
        <div>
          <div className="feedback-message">{feedbackMessage}</div>
          <div className="word-pairs-container">
            {/* Display Swedish words on the left */}
            <div className="word-column">
              {createNewArrayFromOrder(shuffledSwedishOrder).map((pair) => (
                <button
                  key={pair.id}
                  className={`connect-word-button ${pair.stateSwe}`}
                  onClick={() => handleWordClick(pair.id, "swedish")}
                >
                  {pair.swedish}
                </button>
              ))}
            </div>

            {/* Display English words on the right */}
            <div className="word-column">
              {createNewArrayFromOrder(shuffledEnglishOrder).map((pair) => (
                <button
                  key={pair.id}
                  className={`connect-word-button ${pair.stateEng}`}
                  onClick={() => handleWordClick(pair.id, "english")}
                >
                  {pair.english}
                </button>
              ))}
            </div>
          </div>
          <div>
            <button
                className="next-button"
                onClick={handleNextButtonClicked}
                disabled={nextButtonDisabled}>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWords;
