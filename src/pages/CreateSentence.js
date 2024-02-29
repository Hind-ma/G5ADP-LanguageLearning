import ChangePageButton from "./ChangePageButton";
import { GetRandomInt, ShuffleArray } from "../utils";
import { useState, useEffect } from "react";
import {completeList} from "../data-sets/compose-translate";
import './CreateSentence.css';

// creates a list with five random sentences from the dataset 
const makeSentences = completeList.sort(() => Math.random() - 0.5).slice(0, 5)

/** Shows if the sentence is correct or incorrect */
function ResultBox({ bDisplay, bSuccess }) {
    const item = bDisplay ? (bSuccess ? "Correct" : "Incorrect") : null;
    return (
        <div>
            <p className={`result-text ${bSuccess ? 'rt' : 'wr'}`}>{item}</p>
        </div>
    );
}

/** Displays the correct sentence */
function DisplayCorrectSentence({ bDisplay, bSuccess, sentence }) {
    return (
        <div className={`correct-sen-container ${bSuccess ? 'correct' : 'incorrect'}`}>
            <p className="correct-sen">{bDisplay ? (!bSuccess ? ("Correct Answer: " + sentence) : null) : null}</p>
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
            <button className="next-button"
                disabled={bDisabled}
                onClick={() => { onClickFunc() }}>
            </button>
        </div>
    );
}

function CreateSentence() {
    // const startSenIdx = GetRandomInt(0, makeSentences.length - 1);
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
    const [checkButtonDisabled, setCheckButtonDisabled] = useState(false);

    useEffect(() => {
        setShuffledWords(ShuffleArray(makeSentences[currentSenIdx].words));
    }, [currentSenIdx]);

    function updateMakeSentence() {
        if (currentSenIdx + 1 < makeSentences.length) {
            setCurrentSenIdx(currentSenIdx + 1);
        } else {
            setShowRoundScore(true);
        }
        //console.log("senId: " + currentSenIdx);

        setSentence([]);
        setShowResult(false);
        setNextDisabled(true);
        setWordsDisabled(false);
        setCheckButtonDisabled(false); //TODO
    }

    const handleWordClick = (word, index) => {
        if (sentence.includes(word)) {
            //document.getElementById(index).style.backgroundColor = '#FFFFFF'; //TODO ERASED??
            setSentence(sentence.filter((w) => w !== word));
            return;
        }

        //document.getElementById(index).style.backgroundColor = '#A0A0A0'; // TODO ERASED??
        setSentence([...sentence, word]);
    };

    const checkSentence = (senId) => {
        var isCor = (sentence.join(' ') === makeSentences[senId].words.join(' '));
        setIsCorrect(isCor);
        setNextDisabled(false);
        setWordsDisabled(true);
        
        if (isCor) {
            setScore(prevScore => prevScore + 1);
        } 

        setShowResult(true);
        //console.log("res: " + cor);
        
        setCheckButtonDisabled(true);
    };

    return (
        <div>
            {showRoundScore ? (
                <div className="round-score">
                    <h2>
                        You got {score} out of {makeSentences.length} correct
                    </h2>
                    <ChangePageButton to="/" label="End round" />
                </div>
            ) : (
                <div>
                    <ChangePageButton to="/home" label="Go to Home" />
                    <div className="page-head">
                        <p>Make the sentence by selecting the words</p>
                    </div>
                    <div className={`result-container ${showResult ? (isCorrect ? 'rt' : 'wr') : null}`}>
                        <ResultBox bDisplay={showResult} bSuccess={isCorrect} />
                        <DisplayCorrectSentence bDisplay={showResult} bSuccess={isCorrect} sentence={currentSentence.join(' ')} />
                    </div>
                    <div className="user-sen-container">
                        <p className="user-sen">{sentence.length > 0 ? sentence.join(' ') : null}</p>
                    </div>
                    <div className="word-container" >
                        {shuffledWords.map((word, index) => (
                            <button
                                className="word-button"
                                key={index}
                                disabled={wordsDisable}
                                onClick={() => handleWordClick(word)}>
                                {word}
                            </button>
                        ))}
                    </div>
                    <div className="button-container">
                        <button 
                            className="chk-button" 
                            onClick={() => checkSentence(currentSenIdx)}
                            disabled={checkButtonDisabled}
                            >
                            Check
                        </button>
                        <NextSentenceButton bDisabled={nextDisable} onClickFunc={updateMakeSentence} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateSentence;
