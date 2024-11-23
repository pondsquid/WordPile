import { create } from 'zustand';
import { populateGrid } from '../utils/populateGrid';
import { calculateScore } from '../utils/calculateScore';
import { findLeastUsedLetterOnGrid } from '../utils/letterFrequencies';

const MIN_WORD_LENGTH = 3;

export const useGameState = create((set, get) => ({
  // State variables
  score: 0,
  turn: 1,
  wordCount: 0,
  letterGrid: [],
  dictionary: new Set(),

  // Update the score directly
  updateScore: (points) => set((state) => ({ score: state.score + points })),

  // Increment the turn count
  nextTurn: () => set((state) => ({ turn: state.turn + 1 })),

  // Set the letter grid manually
  setLetterGrid: (grid) => set(() => ({ letterGrid: grid })),

  // Set the dictionary from a word list
  setDictionary: (words) => set(() => ({ dictionary: new Set(words) })),

  // Dynamically find the least-used letter on the grid
  getLeastUsedLetter: () => {
    const grid = get().letterGrid;
    return findLeastUsedLetterOnGrid(grid);
  },

  // Populate the grid with random letters
  populateGrid: (gridSize) => {
    const grid = populateGrid(gridSize);
    set({ letterGrid: grid });
  },

  // Move a letter from one position to another
  moveLetter: (fromPosition, toPosition) => {
    set((state) => {
      const grid = state.letterGrid.map((row) => [...row]); // Deep copy of grid
      const [fromRow, fromCol] = fromPosition;
      const [toRow, toCol] = toPosition;

      // Ensure valid positions
      if (!grid[fromRow] || !grid[toRow]) return state;
      if (!grid[fromRow][fromCol]) return state;
      if (fromRow === toRow && fromCol === toCol) return state;

      // Perform the swap/move
      const draggedLetter = grid[fromRow][fromCol];
      const targetLetter = grid[toRow][toCol];
      grid[toRow][toCol] = draggedLetter;
      grid[fromRow][fromCol] = targetLetter;

      // Get the least-used letter
      const leastUsedLetter = get().getLeastUsedLetter();

      // Calculate score and word count with updated grid
      const { score, wordCount } = calculateScore(
        grid,
        state.dictionary,
        leastUsedLetter,
        MIN_WORD_LENGTH
      );

      return {
        ...state, // Preserve other state properties
        letterGrid: grid, // Update grid
        score, // Update score
        wordCount, // Update word count
        turn: state.turn + 1, // Increment turn
      };
    });
  },

  // Trigger score calculation manually
  calculateScore: () => {
    const grid = get().letterGrid;
    const leastUsedLetter = get().getLeastUsedLetter();
    const scoreData = calculateScore(
      grid,
      get().dictionary,
      leastUsedLetter,
      MIN_WORD_LENGTH
    );
    set({ score: scoreData.score, wordCount: scoreData.wordCount });
  },
}));
