import React from 'react';

const WordOverlay = ({ words, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // Close on background click
    >
      <div
        className="bg-white p-6 rounded-md shadow-lg max-h-[80%] overflow-auto"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        <h2 className="text-lg font-bold mb-4">Scoring Words</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {words.map(({ word, score }, index) => (
            <div key={index}>
              <span className="font-bold">{word}:</span> {score} points
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WordOverlay;
