import { useNavigate } from 'react-router-dom';
import "./Scoring.css";

function Scoring() {
    var score = localStorage.getItem("quizScore");
    //console.log("localStorage score: " + score.toString());
    const maxScore = localStorage.getItem("maxScore");
    var perc = (score / parseFloat(maxScore)) * 100.0;
    perc = perc.toPrecision(2);
    //console.log(perc);
    
    var result = "Congratulations, you scored " + perc + "%";

    const navigate = useNavigate();

    const handleNextButtonClicked = () => {
        navigate("/learn");
    }

    return (
        <div>
            <p>Practice Score</p>
            <p>{result}</p>
            <div>
                <button
                    className="next-button"
                    onClick={handleNextButtonClicked}>
                     Next
                </button>
            </div>
        </div>
    );

}

export default Scoring;