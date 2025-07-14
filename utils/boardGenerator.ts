// utils/boardGenerator.ts
import { Hex, Resource } from "../types/types";
import { shuffleArray } from "../utils/helpers";

// Standard game numbers (with frequencies)
const STANDARD_NUMBERS = [
  5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11,
];
// Extended game adds these numbers
const EXTENDED_NUMBERS = [...STANDARD_NUMBERS, 2, 12, 5, 9, 6, 4, 10, 3, 11, 8];

// Standard game resources (with frequencies)
const STANDARD_RESOURCES: Resource[] = [
  "brick",
  "brick",
  "brick",
  "grain",
  "grain",
  "grain",
  "grain",
  "lumber",
  "lumber",
  "lumber",
  "lumber",
  "ore",
  "ore",
  "ore",
  "wool",
  "wool",
  "wool",
  "wool",
  "desert",
];

// Extended game adds these resources
const EXTENDED_RESOURCES: Resource[] = [
  ...STANDARD_RESOURCES, // 19 tiles (includes 1 desert)
  "brick",
  "brick", // +2 brick (total 5)
  "grain",
  "grain", // +2 grain (total 6)
  "lumber",
  "lumber", // +2 lumber (total 6)
  "ore",
  "ore", // +2 ore (total 5)
  "wool",
  "wool", // +2 wool (total 6)
  "desert", // +1 desert (total 2)
];
// Standard board layout (rings)
const STANDARD_LAYOUT: [number, number, number][] = [
  // Center ring (1 hex)
  [0, 0, 0],

  // Middle ring (6 hexes)
  [0.85, -1, 0],
  [0.4, 0, -1.3],
  [-0.4, 1, -1.3],
  [-0.85, 1, 0],
  [-0.4, 0, 1.3],
  [0.4, -1, 1.3],

  // Outer ring (12 hexes)
  [1.7, -2, 0],
  [1.3, -1, -1.3],
  [1.85, 0, -2.5],
  [1, 1, -2.5],
  [0.15, 2, -2.5],
  [-1.3, 2, -1.3],
  [-1.7, 2, 0],
  [-1.25, 1, 1.3],
  [-1.8, 0, 2.5],
  [-1, -1, 2.5],
  [-0.15, -2, 2.5],
  [1.3, -2, 1.3],
];

// Extended board layout (additional rings)
const EXTENDED_LAYOUT: [number, number, number][] = [
  ...STANDARD_LAYOUT,
  // Add 2 tiles to the bottom 4-tile row (now 6)
  [-1.5, -1.5, 2.0], // 20 - Between [-1,-1,2.5] and [-0.15,-2,2.5]
  [2.1, 2, 1.35], // 21 - Between [-0.15,-2,2.5] and [1.3,-2,1.3]

  // Add remaining 9 tiles to complete 5-4-3 bottom
  // New bottom row (5 tiles)
  [-2.15, 0.5, 1.3], // 22 - Left extension
  [-2.7, -0.5, 2.6], // 23
  [0.7, -0.5, 2.5], // 24 - Right extension
  [-3.2, 1, 4], // 25

  // New bottom-middle (4 tiles)
  [-1.5, -2.5, 2.0], // 26
  [-0.5, -3.0, 5.5], // 27
  [0.7, -1.0, 4.5], // 28
  [3.5, -2.5, 5.0], // 291

  // New bottom-right (3 tiles - optional, adjust if needed)
  [2.0, 0.0, 5.0], // 30
];

export const generateStandardBoard = (): Hex[] => {
  const shuffledNumbers = shuffleArray([...STANDARD_NUMBERS]);
  const shuffledResources = shuffleArray([...STANDARD_RESOURCES]);

  return STANDARD_LAYOUT.map((hex, index) => {
    const resource = shuffledResources[index];
    const number =
      resource === "desert" ? null : (shuffledNumbers.pop() as number);

    return {
      coords: hex,
      resource,
      number,
      id: index,
    };
  });
};

export const generateExtendedBoard = (): Hex[] => {
  const shuffledNumbers = shuffleArray([...EXTENDED_NUMBERS]);
  const shuffledResources = shuffleArray([...EXTENDED_RESOURCES]);

  return EXTENDED_LAYOUT.map((hex, index) => {
    const resource = shuffledResources[index];
    const number =
      resource === "desert" ? null : (shuffledNumbers.pop() as number);

    return {
      coords: hex,
      resource,
      number,
      id: index,
    };
  });
};
