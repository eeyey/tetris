import TetraGenerator from "./TetraGenerator";
import GameProgress from "./GameProgress";
import Updater from "./Updater";
import Canvas from "./Canvas";

import Tetra from "../common/Tetra";
import Field from "../common/Field";
import Cell from "../common/Cell";

import {
  BACKGROUND,
  DROP_DELAY,
  GAME_HEIGHT,
  GAME_WIDTH,
  SPEED_DIFF,
} from "../config";

import { drawCell, drawCells, drawGrid } from "../render";
import { Color, MoveDirection } from "../types";

interface GameParams {
  background: Color;
  root: HTMLElement;
}

export default class Game {
  root: HTMLElement;

  canvas: Canvas = new Canvas(BACKGROUND);
  field: Field = new Field();

  updater: Updater = new Updater();
  generator: TetraGenerator = new TetraGenerator(0, 6);
  progress: GameProgress = new GameProgress();

  stopWaitDrop: () => void;
  stopDrop: () => void;
  stopDraw: () => void;

  tetra: Tetra;
  isDowned: boolean;
  speed: number = 500;

  constructor(data: GameParams) {
    this.root = data.root;
    Object.assign(this.root.style, {
      width: `${GAME_WIDTH}px`,
      height: `${GAME_HEIGHT}px`,
    });

    this.root.appendChild(this.canvas.element);
    this.canvas.resize();
  }

  run(reset: boolean) {
    if (reset) {
      this.progress.start();
      this.getTetra();
    }
    this.subscribeUpdate();
  }

  getTetra() {
    this.tetra = this.generator.getTetra();

    if (this.field.haveCollision(this.tetra.cells))
      alert(
        `Game over. \nYour score: ${this.progress.score} \nReload page to restart.`
      );

    this.tetra.setShadow(this.field);

    this.progress.setTetra(this.generator.nextTetra);
  }

  subscribeUpdate() {
    if (this.stopDraw) this.stopDraw();
    if (this.stopDrop) this.stopDrop();

    this.stopDraw = this.updater.subscribe(this.draw.bind(this));
    this.stopDrop = this.updater.subscribe(
      this.dropTetra.bind(this),
      this.speed
    );
  }

  dropTetra() {
    let cells = this.tetra.cells.map((c) => ({ ...c, y: c.y + 1 } as Cell));

    if (!Field.isOutField(cells) && !this.field.haveCollision(cells)) {
      this.tetra.move(MoveDirection.Down);

      this.isDowned = false;
    } else {
      this.stopWaitDrop = this.updater.subscribe(
        this.checkDrop.bind(this),
        DROP_DELAY
      );

      this.isDowned = true;
    }
  }

  checkDrop() {
    this.stopWaitDrop();

    if (!this.isDowned) return;

    this.isDowned = false;

    const cells = this.tetra.cells.map((c) => ({ ...c, y: c.y + 1 } as Cell));

    if (!Field.isOutField(cells) && !this.field.haveCollision(cells)) return; // is not dropped

    this.field.setCells(this.tetra.cells);

    const updateSpeed = this.progress.update(this.field.clearLines());

    if (updateSpeed) {
      this.speed -= SPEED_DIFF;
      this.subscribeUpdate();
    }

    this.getTetra();
  }

  draw() {
    this.canvas.clear();

    this.canvas.draw((ctx) => drawCells(ctx, this.tetra.shadow.cells));
    this.canvas.draw((ctx) => drawCells(ctx, this.tetra.cells));

    this.canvas.draw((ctx) =>
      this.field.cells.forEach((row, y) =>
        row.forEach((color, x) => color && drawCell(ctx, x, y, color))
      )
    );

    this.canvas.draw(drawGrid);
  }
}
