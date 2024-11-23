import { create } from "zustand";

const MIN_WORD_LENGTH = 3; // Single constant for reusability

export const useGameState = create((set, get) => ({
    score: 0,
    turn: 1,
    wordCount: 0, // Ensure wordCount starts at 0
    letterGrid: [], // Initial grid state
    dictionary: new Set(), // Word dictionary for validation

    // getLeastUsedLetter: () => getLeastUsedLetter(),

    // Dynamically find the least-used letter based on the grid
    getLeastUsedLetter: () => {
    const letterGrid = get().letterGrid; // Access the current grid
    return findLeastUsedLetterOnGrid(letterGrid); // Use helper to find least-used letter
    },

    // Update the score directly
    updateScore: (points) => set((state) => ({ score: state.score + points })),

    // Increment the turn count
    nextTurn: () => set((state) => ({ turn: state.turn + 1 })),

    // Set the letter grid
    setLetterGrid: (grid) => set(() => ({ letterGrid: grid })),

    // Set the dictionary from a word list
    setDictionary: (words) => set(() => ({ dictionary: new Set(words) })),

    // Populate the grid with random letters
    populateGrid: (gridSize) => {
        const fillPercentage = Math.random() * 0.25 + 0.5; // Randomly select between 50–75%
        const totalCells = gridSize * gridSize;
        const filledCells = Math.floor(totalCells * fillPercentage);

        const newGrid = Array.from({ length: gridSize }, () =>
            Array.from({ length: gridSize }, () => null)
        );

        let placedLetters = 0;
        while (placedLetters < filledCells) {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);

            if (newGrid[row][col] === null) {
                newGrid[row][col] = generateWeightedLetter();
                placedLetters++;
            }
        }

        set(() => ({ letterGrid: newGrid, score: 0, turn: 1 }));
    },

    // Move a letter from one position to another
    moveLetter: (fromPosition, toPosition) => {
        set((state) => {
            const newGrid = state.letterGrid.map((row) => [...row]); // Create a deep copy of the grid
            const [fromRow, fromCol] = fromPosition;
            const [toRow, toCol] = toPosition;

            // Ensure valid positions
            if (!newGrid[fromRow] || !newGrid[toRow]) return state;
            if (!newGrid[fromRow][fromCol]) return state;
            if (fromRow === toRow && fromCol === toCol) return state;

            // Perform the swap/move
            const draggedLetter = newGrid[fromRow][fromCol];
            const targetLetter = newGrid[toRow][toCol];
            newGrid[toRow][toCol] = draggedLetter;
            newGrid[fromRow][fromCol] = targetLetter;

            // Calculate score and word count with updated grid
            const leastUsedLetter = getLeastUsedLetter(); // Get the least used letter
            const { score, wordCount } = calculateScore(newGrid, state.dictionary);

            // Calculate bonus points for words containing the least-used letter
            const bonusPoints = findAllWords(newGrid)
                .filter((word) => state.dictionary.has(word))
                .reduce((bonus, word) => {
                    return bonus + (word.includes(leastUsedLetter) ? 1 : 0);
                }, 0);

            // Return the updated state
            return {
                ...state, // Keep other state properties unchanged
                letterGrid: newGrid, // Update grid
                score: score + bonusPoints, // Update score with bonus
                wordCount, // Update word count
                turn: state.turn + 1, // Increment turn
            };
        });
    },

    // Trigger score calculation manually
    calculateScore: () => {
        set((state) => ({
            score: calculateScore(state.letterGrid, state.dictionary),
        }));
    },
}));

// Helper: Calculate the score based on the grid
const calculateScore = (grid, dictionary) => {
    if (!grid || !dictionary || dictionary.size === 0) {
        console.error("Invalid state: Letter grid or dictionary is missing");
        return { score: 0, wordCount: 0 };
    }

    const words = findAllWords(grid);
    const validWords = words.filter((word) => dictionary.has(word) && word.length >= MIN_WORD_LENGTH);

    const score = validWords.reduce((total, word) => {
        const wordScore = fibonacci(word.length - 1); // Adjusted Fibonacci scoring
        console.log(`Word: ${word}, Length: ${word.length}, Score: ${wordScore}`);
        return total + wordScore;
    }, 0);

    return { score, wordCount: validWords.length }; // Return score and word count
};

  const getLeastUsedLetter = () => {
    const leastUsed = letterFrequencies.reduce((least, current) =>
      current.weight < least.weight ? current : least
    ).letter;
    // console.log(`Least used letter: ${leastUsed}`);
    return leastUsed;
  };

// Helper: Calculate the Fibonacci number for a given length
const fibonacci = (n) => {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
};

// Helper: Find all horizontal, vertical, and diagonal words in the grid
const findAllWords = (grid) => {
    const rows = grid.length;
    const cols = grid[0]?.length || 0;
    const words = [];

    // Horizontal words
    for (let r = 0; r < rows; r++) {
        let word = "";
        for (let c = 0; c < cols; c++) {
            if (grid[r][c]) {
                word += grid[r][c];
            } else {
                if (word.length >= MIN_WORD_LENGTH) words.push(word);
                word = "";
            }
        }
        if (word.length >= MIN_WORD_LENGTH) words.push(word); // Final word in row
    }

    // Vertical words
    for (let c = 0; c < cols; c++) {
        let word = "";
        for (let r = 0; r < rows; r++) {
            if (grid[r][c]) {
                word += grid[r][c];
            } else {
                if (word.length >= MIN_WORD_LENGTH) words.push(word);
                word = "";
            }
        }
        if (word.length >= MIN_WORD_LENGTH) words.push(word); // Final word in column
    }

    // Diagonals (top-left to bottom-right)
    for (let startRow = 0; startRow < rows; startRow++) {
        for (let startCol = 0; startCol < cols; startCol++) {
            let word = "";
            let r = startRow,
                c = startCol;
            while (r < rows && c < cols && grid[r][c]) {
                word += grid[r][c];
                r++;
                c++;
            }
            if (word.length >= MIN_WORD_LENGTH) words.push(word);
        }
    }

    // Diagonals (top-right to bottom-left)
    for (let startRow = 0; startRow < rows; startRow++) {
        for (let startCol = cols - 1; startCol >= 0; startCol--) {
            let word = "";
            let r = startRow,
                c = startCol;
            while (r < rows && c >= 0 && grid[r][c]) {
                word += grid[r][c];
                r++;
                c--;
            }
            if (word.length >= MIN_WORD_LENGTH) words.push(word);
        }
    }

    return words;
};

const letterFrequencies = [
    { letter: "E", weight: 12.7 },
    { letter: "T", weight: 9.1 },
    { letter: "A", weight: 8.2 },
    { letter: "O", weight: 7.5 },
    { letter: "I", weight: 7.0 },
    { letter: "N", weight: 6.7 },
    { letter: "S", weight: 6.3 },
    { letter: "H", weight: 6.1 },
    { letter: "R", weight: 6.0 },
    { letter: "D", weight: 4.3 },
    { letter: "L", weight: 4.0 },
    { letter: "C", weight: 2.8 },
    { letter: "U", weight: 2.8 },
    { letter: "M", weight: 2.4 },
    { letter: "W", weight: 2.4 },
    { letter: "F", weight: 2.2 },
    { letter: "G", weight: 2.0 },
    { letter: "Y", weight: 2.0 },
    { letter: "P", weight: 1.9 },
    { letter: "B", weight: 1.5 },
    { letter: "V", weight: 1.0 },
    { letter: "K", weight: 0.8 },
    { letter: "J", weight: 0.2 },
    { letter: "X", weight: 0.2 },
    { letter: "Q", weight: 0.1 },
    { letter: "Z", weight: 0.1 },
];

const generateWeightedLetter = () => {
    const totalWeight = letterFrequencies.reduce((sum, item) => sum + item.weight, 0);
    const rand = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (const { letter, weight } of letterFrequencies) {
        cumulativeWeight += weight;
        if (rand <= cumulativeWeight) {
            return letter;
        }
    }
};

const findLeastUsedLetterOnGrid = (grid) => {
    // Get all distinct letters from the grid
    const gridLetters = new Set();
    for (const row of grid) {
      for (const letter of row) {
        if (letter) gridLetters.add(letter); // Add non-null letters
      }
    }
  
    // Find the least frequent letter in English
    const leastUsed = Array.from(gridLetters).reduce((least, letter) => {
      const frequency = letterFrequencies.find((entry) => entry.letter === letter)?.weight || Infinity;
      return frequency < least.frequency
        ? { letter, frequency }
        : least;
    }, { letter: null, frequency: Infinity });
  
  //  console.log(`Least used letter on grid by English frequency: ${leastUsed.letter}`);
    return leastUsed.letter;
  };
  