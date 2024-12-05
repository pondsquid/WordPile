import React from 'react';
import { useGameState } from '../hooks/useGameState';

const ScoreDisplay = () => {
  const {
    score,
    turn,
    wordCount,
    isShowingWordList,
    setShowingWordList,
    isShowingLeaderboard,
    setShowingLeaderboard,
  } = useGameState();

  // Toggle for the Word Overlay
  const handleWordToggle = () => {
    console.log('Toggling Word List, current state:', isShowingWordList);
    setShowingWordList(!isShowingWordList);
  };

  // Toggle for the Leaderboard
  const handleLeaderboardToggle = () => {
    console.log('Toggling Leaderboard, current state:', isShowingLeaderboard);
    setShowingLeaderboard(!isShowingLeaderboard);
  };

  return (
    <div className="flex space-x-4 items-center p-4 rounded-md">
      {/* Turn & Words Button */}
      <button
        onClick={handleWordToggle}
        className="text-xl font-bold bg-blue-200 p-2 rounded hover:bg-blue-300 focus:outline-none"
      >
        Turn: {turn} | Words: {wordCount}
      </button>

      {/* Score Button */}
      <button
        onClick={handleLeaderboardToggle}
        className="text-xl font-bold bg-green-200 p-2 rounded hover:bg-green-300 focus:outline-none"
      >
        Score: {score}
      </button>
    </div>
  );
};

export default ScoreDisplay;
