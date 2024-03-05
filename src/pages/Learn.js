import ChangePageButton from "./ChangePageButton";
import "./Learn.css";

function Learn() {
    return (
        <div>
            <div>
                <h3 className="fontHeader">Learn Page</h3>
                <ChangePageButton to="/home" label="Go to Home" />
            </div>
            <div className="intro-btn-container">
                {/* TODO: @CS, remove the para tag below, Learning Words */}
                <h3 className="fontPara">Learn New Words</h3>
                <ChangePageButton to="/introduce" label="Introduce words" />
            </div>
            <div className="practice-btn-container">
                {/* TODO: @CS, remove the para tag below, Practice Quizzes */}
                <h3 className="fontPara" >Practice Quiz</h3>
                <ChangePageButton to="/pick-word" label="Word Translation" />
                <ChangePageButton to="/fill-blank" label="Fill In The Blanks" />
                <ChangePageButton to="/TranslateSentence" label="Translate Sentence" />
                <ChangePageButton to="/create-sen" label="Make A Sentence" />
                <ChangePageButton to="/connect-words" label="Match Words" />
            </div>
        </div>
    );
}

export default Learn;