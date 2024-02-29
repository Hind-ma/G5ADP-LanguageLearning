import ChangePageButton from "./ChangePageButton";

import React, { useState } from "react";
import './FillBlankModel.css';
import { sentenceList } from "../data-sets/fillBlank";

// creates a list with five random sentences from the dataset 
const sentences = sentenceList.sort(() => Math.random() - 0.5).slice(0, 5); 

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
    
    // To handle the score
    const [showRoundScore, setShowRoundScore] = useState(false);
    const [tries, setTries] = useState(0);
    const [score, setScore] = useState(0);
    const [showCorrectWord, setShowCorrectWord] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [checkButtonDisabled, setCheckButtonDisabled] = useState(true);

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
                if (grade < 0.85) {
                    setDisplayIncorrect();
                    setSentenceCorrect(false);
                } else {
                    setSentenceCorrect(true);
                    setDisplayCorrect();
                    if (grade !== 1) {
                        // if not exaclty correct, but still considerad correct enough, show correct word 
                        setShowCorrectWord(true); 
                    }
                    setNextDisabled(false);
                    setCheckButtonDisabled(true);
                    setInputDisabled(true);
                }

                // To handle the score 
                setTries(prevTries => prevTries + 1); 
                setScore(prevScore => prevScore + grade);

            }).catch(error => {console.error('Error:', error);});

        }
        else{
            if (userInput.toLowerCase() === answer.toLowerCase()) {
                setSentenceCorrect(true);
                setInputColor("green");
                setDisplayCorrect();

                // To handle the score
                setScore(prevScore => prevScore + 1);

                setNextDisabled(false);
                setCheckButtonDisabled(true);
                setInputDisabled(true);
            } else {
                setSentenceCorrect(false);
                setInputColor("red");
                setDisplayIncorrect();
            }
            setTries(prevTries => prevTries + 1);
        }
    };

    const setDisplayCorrect = () => {
        // document.getElementById("next").style.backgroundColor = "#6169e1";
        // document.getElementById("next").style.color = "#ffffff";
        document.getElementById("input").style.color = "#79BB6E";
        document.getElementById("input").style.borderColor = "#79BB6E";
        document.getElementById("allstar").style.visibility = "visible";
    }

    const setDisplayIncorrect = () => {
        document.getElementById("input").style.color = "#C84C4C";
        document.getElementById("input").style.borderColor = "#C84C4C";
        document.getElementById("allstar").style.visibility = "hidden";
        // document.getElementById("next").style.backgroundColor = "lightgray";
        // document.getElementById("next").style.color = "gray";
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
  
        // document.getElementById("next").style.backgroundColor = "#6169e1";
        // document.getElementById("next").style.color = "#ffffff";
        document.getElementById("input").style.color =hex_color;
        document.getElementById("input").style.borderColor = hex_color;
        if(grade > 0.85){
            document.getElementById("allstar").style.visibility = "visible";
        }
        
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !checkButtonDisabled) {
            checkAnswer();
        }
    };


    const handleInputChange = (event) => {
        setUserInput(event.target.value);
        standardInput();

        // if there is some input, check button should be enabled 
        setCheckButtonDisabled(event.target.value.trim() === '');
    };

    const resetInput = () => {
        setUserInput("");
        setInputColor("white");
        setSentenceCorrect(false);
        resetDisplay();
        setNextDisabled(true);
        setInputDisabled(false);
        setShowCorrectWord(false);
    };

    const standardInput = () => {
        setInputColor("white");
        setSentenceCorrect(false);
        resetDisplay();
        setNextDisabled(true);
    }

    const resetDisplay = () => {
        // document.getElementById("next").style.backgroundColor = "lightgray";
        // document.getElementById("next").style.color = "gray";
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

    const handleNextButtonClicked = () => {
        resetInput(); 

        if (currentSentence + 1 < sentences.length) {
            setCurrentSentence(currentSentence + 1);
        } else {
            setShowRoundScore(true);
        }
    }

    return (

        <div>
            {showRoundScore ? (
                <div className="round-score">
                    <h2>
                        You got {score} out of {sentences.length} correct, on {tries} tries
                    </h2>
                    <ChangePageButton to="/" label="End round" />
                </div>
            ) : ( 
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
                            disabled={inputDisabled}
                        />
                        <p className="fill-input">{sentenceWithInput2}</p>
                    </div>
                    {showCorrectWord && !sentenceCorrect && (
                        <div className="correct-word">
                            Correct answer: {answer}
                        </div>
                    )}
                    <div className="fill-container">
                        <button 
                            id = "check"
                            onClick={checkAnswer} 
                            className="fill-button" 
                            disabled={checkButtonDisabled}
                            >
                            Check
                        </button>
                        <button 
                            id="next" 
                            disabled={nextDisabled} 
                            onClick={handleNextButtonClicked} 
                            className="fill-button"
                            >
                            Next
                        </button>
                    </div>
 
                </div>
            )}
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
