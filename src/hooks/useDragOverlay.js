import { useState } from 'react';

export const useDragOverlay = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragLetter, setDragLetter] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);

  const updatePosition = (x, y) => {
    // console.log(`Updating drag position: (${x}, ${y})`); // Log cursor movement
    setDragX(x);
    setDragY(y);
  };

  const startDragging = (letter) => {
    // console.log(`Start dragging: ${letter}`); // Log drag start
    setIsDragging(true);
    setDragLetter(letter);
  };

  const stopDragging = () => {
    // console.log("Stop dragging"); // Log drag end
    setIsDragging(false);
    setDragLetter(null);
  };

  return {
    isDragging,
    dragLetter,
    dragX,
    dragY,
    startDragging,
    stopDragging,
    updatePosition,
  };
};
