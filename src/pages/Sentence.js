import ChangePageButton from "./ChangePageButton";
import React, {useState} from "react"
import { GetRandomInt } from "../utils";
import {completeList} from "../data-sets/compose-translate";

const sentenceList = completeList;

function SetSentences({pos}) {
  return (
    <p>{sentenceList[pos].swedish}</p>
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
    [sentenceList[i].swedish, sentenceList[i].english] = [sentenceList[i].english, sentenceList[i].swedish];
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
    if (sentence === sentenceList[position].english) {
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
