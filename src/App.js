import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import ConnectWords from "./pages/ConnectWords";
import FillBlank from "./pages/FillBlank";
import Home from "./pages/Home";
import IntroduceWord from "./pages/IntroduceWord";
import PickWord from "./pages/PickWord";
import TranlateSentence from "./pages/TranslateSentence";
import Welcome from "./pages/Welcome";
import CreateSentence from "./pages/CreateSentence";
import React from 'react';

function App() {
  
  return (
    <div className="App">
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/pick-word" element={<PickWord />} />
        <Route path="/introduce" element={<IntroduceWord />} />
        <Route path="/fill-blank" element={<FillBlank />} />
        <Route path="/TranslateSentence" element={<TranlateSentence />} />
        <Route path="/create-sen" element={<CreateSentence />} />
        <Route path="/connect-words" element={<ConnectWords />} />
      </Routes>
    </div>
  );
}

export default App;
