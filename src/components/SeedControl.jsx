import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import {
  generateRandomSeed,
  generateSeedFromDate,
  isValidHexSeed,
} from '../utils/seedUtils';

const SeedControl = ({ gridSize }) => {
  const { seed, date, populateGrid, setSeed } = useGameState();
  const [isEnteringSeed, setIsEnteringSeed] = useState(false);
  const [inputSeed, setInputSeed] = useState('');
  const inputRef = useRef(null);

  const handleReset = () => {
    populateGrid(gridSize, seed);
  };

  const handleDaily = () => {
    const { seed: dailySeed, date: dailyDate } = generateSeedFromDate(
      new Date()
    );
    setSeed(dailySeed, dailyDate);
    populateGrid(gridSize, dailySeed);
  };

  const handleRandom = () => {
    const randomSeed = generateRandomSeed();
    setSeed(randomSeed);
    populateGrid(gridSize, randomSeed);
  };

  const handleConfirmSeed = () => {
    const newSeed = inputSeed.trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(newSeed)) {
      // Handle date-formatted seeds
      const { seed: customSeed, date: customDate } =
        generateSeedFromDate(newSeed);
      setSeed(customSeed, customDate);
      populateGrid(gridSize, customSeed);
    } else if (isValidHexSeed(newSeed)) {
      // Handle valid hex seed
      setSeed(newSeed);
      populateGrid(gridSize, newSeed);
    }

    // Invalid seeds are silently ignored (no popup or error handling)
    setIsEnteringSeed(false);
    setInputSeed(''); // Clear the input
  };

  const handleCancel = () => {
    setIsEnteringSeed(false);
    setInputSeed('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirmSeed();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

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
      {!isEnteringSeed ? (
        <p className="text-sm mt-1">
          Current Seed: {seed || 'None'}
          {date && ` (Daily: ${date})`}
        </p>
      ) : (
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter seed (hex or YYYY-MM-DD)"
            value={inputSeed}
            onChange={(e) => setInputSeed(e.target.value)}
            onKeyDown={handleKeyDown}
            className="px-4 py-2 border rounded-md"
            autoComplete="off"
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
