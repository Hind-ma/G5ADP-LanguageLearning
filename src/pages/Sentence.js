import ChangePageButton from "./ChangePageButton";
import React, {useState} from "react"

const sentenceList = [
  {s:"Goddag, vad heter du?", e: "Good day, what is your name?" },
  {s:"Vet du var centralstationen ligger?", e: "Do you know where the central station is?" },
  {s:"Åh förlåt mig, jag äter inte kött.", e: "Oh I'm sorry, I don't eat meat." },
  {s:"Sista bussen går om tre minuter.", e: "The last bus leaves in three minutes" },
  {s:"Jag har bara 100 kronor kvar.", e: "I only have 100 kronor left." },
];

function SetSentences({pos}) {
  return (
    <div>
      <p>{sentenceList[pos].s}</p>
    </div>
  );
}

function Sentence() {
  const [sentence, setSentence] = useState("");
  const [position, setPosition] = useState(0);

  const movePosition = () => {
    console.log(position);
    if (position < sentenceList.length -1) {
      setPosition(position+1);
    } else {
      setPosition(0);
    }
    setSentence("");
    document.getElementById("result").innerHTML = "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var correctSentence = sentenceList[position].e;
    if (sentence === correctSentence) {
      document.getElementById("result").innerHTML = "Sentence correctly translated!";
    } else {
      document.getElementById("result").innerHTML = "Incorrect translation.";
    }
  }

  return(<>
    <ChangePageButton to="/" label="Go to Home" />
    <h2>Translate the swedish sentence into english.</h2>
    <div className="auth-form-container">
      <SetSentences pos = {position}/>
      <button onClick={movePosition}>Next sentence</button>
      <form className="login-form" onSubmit={handleSubmit}>
                <input value={sentence} onChange={(e) => setSentence(e.target.value)} type="name" placeholder="Type here" id="sentence" name="sentence"/>
                
                <button type="submit">Check spelling</button>
                <p id="result"></p>
      </form>
    </div>
  </>);
}

export default Sentence;
