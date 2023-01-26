import { Color, Coords } from "../types";

export default class Cell {
  x: number;
  y: number;

  color: Color;

  constructor(data: Coords, color: Color) {
    this.x = data.x;
    this.y = data.y;

    this.color = color;
  }
}
