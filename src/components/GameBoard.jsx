import React from 'react';
import { useDrop } from 'react-dnd';
import LetterTile from './LetterTile';
import { useGameState } from '../hooks/useGameState';

const GameBoard = ({ gridSize = 6 }) => {
  const { letterGrid, scoringPositions } = useGameState();

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

const GridSquare = ({ position, letter }) => {
  const { moveLetter, letterGrid } = useGameState(); // Access state and actions

  const [, drop] = useDrop(
    () => ({
      accept: 'tile',
      drop: (item) => {
        moveLetter(item.position, position); // Handle moves and swaps
      },
      canDrop: () => true, // Always allow drops
    }),
    [letterGrid] // Dependency ensures latest state
  );

  return (
    <div
      ref={drop}
      className="w-16 h-16 border-2 border-gray-400 flex items-center justify-center bg-white"
    >
      {letter && <LetterTile letter={letter} position={position} />}
    </div>
  );
};

export default GameBoard;
