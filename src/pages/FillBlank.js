import ChangePageButton from "./ChangePageButton";

import React, { useState } from "react";
import "./FillBlankModel.css";
// import "../App.css";
import { sentenceList } from "../data-sets/fillBlank";
import EndQuizButton from "./EndQuizButton";
import { server_is_up, fill_prob, interpolateHexColor } from "./AI_server_interface.js";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShuffleArray } from "../utils";

var sentences = sentenceList;

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

const ml_server_is_up = await pingURL(url_address);

function Sentence({ sentence, answer, correct, setCurrentSentence, currentSentence, quiz }) {
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
    const [answerChecked, setAnswerChecked] = useState(false);
    const [grading, setGrading] = useState(0);
    const [colorScale, setColorScale] = useState("#000000");
    const [gradingIsLoading, setGradingIsLoading] = useState(false);

    const navigate = useNavigate();

    const checkAnswer = () => {
        if(server_is_up){
            setGradingIsLoading(true);
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
                    setCheckButtonDisabled(true);
                    setInputDisabled(true);
                    setScore(prevScore => prevScore + grade);
                }

                setNextDisabled(false);

                // To handle the score 
                setTries(prevTries => prevTries + 1); 
                setGrading(grade);

                var currentScore = localStorage.getItem("quizScore");
                currentScore = parseFloat(currentScore) + parseFloat(grade);
                console.log(currentScore);
                localStorage.setItem("quizScore", currentScore);

            }).catch(error => {
                //console.error('Error:', error);
            })
            .finally(() => {
                setAnswerChecked(true);
                setGradingIsLoading(false);
            });


        }
        else{
            if (userInput.toLowerCase() === answer.toLowerCase()) {
                setSentenceCorrect(true);
                setInputColor("green");
                setDisplayCorrect();

                // To handle the score
                setScore(prevScore => prevScore + 1);

                setCheckButtonDisabled(true);
                setInputDisabled(true);
            } else {
                setSentenceCorrect(false);
                setInputColor("red");
                setDisplayIncorrect();
            }                
            setNextDisabled(false);
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
    
    const setDisplayGrade = (grade) => {
        ///console.log("?", grade)
        const hex_color = interpolateHexColor("#C84C4C","#79BB6E", grade);
        setColorScale(hex_color);
  
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
        if (quiz.length !== 0) {
            quiz.shift();
            //console.log(quiz.length);
        }
        if (quiz.length === 0) {
            navigate("/learn");
        } else {
            navigate(quiz[0].route, {state: {fullQuiz: quiz}});
        }
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
        document.getElementById("input").style.color = "black";
        document.getElementById("input").style.borderColor = "black";
        document.getElementById("allstar").style.visibility = "hidden";
    }

    const handleNextButtonClicked = () => {
        resetInput(); 

        if (currentSentence + 1 < sentences.length) {
            setCurrentSentence(currentSentence + 1);
        } else {
            setShowRoundScore(true);
        }

        var currentScore = localStorage.getItem("quizScore");
        currentScore = parseFloat(currentScore) + 0.0;
        console.log(currentScore);
        localStorage.setItem("quizScore", currentScore);
        
        setAnswerChecked(false);
        setGrading(0);
    }

    const inputIndex = sentence.indexOf("_");
    const sentenceWithInput = <span>{sentence.slice(0, inputIndex)}</span>;
    const sentenceWithInput2 = <span>{sentence.slice(inputIndex + 1)}</span>;

    return (

        <div>
            {showRoundScore ? (
                <div className="round-score">
                    <h2>
                        You got {score} out of {sentences.length} correct, on {tries} tries
                    </h2>
                    <ChangePageButton to="/home" label="End round" />
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
                    {/* TODO add code to use this below - now never shown */}
                    {showCorrectWord && !sentenceCorrect && (
                        <div className="correct-word">
                            Correct answer: {answer}
                        </div>
                    )}
                    {/* Show the grading */}
                    {gradingIsLoading && (
                        <div>Grading is being calculated...</div>
                    )}

                    {answerChecked && !gradingIsLoading && (
                        <>
                            <div>Grading: {grading.toFixed(2)}/1</div>

                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "50%", margin: "0 auto" }}>
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
                                        width: `${(1-grading) * 100}%`, // Adjust the width as needed
                                        marginTop: "5px",
                                        borderRight: "1px solid black",
                                        borderTop: "1px solid black",
                                        borderBottom: "1px solid black", 
                                    }}
                                />
                            </div>
                        </>
                    )}
                    
                    <div className="fill-container">
                        <button 
                            onClick={checkAnswer} 
                            className="check-button" 
                            disabled={checkButtonDisabled}
                            >
                            Check
                        </button>
                        <button 
                            disabled={nextDisabled} 
                            onClick={handleNextButtonClicked} 
                            className="next-button"
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
    sentences = ShuffleArray(sentences);

    const {state} = useLocation();
    var quizList = [];
    if (state !== null) {
        quizList = state.fullQuiz;
    }

    return (
    <div>
          <div className="cancel-header">
              <EndQuizButton to={"/learn"} />
      </div>

            <h1 className="fill-title">Fill in the blank of this sentence</h1>
            <Sentence
                sentence={sentences[currentSentence].sentence}
                answer={sentences[currentSentence].answer}
                correct={sentences[currentSentence].correct}
                setCurrentSentence={setCurrentSentence}
                currentSentence={currentSentence}
                quiz={quizList}
            />
        </div>
    );
}

export default FillBlank;
