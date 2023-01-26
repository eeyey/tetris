import cloneDeep from "lodash.clonedeep";

import Game from "./script/core/Game";
import Field from "./script/common/Field";

import { MoveDirection } from "./script/types";

import "./style/style.css";

const game = new Game({
  root: document.querySelector("#root") as HTMLElement,
  background: "#aaa",
});

document.addEventListener("keydown", (e: KeyboardEvent) => {
  const clone = cloneDeep(game.tetra);

  if (e.key === "ArrowLeft") {
    clone.move(MoveDirection.Left);
  } else if (e.key === "ArrowRight") {
    clone.move(MoveDirection.Right);
  } else if (e.key === "ArrowDown") {
    clone.move(MoveDirection.Down);
  } else if (e.key === "ArrowUp") {
    clone.rotate();
  }

  const cells = clone.cells;
  if (Field.isOutField(cells) || game.field.haveCollision(cells)) return;

  if (e.key === "ArrowLeft") {
    game.tetra.move(MoveDirection.Left);
  } else if (e.key === "ArrowRight") {
    game.tetra.move(MoveDirection.Right);
  } else if (e.key === "ArrowDown") {
    game.tetra.move(MoveDirection.Down);
  } else if (e.key === "ArrowUp") {
    game.tetra.rotate();
  }

  game.tetra.setShadow(game.field);
});

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.code === "Space") {
    game.tetra.cells = cloneDeep(game.tetra.shadow.cells);
    game.tetra.cells.forEach((c) => (c.color = game.tetra.color));
  }
});

game.run(true);
