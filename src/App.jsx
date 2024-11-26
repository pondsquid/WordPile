import React, { useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard';
import ScoreDisplay from './components/ScoreDisplay';
import SeedControl from './components/SeedControl';
import { useGameState } from './hooks/useGameState';
import CustomDragLayer from './components/CustomDragLayer';
import { generateSeedRandom } from './utils/seedUtils';

function App() {
  const gridSize = 6;
  const { setDictionary, populateGrid } = useGameState();
  const isInitialized = useRef(false);

  useEffect(() => {
    const loadDictionary = async () => {
      const response = await fetch('/assets/enable.txt');
      const text = await response.text();
      const words = text.split('\n').map((word) => word.trim().toUpperCase());
      setDictionary(words);

      if (!isInitialized.current) {
        const randomSeed = generateSeedRandom();
        populateGrid(gridSize, randomSeed);
        isInitialized.current = true;
      }
    };

    loadDictionary();
  }, [setDictionary, populateGrid, gridSize]);

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <h1 className="text-2xl font-bold my-4">Word Game</h1>
        <ScoreDisplay />
        <GameBoard gridSize={gridSize} />
        <SeedControl gridSize={gridSize} />
      </div>
    </DndProvider>
  );
}

export default App;
