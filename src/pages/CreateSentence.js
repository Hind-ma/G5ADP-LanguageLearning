import ChangePageButton from "./ChangePageButton";
import { GetRandomInt, ShuffleArray } from "../utils";
import { useState, useEffect } from "react";
import {completeList} from "../data-sets/compose-translate";
import './CreateSentence.css';
import {text_prob, server_is_up} from "./AI_server_interface"

// creates a list with five random sentences from the dataset 
const makeSentences = completeList.sort(() => Math.random() - 0.5).slice(0, 5)

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

    document.getElementById(index).classList.add("word-disabled");
    setSentence([...sentence, word]);
  };

  
        //document.getElementById(index).style.backgroundColor = '#A0A0A0'; // TODO ERASED??
        setSentence([...sentence, word]);
    };

    const checkSentence = (senId) => {
        const user_scenatnce = sentence.join(' ')
        const correct_scentance = makeSentences[senId].words.join(' ')
        if (server_is_up){
            const correct_promise = text_prob(correct_scentance)
            const user_promise = text_prob(user_scenatnce)
            Promise.all([correct_promise, user_promise])
            .then(dataArray => {
                const [correct_prob, user_prob] = dataArray;
                let grad
                if (user_prob < correct_prob){
                    grad = user_prob / correct_prob
                }else{
                    grad = 1
                }
            
            setIsCorrect(grad > 0.60);
            setShowResult(true);
            setNextDisabled(false);
            setWordsDisabled(true);
            console.log(user_prob, correct_prob, grad)
            }).catch(error => {console.error('Error:', error);});    
        }else{
            var cor = (user_scenatnce === correct_scentance);
            setIsCorrect(cor);
            setShowResult(true);
            setNextDisabled(false);
            setWordsDisabled(true);
            //console.log("res: " + cor);
        }
        
    };

   
  return (
    <div className="create-sentence">
      <ChangePageButton to="/home" label="Go to Home" />
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
    const checkSentence = (senId) => {
        var isCor = (sentence.join(' ') === makeSentences[senId].words.join(' '));
        setIsCorrect(isCor);
        
        if (isCor) {
            setScore(prevScore => prevScore + 1);
            setCheckButtonDisabled(true);
            setNextDisabled(false);
            setWordsDisabled(true);
        } 

        setShowResult(true);
        setTries(prevTries => prevTries + 1);
        //console.log("res: " + cor);
    };

    return (
        <div>
            {showRoundScore ? (
                <div className="round-score">
                    <h2>
                        You got {score} out of {makeSentences.length} correct, on {tries} tries
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
                            className="check-button" 
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
