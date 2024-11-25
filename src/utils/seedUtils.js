// src/utils/seedUtils.js

// Validate if a seed is a valid hex string
export const isValidHexSeed = (seed) => /^[0-9a-fA-F]+$/.test(seed);

// Generate a random seed in base-36 format
export const generateRandomSeed = () => Math.random().toString(36).slice(2, 11); // 9 characters, similar to substr

// Generate a seed from a date (e.g., YYYY-MM-DD)
export const generateSeedFromDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null; // Invalid date
  const isoDate = date.toISOString().slice(0, 10); // e.g., "2024-11-24"
  const hashSeed = Array.from(isoDate)
    .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 0)
    .toString(16);
  return { seed: hashSeed, date: isoDate };
};
