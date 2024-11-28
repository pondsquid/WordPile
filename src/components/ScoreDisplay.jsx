import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';

const ScoreDisplay = () => {
  const { score, turn, wordCount } = useGameState();
  const [isDetailed, setIsDetailed] = useState(false); // Toggle state

  const handleToggle = () => {
    setIsDetailed(!isDetailed);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex flex-col items-center p-4 rounded-md hover:bg-gray-300 focus:outline-none"
    >
      {isDetailed ? (
        <div className="text-centern bg-red-200">
          <div className="text-xl font-bold">Turn: {turn}</div>
          <div className="text-xl font-bold">Words: {wordCount}</div>
          <div className="text-xl font-bold">Score: {score}</div>
        </div>
      ) : (
        <div className="text-xl font-bold bg-blue-200">
          Turn: {turn} | Words: {wordCount} | Score: {score}
        </div>
      )}
    </button>
  );
};

export default ScoreDisplay;
