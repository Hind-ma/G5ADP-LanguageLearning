import ChangePageButton from "./ChangePageButton";
import { GetRandomInt } from "../utils";
import { useState } from "react";

/* TODO: @CS, Remove in future - this is only for Sprint 1 demo */
const introWords = [
    {id: 0, svWord: "apelsin", enWord: "orange"},
    { id: 1, svWord: "ost", enWord: "cheese"},
    //{id: 2, svWord: "gr�dde", enWord: "cream"},
    { id: 2, svWord: "gradde", enWord: "cream"},
    //{id: 3, svWord: "mj�lk", enWord: "milk"},
    { id: 3, svWord: "mjolk", enWord: "milk" },
    { id: 4, svWord: "banan", enWord: "banana" },
    { id: 5, svWord: "melon", enWord: "melon"},
    { id: 6, svWord: "kiwi", enWord: "kiwi"},
    { id: 7, svWord: "citron", enWord: "lemon"},
];

/**
 * PrintWord
 * @param {any} id - ID of the word from introWords list
 * @returns [ Swedish Word : English Word ]
 */
function PrintWord({ id }) {
    const item = introWords.find(word => word.id === id);

    // TODO: @CS, we may need to handle the case where the item doesn't exist for the requested id, it depends on where we get the data from and the fields they have

    return (
        <div>
            {/* id is for debugging */}
            {/* {item.id} */}
            <span>{item.svWord.toLocaleUpperCase()} : {item.enWord.toLocaleUpperCase()}</span>
        </div>
    )
}

function PrintWordHeader() {
    return (
        <div>
            <b>
                <span>Swedish : English</span>
            </b>
        </div>
    );
}

/**
 *  NextWordButton - updates the displayed word
 * @param {any} onClick - on click function
 * @returns
 */
function NextWordButton({ onClick }) {
    return (
        <div>
            <button onClick={onClick}>
                Next Word
            </button>
        </div>
    );
}

function IntroduceWord() {
    const startIdx = GetRandomInt(0, introWords.length - 1);
    const [currentIdx, setCurrentIdx] = useState(startIdx);

    /** Updates the word index to display */
    function updateWord() {
        setCurrentIdx(currentIdx => (currentIdx + 1 > introWords.length - 1) ? 0 : currentIdx + 1);
    }

    return (
        <div>
            <ChangePageButton to="/home" label="Go to Home" />
            <div className="intro-word">
                <h2>INTRODUCE WORDS</h2>
                <PrintWordHeader />
                <PrintWord id={currentIdx} />
                <NextWordButton onClick={updateWord} />
            </div>
        </div>
    );
}

export default IntroduceWord;
