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
  const [selectedWords, setSelectedWords] = useState([]);
  const [result, setResult] = useState({tries: 0, correct: 0});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [matchedPairs, setMatchedPairs] = useState([]);

  // Used to handle the additional highlight states
  const [highlightState, setHighlightState] = useState('');

  const handleWordClick = (selectedId, selectedLanguage) => {
    // if it is the first word clicked, highlight it 
    if (selectedWords.length < 1) {
      setSelectedWords([{ id: selectedId, language: selectedLanguage }]);
    } else {
      handleSecondWordClick(selectedId, selectedLanguage);
    }
  };

  const handleSecondWordClick = (selectedId, selectedLanguage) => {
    setSelectedWords((prevSelectedWords) => [
      ...prevSelectedWords, { id: selectedId, language: selectedLanguage }]);
    
    if (selectedLanguage === selectedWords[0].language) {
      // second word clicked, but the same language
      // TODO might need to handle some user feedback here, another highlight
      setFeedbackMessage(`They are the same language. Try again but take a word from the ${selectedLanguage === 'swedish' ? 'English' : 'Swedish'} words.`);
      setTimeout(() => {
        setFeedbackMessage('');
        setSelectedWords((prevSelectedWords) => 
          prevSelectedWords.filter((tuple, index) => index !== 1));
      }, 2000);

    } else {
      // Check if the translation matches
      const isMatch = selectedWords[0].id === selectedId;

      if (isMatch) {
        // it is a match
        setResult((prevResult) => ({ tries: prevResult.tries + 1, correct: prevResult.correct + 1 }));
        setMatchedPairs([...matchedPairs, selectedId]);
        setHighlightState('Correct');
        setTimeout(() => {
          setSelectedWords([]);
          setHighlightState('Hidden');
        }, 2000);

      } else {
          // wrong answer
          setResult((prevResult) => ({ tries: prevResult.tries + 1, correct: prevResult.correct }));
          setFeedbackMessage('Wrong! Try again.');
          setHighlightState('Wrong');
          setTimeout(() => {
            setSelectedWords([]);
            setFeedbackMessage('');
            setHighlightState('');
          }, 2000);
      }
    }
  }

  useEffect(() => {
    if (result.correct === wordPairs.length) {
      setFeedbackMessage(`You got ${result.correct} out of ${result.tries} correct!`);
    }
  }, [result]);

  const getButtonClassName = (selectedWords, pair, highlightState, language) => {

    // Handle the two cases that can be when no word is selected
    // If the word is already matched, it should be hidden. Otherwise, it 
    // should have the default layout TODO might change here 
    if (!selectedWords) {
      if (matchedPairs.includes(pair.id)) {
        return 'highlightHidden';
      } else {
        return '';
      }
    }

    // Handle the cases where at least one word is selected
    const isFirstClick = selectedWords && selectedWords[0].id === pair.id && selectedWords[0].language === language;
    const isSecondClick = selectedWords.length > 1 && selectedWords[1].id === pair.id && selectedWords[1].language === language;
    const isMatch = selectedWords.length > 1 && selectedWords[0].id === selectedWords[1].id && selectedWords[0].language !== selectedWords[1].language;

    if(isFirstClick) {
      return 'highlight';
    } else if (isSecondClick) {
      if (isMatch) {
        return 'highlightCorrect';
      } else {
        return 'highlightWrong';
      }
    }

    return '';
  }

  return (
    <div>
      <ChangePageButton to="/" label="Go to Home" />
      <div className='word-pairs-container'>
        {/* Display Swedish words on the left */}
        <div className='word-column'>
          {wordPairs.map((pair) => (
            <button 
              key={pair.id}
              className={getButtonClassName}
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
              className={getButtonClassName}
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
