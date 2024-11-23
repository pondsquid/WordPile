import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GameBoard from "./components/GameBoard";
import ScoreDisplay from "./components/ScoreDisplay";
import { useGameState } from "./hooks/useGameState";
import CustomDragLayer from "./components/CustomDragLayer"; // New drag layer

function App() {
  const gridSize = 6; // Set your desired grid size here
  const { setDictionary } = useGameState();

  // useEffect(() => {
  //   // Load the dictionary file
  //   fetch("/assets/enable.txt")
  //     .then((res) => res.text())
  //     .then((data) => {
  //       const words = data.split("\n").map((word) => word.trim().toUpperCase());
  //       setDictionary(words);
  //     })
  //     .catch((err) => console.error("Failed to load dictionary:", err));
  // }, [setDictionary]);

  useEffect(() => {
    // Load the dictionary on mount
    const loadDictionary = async () => {
      const response = await fetch("/assets/enable.txt");
      const text = await response.text();
      const words = text.split("\n").map((word) => word.trim().toUpperCase());
      setDictionary(words);
    };

    loadDictionary();
  }, [setDictionary]);

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer /> {/* Replaces DragOverlay */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <h1 className="text-2xl font-bold my-4">Word Game</h1>
        <ScoreDisplay />
        <GameBoard gridSize={gridSize} />
        <button
          onClick={() => useGameState.getState().calculateScore()}
          className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-700"
        >
          Calculate Score
        </button>
      </div>
    </DndProvider>
  );
}

export default App;
