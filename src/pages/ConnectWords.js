// ConnectWords.js
import React, { useState, useEffect } from "react";
import ChangePageButton from "./ChangePageButton";
import "./ConnectWords.css";
import "../App.css";

const ConnectWords = () => {
  const [wordPairs, setWordPairs] = useState([
    {
      id: 1,
      swedish: "Lärare",
      english: "Teacher",
      stateSwe: "",
      stateEng: "",
    },
    { id: 2, swedish: "Bok", english: "Book", stateSwe: "", stateEng: "" },
    { id: 3, swedish: "Skola", english: "School", stateSwe: "", stateEng: "" },
    {
      id: 4,
      swedish: "Dator",
      english: "Computer",
      stateSwe: "",
      stateEng: "",
    },
  ]);

  const [result, setResult] = useState({ tries: 0, correct: 0 });
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showResult, setShowResult] = useState(false);

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

    if (selectedLanguage === firstClicked.language) {
      // second word clicked, but the same language
      // TODO might need to handle some user feedback here, another highlight
      setFeedbackMessage(
        `They are the same language. Try again but take a word from the ${
          selectedLanguage === "swedish" ? "English" : "Swedish"
        } words.`
      );
      updateButtonState(selectedId, selectedLanguage, "wrong");
      setTimeout(() => {
        setFeedbackMessage("");
        updateButtonState(selectedId, selectedLanguage, "");
      }, 2000);
    } else {
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
          updateButtonState(firstClicked.id, firstClicked.language, "disabled");
          updateButtonState(selectedId, selectedLanguage, "disabled");
        }, 2000);
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
          updateButtonState(firstClicked.id, firstClicked.language, "");
          updateButtonState(selectedId, selectedLanguage, "");
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (
      result.correct === wordPairs.length &&
      matchedPairs.length === wordPairs.length
    ) {
      setFeedbackMessage(
        `You got ${result.correct} out of ${result.tries} correct!`
      );
      setShowResult(true);
    }
  }, [result, wordPairs.length, matchedPairs.length]);

  return (
    <div>
      <ChangePageButton to="/home" label="Go to Home" />

      {showResult ? (
        <div className="result-container">
          <p>{feedbackMessage}</p>
          <ChangePageButton to="/" label="Go to Home" />
        </div>
      ) : (
        <div>
          <div className="feedback-message">{feedbackMessage}</div>
          <div className="word-pairs-container">
            {/* Display Swedish words on the left */}
            <div className="word-column">
              {wordPairs.map((pair) => (
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
              {wordPairs.map((pair) => (
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
        </div>
      )}
    </div>
  );
};

export default ConnectWords;
