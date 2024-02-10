import ChangePageButton from "./ChangePageButton";
import React, {useState} from "react"
import { GetRandomInt } from "../utils";

const sentenceList = [
  {first:"Goddag, vad heter du?", second: "Good day, what is your name?" },
  {first:"Vet du var centralstationen ligger?", second: "Do you know where the central station is?" },
  {first:"Åh förlåt mig, jag äter inte kött.", second: "Oh I'm sorry, I don't eat meat." },
  {first:"Sista bussen går om tre minuter.", second: "The last bus leaves in three minutes." },
  {first:"Jag har bara 100 kronor kvar.", second: "I only have 100 kronor left." },
];

function SetSentences({pos}) {
  return (
    <p>{sentenceList[pos].first}</p>
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

function RandomizeLanguage () {
  for (let i = 0; i < sentenceList.length; i++) {
    var lan = GetRandomInt(0,1);
    if (lan === 1) {
    [sentenceList[i].first, sentenceList[i].second] = [sentenceList[i].second, sentenceList[i].first];
    }
  }
}

function Sentence() {
  const [sentence, setSentence] = useState("");
  const [position, setPosition] = useState(0);
  const [randomize, setRandomized] = useState(false);
  
  if (!randomize) {
    RandomizeLanguage();
    setRandomized(true);
  }

  const movePosition = () => {
    if (position < sentenceList.length -1) {
      setPosition(position+1);
    }
    setSentence("");
    document.getElementById("result").innerHTML = "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sentence === sentenceList[position].second) {
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
