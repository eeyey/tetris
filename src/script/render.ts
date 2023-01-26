import Cell from "./common/Cell";

import { BORDER_COLOR, BORDER_SIZE, CELL_SIZE } from "./config";
import { Color } from "./types";

export function drawCells(ctx: CanvasRenderingContext2D, cells: Cell[]) {
  cells.forEach((cell) => drawCell(ctx, cell.x, cell.y, cell.color));
}

export function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: Color
) {
  const CS = CELL_SIZE;

  ctx.beginPath();
  ctx.rect(x * CS, y * CS, CS, CS);
  ctx.fillStyle = color;
  ctx.fill();
}

export function drawGrid(ctx: CanvasRenderingContext2D) {
  const CS = CELL_SIZE;
  const BS = BORDER_SIZE;

  ctx.beginPath();
  ctx.fillStyle = BORDER_COLOR;

  for (let i = 0; i <= 10; i++) ctx.rect(i * CS, 0, BS, 20 * CS + BS);
  for (let i = 0; i <= 20; i++) ctx.rect(0, i * CS, 10 * CS + BS, BS);

  ctx.fill();
}
