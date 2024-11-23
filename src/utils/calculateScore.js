export const calculateScore = (
  grid,
  dictionary,
  leastUsedLetter,
  minWordLength = 3
) => {
  const directions = [
    [0, 1], // Horizontal
    [1, 0], // Vertical
    [1, 1], // Diagonal down-right
    [1, -1], // Diagonal down-left
  ];

  const isWordValid = (word) =>
    word.length >= minWordLength && dictionary.has(word);

  let totalScore = 0;
  let wordCount = 0;

  const calculateWordScore = (word) => {
    let scorelen = word.length - 1;
    if (word.includes(leastUsedLetter)) {
      scorelen += 1; // Add bonus length for least-used letter
    }
    return fibonacci(scorelen); // Fibonacci scoring
  };

  // Function to process a single starting position
  const processPosition = (x, y) => {
    directions.forEach(([dx, dy]) => {
      let word = '';
      let nx = x;
      let ny = y;

      while (
        nx >= 0 &&
        ny >= 0 &&
        nx < grid.length &&
        ny < grid[nx].length &&
        grid[nx][ny]
      ) {
        word += grid[nx][ny];
        nx += dx;
        ny += dy;

        if (isWordValid(word)) {
          totalScore += calculateWordScore(word); // Add word score
          wordCount++;
          console.log('Scoring', word, 'total now', totalScore);
        }
      }
    });
  };

  // Process every position in the grid
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      processPosition(x, y);
    }
  }

  return { score: totalScore, wordCount };
};

// Fibonacci helper function
const fibonacci = (n) => {
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
};
