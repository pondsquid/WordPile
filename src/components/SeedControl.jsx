import React, { useState, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import {
  generateSeedFromDate,
  generateSeedRandom,
  isValidHexSeed,
} from '../utils/seedUtils';

const SeedControl = () => {
  const { setSeed, populateGrid, resetGrid, gridSize, seed } = useGameState();
  const [isEnteringSeed, setIsEnteringSeed] = useState(false);
  const [inputSeed, setInputSeed] = useState('');
  const inputRef = useRef(null);

  const handleRandomSeed = () => {
    const randomSeed = generateSeedRandom();
    setSeed(randomSeed);
    populateGrid(gridSize, randomSeed);
  };

  const handleDailySeed = () => {
    const todaySeed = generateSeedFromDate(new Date());
    setSeed(todaySeed);
    populateGrid(gridSize, todaySeed);
  };

  const handleConfirmSeed = () => {
    const input = inputSeed.trim();

    // Validate if input is a date
    const parsedDate = new Date(input);
    if (!isNaN(parsedDate.getTime())) {
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month
      const day = String(parsedDate.getDate()).padStart(2, '0'); // Ensure two-digit day
      const formattedDate = `${year}-${month}-${day}`;
      const seedFromDate = generateSeedFromDate(new Date(formattedDate));
      setSeed(seedFromDate);
      populateGrid(gridSize, seedFromDate);
      setInputSeed('');
      setIsEnteringSeed(false);
      return;
    }

    // Validate if input is a hex seed
    if (isValidHexSeed(input)) {
      console.log('Apparently a safe hex seed', input);
      setSeed(input);
      populateGrid(gridSize, input);
      setInputSeed('');
      setIsEnteringSeed(false);
      return;
    }

    // Ignore invalid input
    setInputSeed('');
    setIsEnteringSeed(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirmSeed();
    } else if (e.key === 'Escape') {
      setIsEnteringSeed(false);
    }
  };

  const handleEnterSeed = () => {
    setIsEnteringSeed(true);
    setTimeout(() => {
      inputRef.current?.focus(); // Autofocus restored
    }, 0);
  };

  return (
    <div className="seed-control mt-4 flex flex-col items-center">
      <div className="flex gap-2 mb-2">
        <button
          onClick={resetGrid}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
        >
          Reset
        </button>
        <button
          onClick={handleDailySeed}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
        >
          Daily
        </button>
        <button
          onClick={handleRandomSeed}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          Random
        </button>
        <button
          onClick={handleEnterSeed}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Enter Seed
        </button>
      </div>
      {isEnteringSeed ? (
        <div className="mt-2 flex gap-2">
          <input
            ref={inputRef} // Autofocus restored
            name="seed-input"
            type="text"
            value={inputSeed}
            onChange={(e) => setInputSeed(e.target.value)}
            onKeyDown={handleKeyDown}
            className="px-4 py-2 border rounded-md"
            placeholder="Enter hex seed or date"
          />
          <button
            onClick={handleConfirmSeed}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
          <button
            onClick={() => setIsEnteringSeed(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="text-sm mt-2">
          Current Seed: {typeof seed === 'string' ? seed : seed?.seed || 'None'}{' '}
          {seed?.date && `[Daily ${seed.date}]`}
        </p>
      )}
    </div>
  );
};

export default SeedControl;
