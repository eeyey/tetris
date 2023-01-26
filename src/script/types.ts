export type Color = string;

export type DrawCallback = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => void;

export interface ITetra {
  color: Color;
  cells: [Coords, Coords, Coords, Coords];
  rotateCb: RotateCallback;
}

export type RotateCallback = <C extends Coords>(
  c: C[],
  rotateCount?: number
) => [C, C, C, C];

export type Coords = { x: number; y: number };

export enum MoveDirection {
  Down = 1,
  Left = 2,
  Right = 3,
}
