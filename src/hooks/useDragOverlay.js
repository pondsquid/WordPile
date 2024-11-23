import { useState } from "react";

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

  return { isDragging, dragLetter, dragX, dragY, startDragging, stopDragging, updatePosition };
};



// import { create } from "zustand";

// export const useDragOverlay = create((set) => ({
//   isDragging: false,
//   dragLetter: null,
//   dragX: 0,
//   dragY: 0,
//   startDragging: (letter) =>
//     set(() => ({ isDragging: true, dragLetter: letter })),
//   updatePosition: (x, y) =>
//     set(() => ({ dragX: x, dragY: y })),
//   stopDragging: () =>
//     set(() => ({ isDragging: false, dragLetter: null, dragX: 0, dragY: 0 })),
// }));
