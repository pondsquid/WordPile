export const calculateScore = (
  grid,
  dictionary,
  leastUsedLetter,
  minWordLength = 3
) => {
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical down
    [1, 1], // Diagonal down-right
    [-1, 1], // Diagonal up-left
  ];

  const isWordValid = (word, prevChar, nextChar) =>
    word.length >= minWordLength &&
    dictionary.has(word) &&
    (!prevChar || prevChar === null) && // Ensure the word starts at a blank or edge
    (!nextChar || nextChar === null); // Ensure the word ends at a blank or edge

  let totalScore = 0;
  let wordCount = 0;
  const scoringPositions = []; // Track all positions contributing to scores
  const wordList = []; // Track valid words and their scores

  const calculateWordScore = (word) => {
    let scorelen = word.length - 1;
    if (word.includes(leastUsedLetter)) {
      scorelen += 1; // Add bonus length for least-used letter
    }
    return fibonacci(scorelen); // Fibonacci scoring
  };

  const processPosition = (x, y) => {
    directions.forEach(([dx, dy]) => {
      let word = '';
      let nx = x;
      let ny = y;
      const positions = [];

      // Get the character before the starting position
      const prevChar =
        x - dx >= 0 &&
        y - dy >= 0 &&
        x - dx < grid.length &&
        y - dy < grid[x - dx].length
          ? grid[x - dx][y - dy]
          : null;

      while (
        nx >= 0 &&
        ny >= 0 &&
        nx < grid.length &&
        ny < grid[nx].length &&
        grid[nx][ny]
      ) {
        word += grid[nx][ny];
        positions.push([nx, ny]);
        nx += dx;
        ny += dy;

        // Get the character after the current word
        const nextChar =
          nx >= 0 && ny >= 0 && nx < grid.length && ny < grid[nx].length
            ? grid[nx][ny]
            : null;

        if (isWordValid(word, prevChar, nextChar)) {
          const wordScore = calculateWordScore(word);
          totalScore += wordScore;
          wordCount++;
          scoringPositions.push(...positions); // Add contributing positions
          wordList.push({ word, score: wordScore });
          console.log('Scoring', word, 'total now', totalScore);
        }
      }
    });
  };

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      processPosition(x, y);
    }
  }

  console.log('Final Scoring Positions:', scoringPositions);
  console.log('Final Word List:', wordList);
  return { score: totalScore, wordCount, scoringPositions, wordList };
};

// Fibonacci helper function
const fibonacci = (n) => {
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
};
