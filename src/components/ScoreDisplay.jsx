//import React, { useState } from 'react';
import React from 'react';
import { useGameState } from '../hooks/useGameState';

const ScoreDisplay = () => {
  const { score, turn, wordCount, isShowingWordList, setShowingWordList } =
    useGameState();
  //  const [isDetailed, setIsDetailed] = useState(false); // Toggle state

  const handleToggle = () => {
    console.log('isShowing is ', isShowingWordList);
    setShowingWordList(!isShowingWordList);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex flex-col items-center p-4 rounded-md hover:bg-gray-300 focus:outline-none"
    >
      <div className="text-xl font-bold bg-blue-200">
        Turn: {turn} | Words: {wordCount} | Score: {score}
      </div>
    </button>
  );
};

export default ScoreDisplay;
