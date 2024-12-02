import React from 'react';
import { useGameState } from '../hooks/useGameState';

const WordOverlay = ({ wordList = [], onClose }) => {
  const { isShowingWordList, setShowingWordList, getLeastUsedLetter } =
    useGameState();

  if (!isShowingWordList) {
    return null;
  }

  const forceClose = () => {
    setShowingWordList(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={forceClose} // Dismiss on outside click
    >
      <div
        className="bg-white p-4 rounded shadow-md w-3/4 grid grid-cols-2 gap-4"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {wordList.length === 0 ? (
          <div className="text-xl font-bold bg-blue-200">No Words Found</div>
        ) : (
          wordList
            .sort((a, b) => b.score - a.score) // Sort by descending score
            .map((entry, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>
                  {entry.word.split('').map((char, i) => (
                    <span
                      key={i}
                      className={
                        char === getLeastUsedLetter()
                          ? 'text-red-500 font-bold'
                          : 'text-green-500 font-bold'
                      }
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span>{entry.score} pts</span>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default WordOverlay;
