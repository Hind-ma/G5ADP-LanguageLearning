import ChangePageButton from "./ChangePageButton";
import { GetRandomInt, ShuffleArray } from "../utils";
import { useState, useEffect } from "react";

/* TODO: @CS, Remove in future - this is only for Sprint 1 demo */
const makeSentences = [
    { id: 0, words: [[0, "ursakta"], [1, "var"], [2, "kan"], [3, "jag"], [4, "hitta"], [5, "mjolken"]] },
    //{ id: 0, words: [[0, "urs�kta"], [1, "var"], [2, "kan"], [3, "jag"], [4, "hitta"], [5, "mj�lken"]] },
    { id: 1, words: [[0, "den"], [1, "ar"], [2, "halv"], [3, "sju"]] },
    //{ id: 1, words: [[0, "den"], [1, "�r"], [2, "halv"], [3, "sju"]] },
    { id: 2, words: [[0, "tack"], [1, "for"], [2, "en"], [3, "rolig"], [4, "fest"]] },
    //{ id: 2, words: [[0, "tack"], [1, "f�r"], [2, "en"], [3, "rolig"], [4, "fest"]] },
    { id: 3, words: [[0, "jag"], [1, "trivs"], [2, "bra"], [3, "i"], [4, "Sverige"]] },
    { id: 4, words: [[0, "Lisa"], [1, "laser"], [2, "svenska"], [3, "pa"], [4, "universitetet"]] },
    //{ id: 4, words: [[0, "Lisa"], [1, "l�ser"], [2, "svenska"], [3, "p�"], [4, "universitetet"]] },
]

/** Shows if the sentence is correct or incorrect */
function ResultBox({ bDisplay, bSuccess }) {
    const item = bDisplay ? (bSuccess ? "Correct" : "Incorrect") : null;
    return (
        <div>
            <p>{item}</p>
        </div>
    );
}

/* TODO: @CS, add space between buttons */
function DisplayShuffledSentence({ senId, wordOnClick }) {
    const item = makeSentences.find(sen => sen.id === senId);
    var shuffleWords = item.words;
    shuffleWords = ShuffleArray(shuffleWords);
    const senLength = item.words.length;

    // TODO: @CS, add the custom button? kanske
    const sen = shuffleWords.map(word =>
        //<DisplayWordButton key={word[0]} word={word[1].toString()} onClick={wordOnClick(word[0])} />
        <button
            key={word[0]}
            onClick={() => { wordOnClick(senLength, word[0], word[1].toString()); }}>
            {word[1].toString()}
        </button >
    );

    return (
        <div>
            <p>{sen}</p>
        </div>
    )
}

function DisplayUserSentence({ sentence }) {
    //var [currentUsrSen, setCurrentUsrSen] = useState("");
    //const word = wordIds.map((id) => senId.id === id);
    /*var words = [];
    wordIds.forEach((id) => {
        if (id === makeSentences[senId].words[0]) {
            words.push(words.makeSentences[senId].words[0]);
        }
    }
    );
    const res = words.map(word =>
        <p>{word}</p>);*/

    /*function updateUserSen() {
        currentUsrSen = sen;
        setCurrentUsrSen(currentUsrSen);
        console.log("updateUserSen: " + currentUsrSen);
        return (<p>{currentUsrSen}</p>);
    }*/

    return (
        //<div>User Sentence Here</div>
        //<div><p>{updateUserSen}</p></div>
        //<div>{sen}</div>
        <div>
            <p>{sentence}</p>
        </div>
    )
}

// Displays the correct sentence
function DisplayCorrectSentence({ bDisplay, sentence }) {
    return (
        <div>
            <p>{bDisplay ? "Correct Answer: " + sentence : null}</p>
        </div>
    );
}

/**
 * NextSentenceButton - updates the displayed sentence
 * @param {any} onClickFunc - on click function
 * @returns
 */
function NextSentenceButton({ onClickFunc }) {
    //var label = bBtnState ? "Next Sentence" : "Check";
    var label = "Next Sentence";
    return (
        <div><button
            onClick={() => { onClickFunc() }}>
            {label}
        </button></div>
    );
}

function CreateSentence() {
    const startSenIdx = GetRandomInt(0, makeSentences.length - 1);
    const [currentSenIdx, setCurrentSenIdx] = useState(startSenIdx);
    const [bShowResult, setShowResult] = useState(false);
    const [bResult, setResult] = useState(false);
    const [corSentence, setCorSentence] = useState("");

    var usrSen = "";
    var correctSen = getCorrectSentence(currentSenIdx);

    // Word IDs of the current sentence
    var wordIdxs = [];

    /** Reset the wordIdxs array */
    function resetWordIdxsState() {
        wordIdxs = [];
    }

    function resetShowResult() {
        setShowResult(false);
    }

    function resetCorSentence() {
        setCorSentence("");
    }

    /** Updates the current sentence index to display */
    function updateMakeSentence() {
        setCurrentSenIdx(idx => (idx + 1 > makeSentences.length - 1) ? 0 : idx + 1);

        resetWordIdxsState();
        resetShowResult();
        resetCorSentence();
    }

    function getCorrectSentence(senId) {
        const words = makeSentences[senId].words;
        let sen = "";
        for (let i = 0; i < words.length; i++) {
            sen = sen + words[i][1].toString() + " ";
        }

        return sen;
    }

    function updateUserSentence(word) {
        usrSen = usrSen + word + " ";

        console.log("usrSen: " + usrSen);
    }

    function checkUserSentence() {
        var success = (correctSen === usrSen);

        setResult(success);
        setShowResult(true);
        setCorSentence(correctSen);

        console.log("correctSen: " + correctSen);
        //console.log("usrSen: " + usrSen);
        //console.log("success: " + success);
    }

    function onWordButtonClicked(senLength, wordId, word) {
        // Check for length of the sentence
        if (wordIdxs.length < senLength) {
            // Update wordIdxs
            wordIdxs.push(wordId);

            // TODO: @CS, some bug here
            updateUserSentence(word);
        }

        if (wordIdxs.length === senLength) {
            checkUserSentence();
        }
    }

    /*useEffect(() => {
        if (bUpdateUserSen) {
            //setShowResult(true);
        }
    }, [bUpdateUserSen]);*/

    return (
        <div>
            <ChangePageButton to="/" label="Go to Home" />
            <div className="intro-word">
                <h2>CREATE THE SENTENCE</h2>
                {/* TODO: @CS, fix result box parameters */}
                <ResultBox bDisplay={bShowResult} bSuccess={bResult} />
                <DisplayCorrectSentence bDisplay={!bResult} sentence={corSentence} />
                <DisplayUserSentence sentence={usrSen} />
                <DisplayShuffledSentence senId={currentSenIdx} wordOnClick={onWordButtonClicked} />
                {/*<CheckSentenceButton />*/}
                <NextSentenceButton onClickFunc={updateMakeSentence} />
            </div>
        </div>
    );
}

export default CreateSentence;