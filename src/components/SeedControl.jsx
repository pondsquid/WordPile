import React, { useState } from 'react';
import { useGameState } from '../hooks/useGameState';

const SeedControl = ({ gridSize }) => {
  const { seed, populateGrid, setSeed } = useGameState();

  // Generate a seed based on the current date (e.g., "2024-11-24")
  const generateDailySeed = () => {
    const today = new Date().toISOString().slice(0, 10);
    return today;
  };

  // Handle board reset using the current seed
  const handleReset = () => {
    populateGrid(gridSize, seed); // Reuse the current seed to regenerate the board
  };

  // Handle Daily/Enter Seed logic
  const handleDailyOrEnterSeed = () => {
    const userSeed = prompt('Enter a seed value (leave blank for random):', '');

    if (userSeed === null) {
      // User canceled the prompt, do nothing
      return;
    }

    const newSeed = userSeed.trim() || Math.random().toString(36).substr(2, 9); // Generate random seed if blank
    setSeed(newSeed);
    populateGrid(gridSize, newSeed);
  };

  // Handle the Daily seed generation
  const handleDaily = () => {
    const dailySeed = generateDailySeed();
    setSeed(dailySeed);
    populateGrid(gridSize, dailySeed);
  };

  return (
    <div className="seed-control flex flex-col items-center gap-2">
      <p className="text-sm">Current Seed: {seed || 'None'}</p>
      <div className="flex gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Reset
        </button>
        <button
          onClick={handleDaily}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Daily
        </button>
        <button
          onClick={handleDailyOrEnterSeed}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700"
        >
          Enter Seed
        </button>
      </div>
    </div>
  );
};

export default SeedControl;
