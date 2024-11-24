import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';

const SeedControl = ({ gridSize }) => {
  const { seed, populateGrid, setSeed } = useGameState();
  const [showWords, setShowWords] = useState(false);

  const handleRegenerate = () => {
    const newSeed = Math.random().toString(36).substr(2, 9);
    setSeed(newSeed);
    populateGrid(gridSize, newSeed);
  };

  return (
    <div className="seed-control flex flex-col items-center gap-2">
      <p className="text-sm">Current Seed: {seed || 'None'}</p>
      <div className="flex gap-2">
        <button
          onClick={() => populateGrid(gridSize, seed)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Regenerate from Seed
        </button>
        <button
          onClick={handleRegenerate}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Generate New Seed
        </button>
      </div>
      <button
        onClick={() => setShowWords((prev) => !prev)}
        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700"
      >
        {showWords ? 'Hide Words' : 'Show Words'}
      </button>
      {showWords && <WordList />}
    </div>
  );
};

// Placeholder for WordList
const WordList = () => {
  return (
    <ul>
      <li>Example Word</li>
    </ul>
  );
};

export default SeedControl;
