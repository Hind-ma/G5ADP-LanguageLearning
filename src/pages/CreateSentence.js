import ChangePageButton from "./ChangePageButton";
import { GetRandomInt, ShuffleArray } from "../utils";
import { useState, useEffect } from "react";
import { completeList } from "../data-sets/compose-translate";
import "./CreateSentence.css";
import EndQuizButton from "./EndQuizButton";

const makeSentences = completeList;

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
  const startSenIdx = GetRandomInt(0, makeSentences.length - 1);
  const [currentSenIdx, setCurrentSenIdx] = useState(startSenIdx);
  const [sentence, setSentence] = useState([]);
  const [bCorrect, setIsCorrect] = useState(false);
  const [bShowResult, setShowResult] = useState(false);
  const [bNextDisable, setNextDisabled] = useState(true);
  const [bWordsDisable, setWordsDisabled] = useState(false);

  const currentSentence = makeSentences[currentSenIdx].words;
  const [shuffledWords, setShuffledWords] = useState([]);

  useEffect(() => {
    setShuffledWords(ShuffleArray(makeSentences[currentSenIdx].words));
  }, [currentSenIdx]);

  function updateMakeSentence() {
    setCurrentSenIdx((currentSenIdx + 1) % makeSentences.length);
    //console.log("senId: " + currentSenIdx);

    setSentence([]);
    setShowResult(false);
    setNextDisabled(true);
    setWordsDisabled(false);
  }

  const handleWordClick = (word, index) => {
    if (sentence.includes(word)) {
      document.getElementById(index).classList.remove("word-disabled");
      setSentence(sentence.filter((w) => w !== word));
      return;
    }

    document.getElementById(index).classList.add("word-disabled");
    setSentence([...sentence, word]);
  };

  const checkSentence = (senId) => {
    var cor = sentence.join(" ") === makeSentences[senId].words.join(" ");
    setIsCorrect(cor);
    setShowResult(true);
    setNextDisabled(false);
    setWordsDisabled(true);
    //console.log("res: " + cor);
  };

  return (
    <div className="create-sentence">
      <div className="cancel-header">
        <EndQuizButton to={"/learn"} />
      </div>
      <div className="sentence-activity">
        <div className="page-head">
          <p>Make the sentence by selecting the words</p>
        </div>
        <div
          className={`result-container ${
            bShowResult ? (bCorrect ? "rt" : "wr") : null
          }`}
        >
          <ResultBox bDisplay={bShowResult} bSuccess={bCorrect} />
          <DisplayCorrectSentence
            bDisplay={bShowResult}
            bSuccess={bCorrect}
            sentence={currentSentence.join(" ")}
          />
        </div>
        <div className="check-container">
          <div className="user-sen-container">
            <p className="user-sen">
              {sentence.length > 0 ? sentence.join(" ") : null}
            </p>
          </div>
          <button
            className="check-button"
            onClick={() => checkSentence(currentSenIdx)}
          >
            Check
          </button>
        </div>
        <div className="word-container">
          {shuffledWords.map((word, index) => (
            <button
              id={index}
              key={index}
              disabled={bWordsDisable}
              className={
                !bWordsDisable ? "word-button" : "word-button word-disabled"
              }
              onClick={() => handleWordClick(word, index)}
            >
              {word}
            </button>
          ))}
        </div>
        <div className="next-wrap">
          <NextSentenceButton
            bDisabled={bNextDisable}
            onClickFunc={updateMakeSentence}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateSentence;
