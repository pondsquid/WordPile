import { generateWeightedLetter } from './letterFrequencies';

// A simple PRNG based on a seed
const seededRandom = (seed) => {
  let x = 0;
  for (let i = 0; i < seed.length; i++) {
    x += seed.charCodeAt(i);
  }
  return () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
};

export const populateGrid = (gridSize, seed) => {
  const random = seededRandom(seed); // Initialize PRNG with the seed

  return Array(gridSize)
    .fill(null)
    .map(() =>
      Array(gridSize)
        .fill(null)
        .map(() => (random() < 0.6 ? generateWeightedLetter(random) : null))
    );
};
