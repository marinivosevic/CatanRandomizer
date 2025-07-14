// types.ts
export type Resource = "brick" | "grain" | "lumber" | "ore" | "wool" | "desert";
export type BoardType = "standard" | "extended";

export interface Hex {
  coords: [number, number, number];
  resource: Resource;
  number: number | null;
  id: number;
}

export interface BoardLayout {
  layout: Hex[];
  type: BoardType;
}
