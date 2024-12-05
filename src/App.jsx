import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard';
import ScoreDisplay from './components/ScoreDisplay';
import SeedControl from './components/SeedControl';
import { useGameState } from './hooks/useGameState';
import CustomDragLayer from './components/CustomDragLayer';
import { generateSeedRandom } from './utils/seedUtils';
import WordOverlay from './components/WordOverlay';
import LeaderboardOverlay from './components/LeaderboardOverlay';

const App = () => {
  const {
    isInitialized,
    setInitialized,
    populateGrid,
    setDictionary,
    gridSize,
    wordList,
    scores,
  } = useGameState();

  // need to get this back through!  const gridSize = 6;

  useEffect(() => {
    let isCancelled = false; // Guard for cleanup

    const loadDictionary = async () => {
      if (isInitialized) return; // Prevent multiple triggers

      const response = await fetch('/assets/enable.txt');
      const text = await response.text();
      const words = text.split('\n').map((word) => word.trim().toUpperCase());
      setDictionary(words);

      if (!isCancelled) {
        const randomSeed = generateSeedRandom();
        populateGrid(gridSize, randomSeed);
        setInitialized(true);
      }
    };

    loadDictionary();

    return () => {
      isCancelled = true; // Prevents state updates if unmounted
    };
  }, [isInitialized, setDictionary, populateGrid, gridSize, setInitialized]);

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      {isInitialized ? (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
          <h1 className="text-2xl font-bold my-4">Word Game</h1>
          <ScoreDisplay />
          <GameBoard gridSize={gridSize} />
          <SeedControl gridSize={gridSize} />
          {/* Overlays */}
          <WordOverlay wordList={wordList} />
          <LeaderboardOverlay scores={scores} />
        </div>
      ) : (
        <h3 className="text-2xl font-bold my-4">...Loading...</h3>
      )}
    </DndProvider>
  );
};

export default App;
