import ChangePageButton from "./ChangePageButton";
import React, { useState } from 'react';

const Line = ({ start, end }) => {
  const distance = Math.sqrt(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2));
  const angle = (Math.atan2(end[1] - start[1], end[0] - start[0]) * 180) / Math.PI;
  const position = {
    top: `${start[1]}px`,
    left: `${start[0]}px`,
    width: `${distance}px`,
    transform: `rotate(${angle}deg)`,
  };

  return <div className="line" style={position}></div>;
};

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

  const [selectedSwedishIndex, setSelectedSwedishIndex] = useState(null);
  const [lineStart, setLineStart] = useState(null);

  // This is a function which handles connecting words
  const connectWords = (englishIndex) => {
    if (selectedSwedishIndex !== null && connections[selectedSwedishIndex] === null) {
      setConnections((prevConnections) => {
        const newConnections = [...prevConnections];
        newConnections[selectedSwedishIndex] = englishIndex;
        return newConnections;
      });
      setSelectedSwedishIndex(null);
      setLineStart(null);
    }
  };

  const getRightOfElement = (id) => {
    const element = document.getElementById(id);

    if(element) {
      const rect = element.getBoundingClientRect();
      return [rect.right, (rect.top + rect.bottom)/2];
    }

    return null; // return null if the element is not found 
  };

  const getLeftOfElement = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const rect = element.getBoundingClientRect();
      return [rect.left, (rect.top + rect.bottom)/2];
    }

    return null; // return null if element is not found 
  };

  const selectSwedishWord = (swedishIndex) => {
    setSelectedSwedishIndex(swedishIndex);
    const swedishElementId = `swedish-word-${swedishIndex}`;
    const englishElementId = `english-word-${connections[swedishIndex]}`;

    // Check if both elements are found before setting the line start position
    if (document.getElementById(swedishElementId) && document.getElementById(englishElementId)) {
      setLineStart(getLeftOfElement(swedishElementId));
    }  
};

  // This function evaluates as well as shows the results
  const showResults = () => {
    const correctConnections = connections.filter((connection, index) => connection === index).length;
    alert('You got ${correctConnections} out of ${swedishWords.length} correct! Good job!');
  };

  return (
    <div>
      <ChangePageButton to="/" label="Go to Home" />

      <div className="connect-words-container">
        <h2>Connect the Words</h2>
        <div className="word-container">
          <div className="swedish-words">
            {swedishWords.map((word, index) => (
              <div
                key={index}
                id={'swedish-word-${index}'}
                className={`word ${selectedSwedishIndex === index ? 'selected' : ''}`}
                onClick={() => selectSwedishWord(index)}
              >
                {word}
              </div>
            ))}
          </div>
          <div className="english-words">
            {englishWords.map((word, index) => (
              <div
                key={index}
                className={`word ${connections.indexOf(index) !== -1 ? 'connected' : ''}`}
                onClick={() => connectWords(index)}
              >
                {word}
              </div>
            ))}
          </div>
          {selectedSwedishIndex !== null && lineStart !== null && (
            <Line start={lineStart} end={getLeftOfElement(`english-word-${connections[selectedSwedishIndex]}`)} />
          )}
        </div>
        <button onClick={showResults}>Check Results</button>
      </div>  
    </div>
  );
};

export default ConnectWords;
