import React, { useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard';
import ScoreDisplay from './components/ScoreDisplay';
import SeedControl from './components/SeedControl';
import { useGameState } from './hooks/useGameState';
import CustomDragLayer from './components/CustomDragLayer';
import { generateSeedRandom } from './utils/seedUtils';
import WordOverlay from './components/WordOverlay';

const App = () => {
  const {
    isInitialized,
    setInitialized,
    populateGrid,
    setDictionary,
    gridSize,
    wordList,
  } = useGameState();

  // need to get this back through!  const gridSize = 6;

  useEffect(() => {
    console.log('In App useEffect iI', isInitialized);
    if (!isInitialized) {
      const loadDictionary = async () => {
        const response = await fetch('/assets/enable.txt');
        const text = await response.text();
        const words = text.split('\n').map((word) => word.trim().toUpperCase());
        setDictionary(words);

        if (!isInitialized.current) {
          const randomSeed = generateSeedRandom();
          populateGrid(gridSize, randomSeed);
          setInitialized(true);
        }
      };

      loadDictionary();
    }
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
          <WordOverlay wordList={wordList} />
        </div>
      ) : (
        <h3 className="text-2xl font-bold my-4">...Loading...</h3>
      )}
    </DndProvider>
  );
};

export default App;
