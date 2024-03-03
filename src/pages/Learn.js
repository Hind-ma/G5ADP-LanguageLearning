import ChangePageButton from "./ChangePageButton";
import { completeList } from "../data-sets/compose-translate";
import { sentenceList } from "../data-sets/fillBlank";
import { wordList } from "../data-sets/pickLearnConnect";
import "./Learn.css";
import { useState } from "react";

const quizList = [
    {id: 0, type: "wordTranslate", route: "/pick-word", dataset: wordList, num: 3},
    {id: 1, type: "connectWords", route: "/connect-words", dataset: wordList, num: 3},
    {id: 2, type: "createSen", route: "/create-sen", dataset: completeList, num: 2},
    {id: 3, type: "fillBlank", route: "/fill-blank", dataset: sentenceList, num: 2},
    {id: 4, type: "translateSen", route: "/TranslateSentence", dataset: completeList, num: 2}
];

function Learn() {
    
    // Data from quiz types
    const [pickWords] = useState(() => { return quizList[0].dataset.sort(() => Math.random() - 0.5).slice(0, quizList[0].num) });
    const [connectWords] = useState(() => { return quizList[1].dataset.sort(() => Math.random() - 0.5).slice(0, quizList[1].num) });
    const [createSen] = useState(() => { return quizList[2].dataset.sort(() => Math.random() - 0.5).slice(0, quizList[2].num) });
    const [fillBlank] = useState(() => { return quizList[3].dataset.sort(() => Math.random() - 0.5).slice(0, quizList[3].num) });
    const [translateSen] = useState(() => { return quizList[4].dataset.sort(() => Math.random() - 0.5).slice(0, quizList[4].num) });

    // Make quiz data array
    const quizData = [];
    var qdIdx = 0;
    for (var i1 = 0; i1 < pickWords.length; i1++)
    {
        quizData.push({id: qdIdx, data: pickWords[i1], route: quizList[0].route });
        qdIdx++;
    }
    for (var i2 = 0; i2 < connectWords.length; i2++)
    {
        quizData.push({id: qdIdx, data: connectWords[i2], route: quizList[1].route });
        qdIdx++;
    }
    for (var i3 = 0; i3 < createSen.length; i3++)
    {
        quizData.push({id: qdIdx, data: createSen[i3], route: quizList[2].route });
        qdIdx++;
    }
    for (var i4 = 0; i4 < fillBlank.length; i4++)
    {
        quizData.push({id: qdIdx, data: fillBlank[i4], route: quizList[3].route });
        qdIdx++;
    }
    for (var i5 = 0; i5 < translateSen.length; i5++)
    {
        quizData.push({id: qdIdx, data: translateSen[i5], route: quizList[4].route });
        qdIdx++;
    }

    // Randomize quiz data
    quizData.sort(() => Math.random() - 0.5);
    
    // TODO: @CS, remove, Debug print
    console.log("Quiz Data");
    const quizLog = quizData.map(x => console.log(x));
    
    return (
        <div>
            <div>
                <p>Learn Page</p>
                <ChangePageButton to="/home" label="Go to Home" />
            </div>
            <div className="intro-btn-container">
                {/* TODO: @CS, remove the para tag below, Learning Words */}
                <p>Learn New Words</p>
                <ChangePageButton to="/introduce" label="Introduce words" />
            </div>
            <div className="practice-btn-container">
                {/* TODO: @CS, remove the para tag below, Practice Quizzes */}
                <p>Practice Quiz</p>
                <ChangePageButton to="/pick-word" label="Word Translation" />
                <ChangePageButton to="/connect-words" label="Match Words" />
                <ChangePageButton to="/create-sen" label="Make A Sentence" />
                <ChangePageButton to="/fill-blank" label="Fill In The Blanks" />
                <ChangePageButton to="/TranslateSentence" label="Translate Sentence" />
            </div>
            <div>
                {/* TODO: @CS, remove the para tag below, ACTUAL Practice Quizzes */}
                <p>Actual Practice</p>
            </div>
        </div>
    );
}

export default Learn;