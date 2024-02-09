import ChangePageButton from "./ChangePageButton";
import React, {useState} from "react"
import { GetRandomInt } from "../utils";

const sentenceList = [
  {s:"Goddag, vad heter du?", e: "Good day, what is your name?" },
  {s:"Vet du var centralstationen ligger?", e: "Do you know where the central station is?" },
  {s:"Åh förlåt mig, jag äter inte kött.", e: "Oh I'm sorry, I don't eat meat." },
  {s:"Sista bussen går om tre minuter.", e: "The last bus leaves in three minutes." },
  {s:"Jag har bara 100 kronor kvar.", e: "I only have 100 kronor left." },
];

function SetSentences({pos}) {
  return (
    <p>{sentenceList[pos].s}</p>
  );
}

function NextButton ({pos, movePos}) {
  if (pos === sentenceList.length-1) {
    return (
    <ChangePageButton to="/" label="Finished! Go back to the home page"/>
    );
  }
  return (
    <button id="next" onClick={movePos}>Next sentence</button>
  );
}

function Sentence() {
  const [sentence, setSentence] = useState("");
  const [position, setPosition] = useState(0);

  const movePosition = () => {
    if (position < sentenceList.length -1) {
      setPosition(position+1);
    }
    setSentence("");
    document.getElementById("result").innerHTML = "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sentence === sentenceList[position].e) {
      document.getElementById("result").innerHTML = "Sentence correctly translated!";
    } else {
      document.getElementById("result").innerHTML = "Incorrect translation.";
    }
  }

  return(<>
    <ChangePageButton to="/" label="Go to Home" />
    <h2>Translate the swedish sentence into english.</h2>
    <div className="auth-form-container">
      <SetSentences pos={position}/>
      <NextButton pos = {position} movePos = {movePosition}/>
      <form className="login-form" onSubmit={handleSubmit}>
                <input value={sentence} onChange={(e) => setSentence(e.target.value)} type="name" placeholder="Type here" id="sentence" name="sentence"/>
                
                <button type="submit">Check spelling</button>
                <p id="result"></p>
      </form>
    </div>
  </>);
}

export default Sentence;
