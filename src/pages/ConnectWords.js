import ChangePageButton from "./ChangePageButton";
import React, { useState } from 'react';

const ConnectWords = () => {
  // Initial state with words for Swedish and English
  const [swedishWords, setSwedishWords] = useState([
    'skola',
    'bok',
    'dator',
    'lärare',
  ]);

  const [englishWords, setEnglishWords] = useState([
    'school',
    'book',
    'computer',
    'teacher',
  ]);

  // State used to track user connections
  const [connections, setConnections] = useState(Array(swedishWords.length).fill(null));

  // This is a function which handles connecting words
  const connectWords = (swedishIndex, englishIndex) => {
    setConnections((prevConnections) => {
      const newConnections = [...prevConnections];
      newConnections[swedishIndex] = englishIndex;
      return newConnections;
    });
  };

  // This function evaluates as well as shows the results
  const showResults = () => {
    const correctConnections = connections.filter((connection, index) => connection === index).length;
    alert('You got ${correctConnections} out of ${swedishWords.length} correct! Good job!');
  };

  return (
    <div>
      <h2>Connect the Words</h2>
      <ChangePageButton to="/" label="Go to Home" />
      <div className="word-container">
        <div className="swedish-words">
          {swedishWords.map((word, index) => (
            <div key={index}>{word}</div>
          ))}
        </div>
        <div className="english-words">
          {englishWords.map((word, index) => (
            <div key={index} onClick={() => connectWords(index, connections.indexOf(null))}>
              {word}
            </div>
          ))}
        </div>
      </div>
      <button onClick={showResults}>Check Results</button>
    </div>
  );
};

export default ConnectWords;
