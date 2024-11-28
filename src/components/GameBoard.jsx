import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import LetterTile from './LetterTile';
import { useGameState } from '../hooks/useGameState';

// was const GameBoard = ({ gridSize = 6 }) => {
const GameBoard = () => {
  const { gridSize, letterGrid, scoringPositions, populateGrid } =
    useGameState();

  useEffect(() => {
    populateGrid(gridSize);
  }, [gridSize, populateGrid]);

  return (
    <div className="flex flex-col items-center">
      <div
        className="grid gap-2 p-4 bg-gray-200 rounded-md"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          marginBottom: '4px',
        }}
      >
        {letterGrid?.map((row, rowIndex) =>
          row?.map((letter, colIndex) => (
            <GridSquare
              key={`${rowIndex}-${colIndex}`}
              position={[rowIndex, colIndex]}
              letter={letter}
              isScoring={scoringPositions?.some(
                ([r, c]) => r === rowIndex && c === colIndex
              )}
            />
          ))
        )}
      </div>
    </div>
  );
};

const GridSquare = ({ position, letter, isScoring }) => {
  const { moveLetter, letterGrid } = useGameState(); // Access state and actions
  const [row, col] = position;

  const [, drop] = useDrop(
    () => ({
      accept: 'tile',
      drop: (item) => moveLetter(item.position, position), // Handle moves and swaps
      canDrop: () => true, // Always allow drops
    }),
    [letterGrid] // Dependency ensures latest state
  );

  return (
    <div
      ref={drop}
      className={`w-16 h-16 border-2 flex items-center justify-center ${
        isScoring ? 'border-green-500' : 'border-gray-400'
      }`}
    >
      {letterGrid[row]?.[col] && (
        <LetterTile letter={letterGrid[row][col]} position={[row, col]} />
      )}
    </div>
  );
};

export default GameBoard;
