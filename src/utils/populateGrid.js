import { generateWeightedLetter } from './letterFrequencies';

const seededRandom = (seedInfo) => {
  let t = parseInt(seedInfo.seed, 16);
  if (isNaN(t)) {
    throw new Error('Invalid hexadecimal seed');
  }
  return () => {
    // Xorshift algorithm for random number generation
    t ^= t << 13;
    t ^= t >>> 17;
    t ^= t << 5;
    return (t >>> 0) / 4294967296; // Normalize to [0, 1)
  };
};

export const populateGrid = (gridSize, seedInfo) => {
  const random = seededRandom(seedInfo); // Initialize PRNG with the seed
  return Array(gridSize)
    .fill(null)
    .map(() =>
      Array(gridSize)
        .fill(null)
        .map(() => (random() < 0.5 ? generateWeightedLetter(random) : null))
    );
};
