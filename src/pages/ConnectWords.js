// ConnectWords.js
import React, { useState, useEffect } from 'react';
import ChangePageButton from "./ChangePageButton";
import './ConnectWords.css';

const wordPairs = [
  { id: 1, swedish: 'Hund', english: 'Dog' },
  { id: 2, swedish: 'Bok', english: 'Book' },
  { id: 3, swedish: 'Sol', english: 'Sun' },
  { id: 4, swedish: 'Dator', english: 'Computer' },
];

const ConnectWords = () => {
  const [selectedWord, setSelectedWord] = useState(null);
  const [result, setResult] = useState({tries: 0, correct: 0});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [matchedPairs, setMatchedPairs] = useState([]);

  // Used to handle the additional highlight states
  const [highlightState, setHighlightState] = useState('');

  const handleWordClick = (id, language) => {
    // if it is the first word clicked, highlight it 
    if (!selectedWord) {
      setSelectedWord({ id, language });

    } else if (selectedWord.language === language) {
      // second word clicked, but the same language
      setFeedbackMessage(`They are the same language. Try again but take a word from the ${language === 'swedish' ? 'English' : 'Swedish'} words.`);
      setTimeout(() => setFeedbackMessage(''), 2000);

    } else {
      // Check if the translation matches
      const isMatch = selectedWord.id === id;

      if (isMatch) {
        // it is a match
        setResult((prevResult) => ({ tries: prevResult.tries + 1, correct: prevResult.correct + 1 }));
        setMatchedPairs([...matchedPairs, id]);
        setHighlightState('Correct');
        setTimeout(() => {
          setSelectedWord(null);
          setHighlightState('');
        }, 2000);

      } else {
          // wrong answer
          setResult((prevResult) => ({ tries: prevResult.tries + 1, correct: prevResult.correct }));
          setFeedbackMessage('Wrong! Try again.');
          setTimeout(() => {
            setSelectedWord(null);
            setFeedbackMessage('');
          }, 2000);
      }
    }
  };

  useEffect(() => {
    if (result.correct === wordPairs.length) {
      setFeedbackMessage(`You got ${result.correct} out of ${result.tries} correct!`);
    }
  }, [result]);

  return (
    <div>
      <ChangePageButton to="/" label="Go to Home" />
      <div className='word-pairs-container'>
        {/* Display Swedish words on the left */}
        <div className='word-column'>
          {wordPairs.map((pair) => (
            <button 
              key={pair.id}
              className={selectedWord && selectedWord.id === pair.id && selectedWord.language === 'swedish' ? 'highlight' + highlightState : ''}
              onClick={() => handleWordClick(pair.id, 'swedish')}
            >
              {pair.swedish}
            </button>
          ))}
        </div>

        {/* Display English words on the right */}
        <div className='word-column'>
          {wordPairs.map((pair) => (
            <button 
              key={pair.id}
              className={selectedWord && selectedWord.id === pair.id && selectedWord.language === 'english' ? 'highlight' + highlightState : ''}
              onClick={() => handleWordClick(pair.id, 'english')}
            >
              {pair.english}
            </button>
          ))}
        </div>
        <div className='feedback-message'>{feedbackMessage}</div>
      </div>
    </div>
  );
};

export default ConnectWords;
