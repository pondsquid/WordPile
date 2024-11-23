import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import LetterTile from './LetterTile';
import { useGameState } from '../hooks/useGameState';

const GameBoard = ({ gridSize = 6 }) => {
  const { letterGrid, moveLetter, populateGrid } = useGameState();

  useEffect(() => {
    populateGrid(gridSize); // Populate the grid on mount
  }, [gridSize, populateGrid]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="grid gap-2 p-4 bg-gray-200 rounded-md"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`, // Adjust columns dynamically
        }}
      >
        {letterGrid.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <GridSquare
              key={`${rowIndex}-${colIndex}`}
              position={[rowIndex, colIndex]}
              letter={letter}
            />
          ))
        )}
      </div>
      <button
        onClick={() => populateGrid(gridSize)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
      >
        Populate Grid
      </button>
    </div>
  );
};

const GridSquare = ({ position }) => {
  const { moveLetter, letterGrid } = useGameState(); // Access state and actions
  const [row, col] = position;

  const [, drop] = useDrop(
    () => ({
      accept: 'tile',
      drop: (item) => {
        moveLetter(item.position, position); // Handle both moves and swaps
      },
      canDrop: () => true, // Always allow drops
    }),
    [letterGrid]
  ); // Dependency ensures latest state

  return (
    <div
      ref={drop}
      className="w-16 h-16 border-2 border-gray-400 flex items-center justify-center bg-white"
    >
      {letterGrid[row][col] && (
        <LetterTile letter={letterGrid[row][col]} position={[row, col]} />
      )}
    </div>
  );
};

// const GridSquare = ({ position }) => {
//   const { moveLetter, letterGrid } = useGameState(); // Access state and actions
//   const [row, col] = position;

//   const [, drop] = useDrop(() => ({
//     accept: "tile",
//     drop: (item) => {
//       moveLetter(item.position, position); // Move logic
//     },
//     canDrop: () => {
//       const currentLetter = letterGrid[row]?.[col];
//       return currentLetter === null; // Check grid state dynamically
//     },
//   }), [letterGrid]); // Dependency ensures latest state

//   return (
//     <div
//       ref={drop}
//       className="w-16 h-16 border-2 border-gray-400 flex items-center justify-center bg-white"
//     >
//       {letterGrid[row][col] && <LetterTile letter={letterGrid[row][col]} position={[row, col]} />}
//     </div>
//   );
// };

export default GameBoard;
