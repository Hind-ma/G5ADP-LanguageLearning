// ConnectWords.js
import React, { useState, useEffect } from 'react';
import ChangePageButton from "./ChangePageButton";
import './ConnectWords.css';

const ConnectWords = () => {
  const [wordPairs, setWordPairs] = useState([
    { id: 1, swedish: 'Hund', english: 'Dog' , stateSwe: '', stateEng: '' },
    { id: 2, swedish: 'Bok', english: 'Book', stateSwe: '', stateEng: '' },
    { id: 3, swedish: 'Sol', english: 'Sun', stateSwe: '', stateEng: '' },
    { id: 4, swedish: 'Dator', english: 'Computer', stateSwe: '', stateEng: '' },
  ]);

  const [selectedWords, setSelectedWords] = useState([]);
  const [result, setResult] = useState({tries: 0, correct: 0});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [matchedPairs, setMatchedPairs] = useState([]);

  const updateButtonState = (id, language, state) => {
    setWordPairs((prevWordPairs) =>
      prevWordPairs.map((pair) =>
        pair.id === id
          ? {
              ...pair,
              [language === 'swedish' ? 'stateSwe' : 'stateEng']: state,
            }
          : pair
      )
    );
  };

  const handleWordClick = (selectedId, selectedLanguage) => {
    // if it is the first word clicked, highlight it 
    if (selectedWords.length === 0) {
      setSelectedWords([{ id: selectedId, language: selectedLanguage }]);
      updateButtonState(selectedId, selectedLanguage, 'clicked')
    } else if (selectedWords.length === 1) {
      handleSecondWordClick(selectedId, selectedLanguage);
    } 
    //TODO maybe handle else 
  };

  const handleSecondWordClick = (selectedId, selectedLanguage) => {
    setSelectedWords((prevSelectedWords) => [
      ...prevSelectedWords, { id: selectedId, language: selectedLanguage }]);
    
    updateButtonState(selectedId, selectedLanguage, 'clicked');
    
    if (selectedLanguage === selectedWords[0].language) {
      // second word clicked, but the same language
      // TODO might need to handle some user feedback here, another highlight
      setFeedbackMessage(`They are the same language. Try again but take a word from the ${selectedLanguage === 'swedish' ? 'English' : 'Swedish'} words.`);
      updateButtonState(selectedId, selectedLanguage, 'wrong');
      setTimeout(() => {
        setFeedbackMessage('');
        setSelectedWords((prevSelectedWords) => 
          prevSelectedWords.filter((tuple, index) => index !== 1));
        updateButtonState(selectedId, selectedLanguage, '');
      }, 2000);

    } else {
      // Check if the translation matches
      const isMatch = selectedWords[0].id === selectedId;

      if (isMatch) {
        // it is a match
        setResult((prevResult) => ({ tries: prevResult.tries + 1, correct: prevResult.correct + 1 }));
        setMatchedPairs([...matchedPairs, selectedId]);
        updateButtonState(selectedWords[0].id, selectedWords[0].language, 'correct');
        updateButtonState(selectedWords[1].id, selectedWords[1].language, 'correct');
        setTimeout(() => {
          updateButtonState(selectedWords[0].id, selectedWords[0].language, 'hidden');
          updateButtonState(selectedWords[1].id, selectedWords[1].language, 'hidden');
          setSelectedWords([]);
        }, 2000);

      } else {
          // wrong answer
          setResult((prevResult) => ({ tries: prevResult.tries + 1, correct: prevResult.correct }));
          setFeedbackMessage('Wrong! Try again.');
          updateButtonState(selectedWords[0].id, selectedWords[0].language, 'wrong');
          updateButtonState(selectedWords[1].id, selectedWords[1].language, 'wrong');          
          setTimeout(() => {
            setFeedbackMessage('');
            updateButtonState(selectedWords[0].id, selectedWords[0].language, '');
            updateButtonState(selectedWords[0].id, selectedWords[0].language, '');
            setSelectedWords([]);
          }, 2000);
      }
    }
  }

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
              className={pair.stateSwe}
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
              className={pair.stateEng}
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
