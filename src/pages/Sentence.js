import ChangePageButton from "./ChangePageButton";
import { GetRandomInt, ShuffleArray } from "../utils";
import { useState } from "react";

/* TODO: @CS, Remove in future - this is only for Sprint 1 demo */
const makeSentences = [
    { id: 0, words: ["ursakta", "var", "kan", "jag", "hitta", "mjolken"] },
    { id: 1, words: ["den", "ar", "halv", "sju"] },
    { id: 2, words: ["tack", "for", "en", "rolig", "fest"] },
    { id: 3, words: ["jag", "trivs", "bra", "i", "Sverige"] },
    { id: 4, words: ["Lisa", "laser", "svenska", "pa", "universitetet"] },
]

/* TODO: @CS,give proper function name, add space between buttons */
function DisplayShuffledSentence({ id }) {
    const item = makeSentences.find(sen => sen.id === id);
    var shufflewords = item.words;
    shufflewords = ShuffleArray(shufflewords);

    // TODO: @CS, add the custom button
    const sen = shufflewords.map(word =>
        <button>{word.toString()}</button>
    );

    return (
        <div>
            {/* id is for debugging */}
            {/* {item.id} */}  
            <p>{sen}</p>
        </div>
    )
}

function NextSentenceButton({ onClick }) {
    return (
        <div>
            <button onClick={onClick}>
                Next Sentence
            </button>
        </div>
    );
}

function Sentence() {
    const startIdx = GetRandomInt(0, makeSentences.length - 1);
    const [currentIdx, setCurrentIdx] = useState(startIdx);

    function updateMakeSentence() {
        setCurrentIdx(currentIdx => (currentIdx + 1 > makeSentences.length - 1) ? 0 : currentIdx + 1);
    }

    return (
        <div>
            <ChangePageButton to="/" label="Go to Home" />
            <div className="intro-word">
                <h2>MAKE THE SENTENCE</h2>
                <DisplayShuffledSentence id={currentIdx} />
                <NextSentenceButton onClick={updateMakeSentence} />
            </div>
        </div>
    );
}

export default Sentence;
