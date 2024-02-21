import ChangePageButton from "./ChangePageButton";

import React, { useState } from "react";
import './FillBlankModel.css';

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
            setDisplayCorrect();
            setNextDisabled(false);
        } else {
            setSentenceCorrect(false);
            setInputColor("red");
            setDisplayIncorrect();
            setNextDisabled(true);
        }
    };

    const setDisplayCorrect = () => {
        document.getElementById("next").style.backgroundColor = "#6169e1";
        document.getElementById("next").style.color = "#ffffff";
        document.getElementById("input").style.color = "#79BB6E";
        document.getElementById("input").style.borderColor = "#79BB6E";
        document.getElementById("allstar").style.visibility = "visible";
    }

    const setDisplayIncorrect = () => {
        document.getElementById("input").style.color = "#C84C4C";
        document.getElementById("input").style.borderColor = "#C84C4C";
        document.getElementById("allstar").style.visibility = "hidden";
        document.getElementById("next").style.backgroundColor = "lightgray";
        document.getElementById("next").style.color = "gray";
    }

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
    }

    const resetDisplay = () => {
        document.getElementById("next").style.backgroundColor = "lightgray";
        document.getElementById("next").style.color = "gray";
        document.getElementById("input").style.color = "black";
        document.getElementById("input").style.borderColor = "black";
        document.getElementById("allstar").style.visibility = "hidden";
    }

    const inputIndex = sentence.indexOf("_");

    const sentenceWithInput = (
        <span>
            {sentence.slice(0, inputIndex)}
        </span>
    );
    const sentenceWithInput2 = (
        <span>
            {sentence.slice(inputIndex+1)}
        </span>
    );

    return (
        <div className="sentence-container">
            <div className="fill-box">
                <img id="allstar" className="stars" src={require("../images/star.png")}/>
                <p className="fill-input">{sentenceWithInput}</p>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="fill-input"
                    id = "input"
                />
                <p className="fill-input">{sentenceWithInput2}</p>
            </div>
            <div className="fill-container">
                <button onClick={checkAnswer} className="fill-button">
                    Check
                </button>
                <button id="next" disabled={nextDisabled} onClick={() => { resetInput(); setCurrentSentence((currentSentence + 1) % sentences.length); }} className="fill-button">
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
