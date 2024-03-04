import ChangePageButton from "./ChangePageButton";

import React, { useState } from "react";
import "./FillBlankModel.css";
import { sentenceList } from "../data-sets/fillBlank";
import {server_is_up, fill_prob } from './AI_server_interface.js';

const sentences = sentenceList;

const url_address = "http://127.0.0.1:5000/get_fill_in_prob";

async function pingURL(url) {
  return fetch(url, { method: "HEAD" })
    .then((response) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}



function Sentence({
  sentence,
  answer,
  correct,
  setCurrentSentence,
  currentSentence,
}) {
  const [userInput, setUserInput] = useState("");
  const [inputColor, setInputColor] = useState("white");
  const [sentenceCorrect, setSentenceCorrect] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);

  const checkAnswer = () => {
    if (server_is_up) {
      const correct_promise = fill_prob(
        sentence.split("_")[0],
        answer.toLowerCase(),
        sentence.split("_")[1],
        "1"
      );
      const answer_promise = fill_prob(
        sentence.split("_")[0],
        userInput.toLowerCase(),
        sentence.split("_")[1],
        "1"
      );
      Promise.all([correct_promise, answer_promise])
        .then((dataArray) => {
          const [correct_prob, answer_prob] = dataArray;
          var grade = answer_prob / correct_prob;
          if (grade > 1) {
            grade = 1;
          }
          setDisplayGrade(grade);
          if (grade < 0.85) {
            setDisplayIncorrect();
            setNextDisabled(true);
            setSentenceCorrect(false);
          } else {
            setSentenceCorrect(true);
            setDisplayCorrect();
            setNextDisabled(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      if (userInput.toLowerCase() === answer.toLowerCase()) {
        setSentenceCorrect(true);
        setInputColor("green");
        setDisplayCorrect();
        setNextDisabled(false);
      } else {
        setSentenceCorrect(false);
        setInputColor("red");
        setDisplayIncorrect();
        setNextDisabled(true);
      }
    }
  };

  const setDisplayCorrect = () => {
    document.getElementById("next").classList.remove("disabled");
    document.getElementById("input").style.color = "var(--green-positive)";
    document.getElementById("input").style.borderColor = "var(--green-positive";
    document.getElementById("allstar").style.visibility = "visible";
  };

  const setDisplayIncorrect = () => {
    document.getElementById("input").style.color = "var(--red-negative)";
    document.getElementById("input").style.borderColor = "var(--red-negative)";
    document.getElementById("allstar").style.visibility = "hidden";
    document.getElementById("next").classList.add("disabled");
  };

  function interpolateHexColor(color1, color2, ratio) {
    const parseHex = (color) => parseInt(color.substring(1), 16);

    const r1 = (parseHex(color1) >> 16) & 255;
    const g1 = (parseHex(color1) >> 8) & 255;
    const b1 = parseHex(color1) & 255;

    const r2 = (parseHex(color2) >> 16) & 255;
    const g2 = (parseHex(color2) >> 8) & 255;
    const b2 = parseHex(color2) & 255;

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  }

  const setDisplayGrade = (grade) => {
    console.log("?", grade);
    const hex_color = interpolateHexColor("#C84C4C", "#79BB6E", grade);

    document.getElementById("next").style.backgroundColor = "#6169e1";
    document.getElementById("next").style.color = "#ffffff";
    document.getElementById("input").style.color = hex_color;
    document.getElementById("input").style.borderColor = hex_color;
    if (grade > 0.85) {
      document.getElementById("allstar").style.visibility = "visible";
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
    standardInput();
  };

  const resetInput = () => {
    setUserInput("");
    setInputColor("white");
    setSentenceCorrect(false);
    resetDisplay();
    setNextDisabled(true);
  };

  const standardInput = () => {
    setInputColor("white");
    setSentenceCorrect(false);
    resetDisplay();
    setNextDisabled(true);
  };

  const resetDisplay = () => {
    document.getElementById("next").classList.add("disabled");
    document.getElementById("input").style.color = "black";
    document.getElementById("input").style.borderColor = "black";
    document.getElementById("allstar").style.visibility = "hidden";
  };

  const inputIndex = sentence.indexOf("_");

  const sentenceWithInput = <span>{sentence.slice(0, inputIndex)}</span>;
  const sentenceWithInput2 = <span>{sentence.slice(inputIndex + 1)}</span>;

  return (
    <div className="sentence-container">
      <div className="fill-box">
        <img
          id="allstar"
          className="stars"
          src={require("../images/star.png")}
        />
        <p className="fill-input">{sentenceWithInput}</p>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="fill-input"
          id="input"
        />
        <p className="fill-input">{sentenceWithInput2}</p>
        <button onClick={checkAnswer} className="check-button">
          Check
        </button>
      </div>
      <div className="fill-container">
        <button
          id="next"
          disabled={nextDisabled}
          onClick={() => {
            resetInput();
            setCurrentSentence((currentSentence + 1) % sentences.length);
          }}
          className="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function FillBlank() {
  const [currentSentence, setCurrentSentence] = useState(0);

  //console.log("curIdx: " + currentSentence + "sen: " + sentences[currentSentence].sentence);

  return (
    <div className="App">
      <ChangePageButton to="/home" label="Go to Home page" />
      <h1 className="fill-title">Fill in the blank of this sentence</h1>
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
