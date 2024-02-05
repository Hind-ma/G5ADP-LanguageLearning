import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import ConnectWords from "./pages/ConnectWords";
import FillBlank from "./pages/FillBlank";
import Home from "./pages/Home";
import IntroduceWord from "./pages/IntroduceWord";
import PickWord from "./pages/PickWord";
import Sentence from "./pages/Sentence";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/pick-word" element={<PickWord />} />
        <Route path="/introduce" element={<IntroduceWord />} />
        <Route path="/fill-blank" element={<FillBlank />} />
        <Route path="/sentence" element={<Sentence />} />
        <Route path="/connect-words" element={<ConnectWords />} />
      </Routes>
    </div>
  );
}

export default App;
