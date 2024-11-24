export const letterFrequencies = [
  { letter: 'E', weight: 12.7 },
  { letter: 'T', weight: 9.1 },
  { letter: 'A', weight: 8.2 },
  { letter: 'O', weight: 7.5 },
  { letter: 'I', weight: 7.0 },
  { letter: 'N', weight: 6.7 },
  { letter: 'S', weight: 6.3 },
  { letter: 'H', weight: 6.1 },
  { letter: 'R', weight: 6.0 },
  { letter: 'D', weight: 4.3 },
  { letter: 'L', weight: 4.0 },
  { letter: 'C', weight: 2.8 },
  { letter: 'U', weight: 2.8 },
  { letter: 'M', weight: 2.4 },
  { letter: 'W', weight: 2.4 },
  { letter: 'F', weight: 2.2 },
  { letter: 'G', weight: 2.0 },
  { letter: 'Y', weight: 2.0 },
  { letter: 'P', weight: 1.9 },
  { letter: 'B', weight: 1.5 },
  { letter: 'V', weight: 1.0 },
  { letter: 'K', weight: 0.8 },
  { letter: 'J', weight: 0.2 },
  { letter: 'X', weight: 0.2 },
  { letter: 'Q', weight: 0.1 },
  { letter: 'Z', weight: 0.1 },
];

// Generate a random letter based on frequencies
export const generateWeightedLetter = (random) => {
  const totalWeight = letterFrequencies.reduce(
    (sum, entry) => sum + entry.weight,
    0
  );
  const randomWeight = random() * totalWeight;

  let cumulativeWeight = 0;
  for (const { letter, weight } of letterFrequencies) {
    cumulativeWeight += weight;
    if (randomWeight <= cumulativeWeight) {
      return letter;
    }
  }
  return 'E'; // Fallback
};

// Find the least-used letter based on grid content
export const findLeastUsedLetterOnGrid = (grid) => {
  const gridLetters = grid.flat().filter(Boolean); // Get all non-null letters
  const frequencies = gridLetters.reduce((freq, letter) => {
    freq[letter] = (freq[letter] || 0) + 1;
    return freq;
  }, {});

  const leastUsed = Object.entries(frequencies).reduce(
    (least, [letter, count]) => {
      const englishFrequency =
        letterFrequencies.find((entry) => entry.letter === letter)?.weight ||
        Infinity;
      return englishFrequency < least.frequency
        ? { letter, frequency: englishFrequency }
        : least;
    },
    { letter: null, frequency: Infinity }
  );

  return leastUsed.letter;
};
