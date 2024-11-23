import React from 'react';
import { useGameState } from '../hooks/useGameState';

const ScoreDisplay = () => {
  const { score, turn, wordCount } = useGameState();

  return (
    <div className="flex items-center space-x-4">
      <div className="text-xl font-bold">Score: {score}</div>
      <div className="text-xl font-bold">Words: {wordCount}</div>
      <div className="text-xl font-bold">Turn: {turn}</div>
    </div>
  );
};

export default ScoreDisplay;
