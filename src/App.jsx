import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard';
import ScoreDisplay from './components/ScoreDisplay';
import { useGameState } from './hooks/useGameState';
import CustomDragLayer from './components/CustomDragLayer';
import SeedControl from './components/SeedControl';

function App() {
  const gridSize = 6; // Set your desired grid size here
  const { setDictionary, populateGrid } = useGameState();

  useEffect(() => {
    // Load the dictionary on mount
    const loadDictionary = async () => {
      try {
        const response = await fetch('/assets/enable.txt');
        const text = await response.text();
        const words = text.split('\n').map((word) => word.trim().toUpperCase());
        setDictionary(words);

        // Populate the grid once the dictionary is loaded
        populateGrid(gridSize);
      } catch (error) {
        console.error('Error loading dictionary:', error);
      }
    };

    loadDictionary();
  }, [setDictionary, populateGrid]);

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
