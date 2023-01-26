import cloneDeep from "lodash.clonedeep";

import Cell from "./Cell";
import Field from "./Field";

import { Color, ITetra, MoveDirection, RotateCallback } from "../types";

export default class Tetra {
  color: Color;
  cells: Cell[];

  shadow: Tetra;

  rotateCb: RotateCallback;
  rotateCount: number = 0;

  constructor(data: ITetra) {
    this.color = data.color;

    this.rotateCb = data.rotateCb;

    this.cells = data.cells.map((coords) => new Cell(coords, this.color));
  }

  rotate() {
    this.cells = this.rotateCb(this.cells, this.rotateCount % 4);

    this.rotateCount++;
  }

  move(direction: MoveDirection) {
    if (direction === MoveDirection.Left) {
      this.cells.forEach((cell) => cell.x--);
    } else if (direction === MoveDirection.Right) {
      this.cells.forEach((cell) => cell.x++);
    } else if (direction === MoveDirection.Down) {
      this.cells.forEach((cell) => cell.y++);
    } else {
      const unknownDirection: never = direction;
      throw new Error(`Неизвестное направление ${unknownDirection}`);
    }
  }

  setShadow(field: Field) {
    this.shadow = cloneDeep(this);

    const yMax = Math.max(...this.shadow.cells.map((c) => c.y));
    const yMin = Math.min(...this.shadow.cells.map((c) => c.y));

    let minD = 20 - yMax;

    this.shadow.cells.forEach((c) => {
      for (let i = Math.max(yMin, 0); i < 20; i++) {
        if (field.cells[i][c.x]) minD = Math.min(minD, i - c.y);
      }
    });

    this.shadow.cells.forEach((c) => {
      c.color = "#ddd";
      c.y += minD - 1;
    });
  }
}
