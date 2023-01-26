import { Color } from "../types";
import Cell from "./Cell";

export default class Field {
  cells: Array<Array<Color | null>>;

  constructor() {
    this.cells = [];

    for (let i = 0; i < 20; i++) {
      this.cells.push([]);
      for (let j = 0; j < 10; j++) {
        this.cells.at(-1)!.push(null);
      }
    }
  }

  clearLines(): number {
    let count = 0;

    for (let i = 0; i < 20; i++) {
      if (!this.cells[i].filter((c) => c === null).length) {
        this.cells.splice(i, 1);
        this.cells.unshift([...new Array(10)].map((_) => null));

        count++;
      }
    }

    return count;
  }

  setCells(cells: Cell[]) {
    cells.forEach((cell) => (this.cells[cell.y][cell.x] = cell.color));
  }

  haveCollision(cells: Cell[]): boolean {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        if (!this.cells[i][j]) continue;

        if (cells.find((c) => c.x === j && c.y === i)) return true;
      }
    }

    return false;
  }

  static isOutField(cells: Cell[]): boolean {
    return Boolean(
      cells.find((cell) => cell.x > 9 || cell.x < 0 || cell.y > 19)
    );
  }
}
