import ChangePageButton from "./ChangePageButton";

import React, { useState } from "react";
//import './FillBlank.css';


const sentences = [
  {
    sentence: "Jag heter _.",
    answer: "Anna",
    correct: false,
  },
  {
    sentence: "Han heter _.",
    answer: "Hans",
    correct: false,
  },
  {
    sentence: "Vi åker _ till jobbet.",
    answer: "katt",
    correct: false,
  },
  {
    sentence: "Vi åker _ till jobbet.",
    answer: "tåget",
    correct: false,
  },
  {
    sentence: "Vi åker _ till jobbet.",
    answer: "tåget",
    correct: false,
  },
];

function Sentence({ sentence, answer, correct, setCurrentSentence, currentSentence }) {
  const [userInput, setUserInput] = useState("");
  const [inputColor, setInputColor] = useState("white");
  const [sentenceCorrect, setSentenceCorrect] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);

  const checkAnswer = () => {
    if (userInput.toLowerCase() === answer.toLowerCase()) {
      setSentenceCorrect(true);
      setInputColor("green");
      setNextDisabled(false);
    } else {
      setSentenceCorrect(false);
      setInputColor("red");
      setNextDisabled(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkAnswer();
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    setInputColor("white");
    setSentenceCorrect(false);
    setNextDisabled(true);
  };

  const resetInput = () => {
    setUserInput("");
    setInputColor("white");
    setSentenceCorrect(false);
    setNextDisabled(true);
  };

  const inputIndex = sentence.indexOf("_");

  const sentenceWithInput = (
    <span>
      {sentence.slice(0, inputIndex)}
      <span className={inputColor}>{userInput}</span>
      {sentence.slice(inputIndex + 1)}
    </span>
  );

  return (
    <div className="sentence-container">
      <p
        className={sentenceCorrect ? "sentence correct" : "sentence incorrect"}
      >
        {sentenceWithInput}
      </p>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className={inputColor}
      />
      <div className="button-container">
        <button onClick={checkAnswer} className="check">
          Check
        </button>
        <button disabled={nextDisabled} onClick={() => { resetInput(); setCurrentSentence(currentSentence + 1); }} className="next">
          Next
        </button>
      </div>
    </div>
  );
}

function FillBlank() {
  const [currentSentence, setCurrentSentence] = useState(0);

  return (
    <div className="App">
      <h1 className="title">Learn Swedish</h1>
      <Sentence
        sentence={sentences[currentSentence].sentence}
        answer={sentences[currentSentence].answer}
        correct={sentences[currentSentence].correct}
        setCurrentSentence={setCurrentSentence}
        currentSentence={currentSentence}
      />
    </div>
  );
}

export default FillBlank;