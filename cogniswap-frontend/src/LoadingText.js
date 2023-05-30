import React, { useEffect, useState } from 'react';
import './LoadingText.css';

const LETTERS = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'];
const LoadingText = () => {
    const [letterIndex, setLetterIndex] = useState(0);

    useEffect(() => {
      
      const timer = setInterval(() => {
        setLetterIndex(index => index+1)
      }, 100);
  
      return () => {
        clearInterval(timer);
      };
    }, []);

    return (
      <div className="loading-text">
        {LETTERS.slice(0, letterIndex).map((letter, index) => (
          <span key={index} className="loading-letter">{letter}</span>
        ))}
      </div>
    );
  };
  
export default LoadingText;
