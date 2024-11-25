import { create } from 'zustand';
import { populateGrid as generateGrid } from '../utils/populateGrid';
import { calculateScore } from '../utils/calculateScore';
import { generateRandomSeed } from '../utils/seedUtils';
import { findLeastUsedLetterOnGrid } from '../utils/letterFrequencies';

const MIN_WORD_LENGTH = 3;

export const useGameState = create((set, get) => ({
  gridSize: 6, // Default grid size
  seed: null, // Current seed
  letterGrid: [], // Current board grid
  dictionary: new Set(), // Word dictionary
  score: 0, // Total score
  wordCount: 0, // Total words
  scoringPositions: [], // Positions contributing to current score
  wordList: [], // Words contributing to the score
  turn: 1, // Turn counter
  initialized: false, // Initialization flag

  // Get the least-used letter for scoring bonuses
  getLeastUsedLetter: () => {
    const letterGrid = get().letterGrid; // Access current grid
    return findLeastUsedLetterOnGrid(letterGrid); // Use utility to compute
  },

  // Update the grid size dynamically
  setGridSize: (newSize) => {
    set({ gridSize: newSize });
    get().populateGrid(newSize, get().seed);
  },

  // Update the current seed
  setSeed: (newSeed) => set({ seed: newSeed }),

  // Set the letter grid directly
  setLetterGrid: (grid) => set({ letterGrid: grid }),

  // Populate the grid with the specified or default size and seed
  populateGrid: (gridSize, seed) => {
    const actualSeed = seed || generateRandomSeed();
    const dictionary = get().dictionary;
    const newGrid = generateGrid(gridSize, actualSeed, dictionary);
    const leastUsedLetter = findLeastUsedLetterOnGrid(newGrid);

    // Recalculate score and word list
    const { score, wordCount, scoringPositions, wordList } = calculateScore(
      newGrid,
      dictionary,
      leastUsedLetter,
      MIN_WORD_LENGTH
    );

    // Update state with new grid and score
    set({
      gridSize,
      seed: actualSeed,
      letterGrid: newGrid,
      score,
      wordCount,
      scoringPositions,
      wordList,
      turn: 1, // Reset turn count
    });
  },

  // Reset the grid to its initial state
  resetGrid: () => {
    const { gridSize, seed } = get();
    get().populateGrid(gridSize, seed);
  },

  // Increment the turn counter
  nextTurn: () => set((state) => ({ turn: state.turn + 1 })),

  // Set the word dictionary
  setDictionary: (words) => set({ dictionary: new Set(words) }),

  // Move a letter on the grid and recalculate score
  moveLetter: (fromPosition, toPosition) => {
    set((state) => {
      const newGrid = state.letterGrid.map((row) => [...row]); // Deep copy the grid
      const [fromRow, fromCol] = fromPosition;
      const [toRow, toCol] = toPosition;

      // Validate positions
      if (!newGrid[fromRow] || !newGrid[toRow]) return state;
      if (!newGrid[fromRow][fromCol]) return state;
      if (fromRow === toRow && fromCol === toCol) return state;

      // Swap letters
      const draggedLetter = newGrid[fromRow][fromCol];
      const targetLetter = newGrid[toRow][toCol];
      newGrid[toRow][toCol] = draggedLetter;
      newGrid[fromRow][fromCol] = targetLetter;

      // Recalculate score
      const leastUsedLetter = findLeastUsedLetterOnGrid(newGrid);
      const { score, wordCount, scoringPositions, wordList } = calculateScore(
        newGrid,
        state.dictionary,
        leastUsedLetter,
        MIN_WORD_LENGTH
      );

      // Update state
      return {
        ...state,
        letterGrid: newGrid,
        score,
        wordCount,
        scoringPositions,
        wordList,
        turn: state.turn + 1, // Increment turn count
      };
    });
  },

  // Calculate score manually
  calculateScore: () => {
    const grid = get().letterGrid;
    const dictionary = get().dictionary;
    const leastUsedLetter = get().getLeastUsedLetter();
    const { score, wordCount, scoringPositions, wordList } = calculateScore(
      grid,
      dictionary,
      leastUsedLetter,
      MIN_WORD_LENGTH
    );
    set({ score, wordCount, scoringPositions, wordList });
  },
}));
