import React from 'react';
import { useGameState } from '../hooks/useGameState';

const LeaderboardOverlay = ({ scores = [] }) => {
  const { isShowingLeaderboard, setShowingLeaderboard } = useGameState();

  if (!isShowingLeaderboard) {
    return null;
  }

  const forceClose = () => {
    setShowingLeaderboard(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={forceClose} // Close when clicking outside the content
    >
      <div
        className="bg-white p-4 rounded shadow-md w-3/4 grid gap-4"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        {scores.length === 0 ? (
          <div className="text-xl">No scores available</div>
        ) : (
          scores.map((entry, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>
                {index + 1}. {entry.username}
              </span>
              <span>{entry.score} pts</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaderboardOverlay;
