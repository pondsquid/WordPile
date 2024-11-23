import { generateWeightedLetter } from './letterFrequencies';

export const populateGrid = (gridSize, density = 0.6) => {
  const grid = Array(gridSize)
    .fill(null)
    .map(() =>
      Array(gridSize)
        .fill(null)
        .map(() => (Math.random() < density ? generateWeightedLetter() : null))
    );
  return grid;
};
