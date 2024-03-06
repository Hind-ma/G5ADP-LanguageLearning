import ChangePageButton from "./ChangePageButton";
import Header from "./Header";
import "./Learn.css";
import { useNavigate } from 'react-router-dom';

const quizList = [
    {id: 0, route: "/pick-word"},
    {id: 1, route: "/pick-word"},
    {id: 2, route: "/pick-word"},

    {id: 3, route: "/connect-words"},
    {id: 4, route: "/create-sen"},
    {id: 5, route: "/TranslateSentence"},

    {id: 6, route: "/create-sen"},
    {id: 7, route: "/create-sen"},

    {id: 8, route: "/fill-blank"},
    {id: 9, route: "/fill-blank"},

    {id: 10, route: "/TranslateSentence"},
    {id: 11, route: "/TranslateSentence"}

    /*{id: 0, route: "/connect-words"},
    {id: 1, route: "/connect-words"},
    {id: 2, route: "/connect-words"},*/
];

export const RandomQuizOrder = quizList.sort(() => Math.random() - 0.5).slice(0, quizList.length);

function Learn() {
    //console.log("Quiz Type");
    //RandomQuizOrder.map(x => console.log(x));

    const navigate = useNavigate();
    function startQuiz() {
        navigate(RandomQuizOrder[0].route, {state: { fullQuiz: RandomQuizOrder}});
    }

    localStorage.setItem("quizScore", 0);
    var quizLength = quizList.length;
    localStorage.setItem("maxScore", quizLength);
    var score = localStorage.getItem("quizScore");
    console.log("localStorage score: " + score.toString());
    const maxScore = localStorage.getItem("maxScore");
    var perc = (score / maxScore) * 100.0;
    console.log("percentage: " + perc + "%");
  
    return (
        <div>
            <Header />
            <div>
                <p>Learn Page</p>
                <ChangePageButton to="/home" label="Go to Home" />
            </div>
            <div className="intro-btn-container">
                <p>Learn New Words</p>
                <ChangePageButton to="/introduce" label="Introduce words" />
            </div>
            <div className="practice-btn-container">
                <p>Practice</p>
                <button onClick={() => startQuiz()}>Do Quiz</button>
            </div>
        </div>
    );
}

export default Learn;
