import ChangePageButton from "./ChangePageButton";
import Header from "./Header";
import "./Learn.css";

function Learn() {
  return (
    <div>
      <Header />
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
        <ChangePageButton to="/fill-blank" label="Fill In The Blanks" />
        <ChangePageButton to="/TranslateSentence" label="Translate Sentence" />
        <ChangePageButton to="/create-sen" label="Make A Sentence" />
        <ChangePageButton to="/connect-words" label="Match Words" />
      </div>
    </div>
  );
}

export default Learn;
