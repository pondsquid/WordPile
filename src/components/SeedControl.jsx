import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';

const SeedControl = ({ gridSize }) => {
  const { seed, date, populateGrid, setSeed } = useGameState(); // Fetch date from game state
  const [isEnteringSeed, setIsEnteringSeed] = useState(false); // Toggle input mode
  const [inputSeed, setInputSeed] = useState(''); // Store the seed being entered
  const inputRef = useRef(null); // For auto-focusing the input field

  // Generate a daily seed
  const generateDailySeed = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    const isoDate = date.toISOString().slice(0, 10); // e.g., "2024-11-24"
    const hashSeed = Array.from(isoDate)
      .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 0)
      .toString(16);
    return { seed: hashSeed, date: isoDate };
  };

  // Reset the board using the current seed
  const handleReset = () => {
    populateGrid(gridSize, seed);
  };

  // Generate the daily board
  const handleDaily = () => {
    const { seed: dailySeed, date: dailyDate } = generateDailySeed();
    setSeed(dailySeed, dailyDate); // Store both seed and date
    populateGrid(gridSize, dailySeed); // Use the seed for the grid
  };

  // Generate a new random seed and reset the board
  const handleRandom = () => {
    const randomSeed = Math.random().toString(36).substr(2, 9);
    setSeed(randomSeed); // Store seed without a date
    populateGrid(gridSize, randomSeed);
  };

  // Confirm a custom seed
  const handleConfirmSeed = () => {
    const newSeed = inputSeed.trim();

    // Check if the input is a date in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(newSeed)) {
      const { seed: customSeed, date: customDate } = generateDailySeed(newSeed);
      setSeed(customSeed, customDate); // Store both seed and date
      populateGrid(gridSize, customSeed); // Use the computed seed
    } else {
      const finalSeed = newSeed || Math.random().toString(36).substr(2, 9);
      setSeed(finalSeed); // Store seed without a date
      populateGrid(gridSize, finalSeed);
    }

    setIsEnteringSeed(false); // Exit input mode
    setInputSeed(''); // Clear the input
  };

  // Cancel seed entry
  const handleCancel = () => {
    setIsEnteringSeed(false); // Exit input mode
    setInputSeed(''); // Clear the input
  };

  // Handle keyboard shortcuts (Enter, Esc)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirmSeed(); // Trigger confirm logic
    } else if (e.key === 'Escape') {
      handleCancel(); // Trigger cancel logic
    }
  };

  // Auto-focus the input box when entering seed mode
  useEffect(() => {
    if (isEnteringSeed && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEnteringSeed]);

  return (
    <div className="seed-control flex flex-col items-center gap-2">
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
          onClick={handleRandom}
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700"
        >
          Random
        </button>
        <button
          onClick={() => setIsEnteringSeed(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700"
        >
          Enter Seed
        </button>
      </div>

      {/* Toggle between Current Seed display and Enter Seed input */}
      {!isEnteringSeed ? (
        <p className="text-sm mt-1">
          Current Seed: {seed || 'None'}
          {date && ` (Daily: ${date})`} {/* Append date if it's linked */}
        </p>
      ) : (
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            ref={inputRef} // Attach ref for auto-focus
            placeholder="Enter seed"
            value={inputSeed}
            onChange={(e) => setInputSeed(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter and Esc
            className="px-4 py-2 border rounded-md"
            autoComplete="off"
            writingsuggestions="false"
          />
          <button
            onClick={handleConfirmSeed}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default SeedControl;
