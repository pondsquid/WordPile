import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard';
import ScoreDisplay from './components/ScoreDisplay';
import SeedControl from './components/SeedControl'; // Updated Seed Control
import { useGameState } from './hooks/useGameState';
import CustomDragLayer from './components/CustomDragLayer'; // Drag Layer

function App() {
  const gridSize = 7; // Set your desired grid size here
  const { setDictionary, populateGrid } = useGameState(); // Add populateGrid here

  useEffect(() => {
    // Load the dictionary on mount
    const loadDictionary = async () => {
      const response = await fetch('/assets/enable.txt');
      const text = await response.text();
      const words = text.split('\n').map((word) => word.trim().toUpperCase());
      setDictionary(words);

      // Initialize the board once the dictionary is set
      const randomSeed = Math.random().toString(36).substr(2, 9); // Generate a random seed
      populateGrid(gridSize, randomSeed);
    };

    loadDictionary();
  }, [setDictionary, populateGrid]);

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer /> {/* Replaces DragOverlay */}
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
