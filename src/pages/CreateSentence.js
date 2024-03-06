import ChangePageButton from "./ChangePageButton";
import { GetRandomInt, ShuffleArray } from "../utils";
import { useState, useEffect } from "react";
import { completeList } from "../data-sets/compose-translate";
import "./CreateSentence.css";
import {
  text_prob,
  server_is_up,
  interpolateHexColor,
} from "./AI_server_interface";
import EndQuizButton from "./EndQuizButton";

// creates a list with five random sentences from the dataset
const makeSentences = completeList.sort(() => Math.random() - 0.5).slice(0, 5);

/** Shows if the sentence is correct or incorrect */
function ResultBox({ bDisplay, bSuccess }) {
  const item = bDisplay ? (bSuccess ? "Correct" : "Incorrect") : null;
  return (
    <div>
      <p className={`result-text ${bSuccess ? "rt" : "wr"}`}>{item}</p>
    </div>
  );
}

/** Displays the correct sentence */
function DisplayCorrectSentence({ bDisplay, bSuccess, sentence }) {
  return (
    <div
      className={`correct-sen-container ${bSuccess ? "correct" : "incorrect"}`}
    >
      <p className="correct-sen">
        {bDisplay ? (!bSuccess ? "Correct Answer: " + sentence : null) : null}
      </p>
    </div>
  );
}

/**
 * NextSentenceButton - updates the displayed sentence
 * @param {any} onClickFunc - on click function
 * @returns
 */
function NextSentenceButton({ bDisabled, onClickFunc }) {
  return (
    <div>
      <button
        className="next-button"
        disabled={bDisabled}
        onClick={() => {
          onClickFunc();
        }}
      >
        Next
      </button>
    </div>
  );
}

function CreateSentence() {
  const [currentSenIdx, setCurrentSenIdx] = useState(0);
  const [sentence, setSentence] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [nextDisable, setNextDisabled] = useState(true);
  const [wordsDisable, setWordsDisabled] = useState(false);

  const currentSentence = makeSentences[currentSenIdx].words;
  const [shuffledWords, setShuffledWords] = useState([]);

  // To handle the score
  const [showRoundScore, setShowRoundScore] = useState(false);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [checkButtonDisabled, setCheckButtonDisabled] = useState(false);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [grading, setGrading] = useState(0);
  const [colorScale, setColorScale] = useState("#000000");
  const [gradingIsLoading, setGradingIsLoading] = useState(false);

  useEffect(() => {
    setShuffledWords(ShuffleArray(makeSentences[currentSenIdx].words));
  }, [currentSenIdx]);

  function updateMakeSentence() {
    if (currentSenIdx + 1 < makeSentences.length) {
      setCurrentSenIdx(currentSenIdx + 1);
    } else {
      setShowRoundScore(true);
    }

    setSentence([]);
    setShowResult(false);
    setNextDisabled(true);
    setWordsDisabled(false);
    setCheckButtonDisabled(false);

    setAnswerChecked(false);
    setGrading(0);
  }

  const handleWordClick = (word, index) => {
    if (sentence.includes(word)) {
      setSentence(sentence.filter((w) => w !== word));
      return;
    }

    setSentence((sentence) => [...sentence, word]);
  };

  const checkSentence = (senId) => {
    const user_sentence = sentence.join(" ");
    const correct_sentence = makeSentences[senId].words.join(" ");
    if (server_is_up) {
      setGradingIsLoading(true);
      const correct_promise = text_prob(correct_sentence);
      const user_promise = text_prob(user_sentence);
      Promise.all([correct_promise, user_promise])
        .then((dataArray) => {
          const [correct_prob, user_prob] = dataArray;
          var grade = user_prob / correct_prob;
          if (grade > 1) {
            grade = 1;
          }

          setDisplayGrade(grade);

          if (grade < 0.6) {
            setIsCorrect(false);
          } else {
            setIsCorrect(true);
            setWordsDisabled(true);
            setCheckButtonDisabled(true);
            setScore((prevScore) => prevScore + grade);
          }

          setNextDisabled(false);
          setShowResult(true);
          setTries((prevTries) => prevTries + 1);
          setGrading(grade);
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setAnswerChecked(true);
          setGradingIsLoading(false);
        });
    } else {
      var cor = user_sentence === correct_sentence;
      setIsCorrect(cor);
      if (cor) {
        setScore((prevScore) => prevScore + 1);
        setCheckButtonDisabled(true);
        setWordsDisabled(true);
      }

      setNextDisabled(false);
      setShowResult(true);
      setTries((prevTries) => prevTries + 1);
    }
  };

  const setDisplayGrade = (grade) => {
    console.log("?", grade);
    const hex_color = interpolateHexColor("#C84C4C", "#79BB6E", grade);
    setColorScale(hex_color);
  };

  return (
    <div className="create-sentence">
      <div className="cancel-header">
        <EndQuizButton to={"/learn"} />
      </div>
      <div className="sentence-activity">
        {showRoundScore ? (
          <div className="round-score">
            <h2>
              You got {score.toFixed(2)} out of {makeSentences.length} correct,
              on {tries} tries
            </h2>
            <ChangePageButton to="/home" label="End round" />
          </div>
        ) : (
          <div>
            <div className="page-head">
              <p>Make the sentence by selecting the words</p>
            </div>
            <div
              className={`result-container ${
                showResult ? (isCorrect ? "rt" : "wr") : null
              }`}
            >
              <ResultBox bDisplay={showResult} bSuccess={isCorrect} />
              <DisplayCorrectSentence
                bDisplay={showResult}
                bSuccess={isCorrect}
                sentence={currentSentence.join(" ")}
              />
            </div>
            <div className="user-sen-container">
              <p className="user-sen">
                {sentence.length > 0 ? sentence.join(" ") : null}
              </p>
            </div>
            <div className="word-container">
              {shuffledWords.map((word, index) => (
                <button
                  id={index}
                  className={
                    wordsDisable || sentence.includes(word)
                      ? "word-button word-disabled"
                      : "word-button"
                  }
                  key={index}
                  onClick={() => handleWordClick(word, index)}
                >
                  {word}
                </button>
              ))}
            </div>

            {/* Show the grading */}
            {gradingIsLoading && <div>Grading is being calculated...</div>}
            {answerChecked && !gradingIsLoading && (
              <>
                <div>Grading: {grading.toFixed(2)}/1</div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      background: colorScale,
                      height: "10px", // Adjust the height as needed
                      width: `${grading * 100}%`, // Adjust the width as needed
                      marginTop: "5px",
                      borderLeft: "1px solid black",
                      borderTop: "1px solid black",
                      borderBottom: "1px solid black",
                    }}
                  />
                  <div
                    style={{
                      background: "lightgrey",
                      height: "10px", // Adjust the height as needed
                      width: `${(1 - grading) * 100}%`, // Adjust the width as needed
                      marginTop: "5px",
                      borderRight: "1px solid black",
                      borderTop: "1px solid black",
                      borderBottom: "1px solid black",
                    }}
                  />
                </div>
              </>
            )}

            <div className="button-container">
              <button
                className="check-button"
                onClick={() => checkSentence(currentSenIdx)}
                disabled={checkButtonDisabled}
              >
                Check
              </button>
              <div className="next-wrap">
                <NextSentenceButton
                  bDisabled={nextDisable}
                  onClickFunc={updateMakeSentence}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSentence;
