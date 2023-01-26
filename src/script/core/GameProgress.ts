import Canvas from "./Canvas";
import Tetra from "../common/Tetra";
import { drawCells } from "../render";
import { COMBOS_SCORE } from "../config";
import { parseTimestamp } from "../utils";

export default class GameProgress {
  nextTetra: Tetra;
  level: number = 0;
  score: number = 0;
  lines: number = 0;

  _timestamp: number;
  _timer: ReturnType<typeof setInterval>;

  nextBlock = document.querySelector("#next-tetra") as HTMLDivElement;
  timeBlock = document.querySelector("#game-time") as HTMLDivElement;
  levelBlock = document.querySelector("#level") as HTMLSpanElement;
  linesBlock = document.querySelector("#lines") as HTMLSpanElement;
  scoreBlock = document.querySelector("#score") as HTMLSpanElement;

  nextCanvas: Canvas;

  constructor() {
    this.nextCanvas = new Canvas("#fff");
    this.nextBlock.append(this.nextCanvas.element);

    this.nextCanvas.resize();
  }

  start() {
    this.level = 0;
    this.score = 0;
    this.lines = 0;

    this._timestamp = Date.now();

    this._timer = setInterval(() => {
      this.timeBlock.innerHTML = parseTimestamp(Date.now() - this._timestamp);
    }, 1000);
  }

  setTetra(tetra: Tetra) {
    this.nextTetra = tetra;

    const minX = Math.min(...this.nextTetra.cells.map((c) => c.x));
    this.nextTetra.cells.map((c) => ({ ...c, x: c.x - minX }));

    this.nextCanvas.clear();
    this.nextCanvas.draw((ctx) => drawCells(ctx, this.nextTetra.cells));
  }

  update(lines: number): boolean {
    const currLines = this.lines;

    this.addLines(lines);
    this.addScore(COMBOS_SCORE[lines]);

    if (this.lines % 8 < currLines % 8) {
      this.addLevel();
      return true;
    }

    return false;
  }

  addLines(count: number) {
    this.lines += count;

    this.linesBlock.innerHTML = `${this.lines}`;
  }

  addScore(count: number) {
    this.score += count;

    this.scoreBlock.innerHTML = `${this.score}`;
  }

  addLevel() {
    this.levelBlock.innerHTML = `${++this.level}`;
  }
}
