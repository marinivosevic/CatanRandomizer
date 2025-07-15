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
  [0, 0, 0],
  [1, -1, 0],
  [-1, 1, 0],
  [0, -1, 1],
  [0, 1, -1],
  [1, 0, -1],
  [-1, 0, 1],
  [2, -1, -1],
  [-2, 1, 1],
  [1, 1, -2],
  [-1, -1, 2],
  [2, 0, -2],
  [-2, 0, 2],
  [0, -2, 2],
  [0, 2, -2],
  [1, -2, 1],
  [-1, 2, -1],
  [-2, 2, 0],
  [2, -2, 0],
];

// Extended board layout (additional rings)
// Extended 7-row layout (cube coordinates for 3–4–5–6–5–4–3 shape)
const EXTENDED_LAYOUT: [number, number, number][] = [
  // Row 0 (top) - 3 hexes
  [-2, 2, 4],
  [-1, 2, 4],
  [0, 2, 4],

  // Row 1 - 4 hexes
  [-2, 1, 1],
  [-1, 1, 0],
  [0, 1, -1],
  [1, 1, -2],

  // Row 2 - 5 hexes
  [-2, 0, 2],
  [-1, 0, 1],
  [0, 0, 0],
  [1, 0, -1],
  [2, 0, -2],

  // Row 3 - 6 hexes (middle row)
  [-2, -1, 3],
  [-1, -1, 2],
  [0, -1, 1],
  [1, -1, 0],
  [2, -1, -1],
  [3, -1, -2],

  // Row 4 - 5 hexes
  [-1, -2, 3],
  [0, -2, 2],
  [1, -2, 1],
  [2, -2, 0],
  [3, -2, -1],

  // Row 5 - 4 hexes
  [0, -3, 3],
  [1, -3, 2],
  [2, -3, 1],
  [3, -3, 0],

  // Row 6 - 3 hexes
  [1, -4, 3],
  [2, -4, 2],
  [3, -4, 1],
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
