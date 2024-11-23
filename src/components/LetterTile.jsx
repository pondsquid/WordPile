import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useDragOverlay } from '../hooks/useDragOverlay';
import { useGameState } from '../hooks/useGameState';

const LetterTile = ({ position }) => {
  const ref = useRef(null);
  const { startDragging, stopDragging } = useDragOverlay();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tile',
    item: () => {
      // Dynamically fetch the latest grid state
      const { letterGrid } = useGameState.getState();
      const currentLetter = letterGrid[position[0]][position[1]];

      // Log the correct letter and start dragging
      //   console.log(`Drag started for letter: ${currentLetter}, position: ${position}`);
      startDragging(currentLetter);

      return { letter: currentLetter, position };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: () => {
      stopDragging();
    },
    options: { preview: false }, // Disable default React DnD preview
  }));

  drag(ref);

  // Dynamically fetch the current letter for rendering
  const { letterGrid } = useGameState.getState();
  const currentLetter = letterGrid[position[0]][position[1]];

  return (
    <div
      ref={ref}
      className={`tile p-4 m-1 ${
        currentLetter === useGameState.getState().getLeastUsedLetter()
          ? 'bg-red-500'
          : 'bg-blue-500'
      } text-white font-bold rounded-md shadow-md cursor-pointer ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {currentLetter}
    </div>
  );
};

export default LetterTile;
