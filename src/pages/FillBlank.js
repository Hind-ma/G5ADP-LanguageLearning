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



const url_address = "http://127.0.0.1:5000/get_fill_in_prob"

async function pingURL(url) {
    return fetch(url, { method: 'HEAD' })
    .then(response => {
        return true;
    })
    .catch(error => {
        return false;
    });
}

const ml_server_is_up = await pingURL(url_address)

function fill_prob(before, fill, after, ratio) {
    const params = {
        before: before,
        fill: fill,
        after: after,
        ratio: ratio
    };

    const url = new URL(url_address); // Replace url_address with your actual URL
    url.search = new URLSearchParams(params).toString();
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            return data; // Process the data
        })
        .catch(error => {
            throw error; // Rethrow the error to propagate it
        });
}

function Sentence({ sentence, answer, correct, setCurrentSentence, currentSentence }) {
    const [userInput, setUserInput] = useState("");
    const [inputColor, setInputColor] = useState("white");
    const [sentenceCorrect, setSentenceCorrect] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(true);

    const checkAnswer = () => {


        if(ml_server_is_up){
            const correct_promise = fill_prob(sentence.split("_")[0], answer.toLowerCase(), sentence.split("_")[1], "1")
            const answer_promise = fill_prob(sentence.split("_")[0], userInput.toLowerCase(), sentence.split("_")[1], "1")
            Promise.all([correct_promise, answer_promise])
            .then(dataArray => {
                const [correct_prob, answer_prob] = dataArray;
                var grade = answer_prob / correct_prob
                if (grade > 1){ 
                    grade = 1
                }
                setDisplayGrade(grade)
                if(grade < 0.85){
                    setDisplayIncorrect();
                    setNextDisabled(true);
                    setSentenceCorrect(false);
                }else{
                    setSentenceCorrect(true);
                    setDisplayCorrect();
                    setNextDisabled(false);
                }
            }).catch(error => {console.error('Error:', error);});
            

        }
        else{
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

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
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

        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    }


    
    const setDisplayGrade = (grade) => {
        console.log("?", grade)
        const hex_color = interpolateHexColor("#C84C4C","#79BB6E", grade);
  
        document.getElementById("next").style.backgroundColor = "#6169e1";
        document.getElementById("next").style.color = "#ffffff";
        document.getElementById("input").style.color =hex_color;
        document.getElementById("input").style.borderColor = hex_color;
        if(grade > 0.85){
            document.getElementById("allstar").style.visibility = "visible";
        }
        
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
