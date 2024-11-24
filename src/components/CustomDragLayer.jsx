import React, { useState, useEffect } from 'react';
import { useDragLayer } from 'react-dnd';
import { useGameState } from '../hooks/useGameState';

const CustomDragLayer = () => {
  const [tileDimensions, setTileDimensions] = useState({ width: 0, height: 0 });
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  // Watch the grid for changes and recompute tile dimensions
  const { letterGrid, getLeastUsedLetter } = useGameState();

  useEffect(() => {
    const tile = document.querySelector('.tile');
    if (tile) {
      const { width, height } = tile.getBoundingClientRect();
      setTileDimensions({ width, height });
    } else {
      console.warn('No tile found for dimension detection.');
    }
  }, [letterGrid]); // Recompute whenever the grid changes

  if (!isDragging || !currentOffset) {
    return null;
  }

  const { x, y } = currentOffset;

  // Check if the current tile is the least-used letter
  const leastUsedLetter = getLeastUsedLetter();
  const isLeastUsed = item?.letter === leastUsedLetter;

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px)`,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: `${tileDimensions.width}px`,
          height: `${tileDimensions.height}px`,
          backgroundColor: isLeastUsed ? 'red' : 'blue',
          color: 'white',
          fontSize: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '4px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        {item?.letter}
      </div>
    </div>
  );
};

export default CustomDragLayer;
