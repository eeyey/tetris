import { Coords, ITetra } from "./types";

const getDefaultRotateCb =
  (centerCell: number) =>
  <C extends Coords>(cells: C[]) => {
    if (centerCell > 3) throw new Error("Tetra has 4 cells ");

    const newCoords = cells.map((c) => ({
      // new coordinate system
      ...c,
      x: cells[centerCell].x - c.x,
      y: cells[centerCell].y - c.y,
    }));

    return newCoords.map((c) => ({
      ...c, // Rotation matrice on -90degress
      x: c.x * 0 + c.y * 1 + cells[centerCell].x, //  0 1
      y: c.x * -1 + c.y * 0 + cells[centerCell].y, // -1 0
    })) as [C, C, C, C];
  };

export const tetras: ITetra[] = [
  //  ++ ИЗМЕНИТЬ НУМЕРАЦИЮ ЯЧЕЕК
  // ++
  {
    color: "#1fb14e",
    rotateCb: getDefaultRotateCb(3),
    cells: [
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
    ],
  },
  // ++
  //  ++
  {
    color: "#ed1c28",
    rotateCb: getDefaultRotateCb(2),
    cells: [
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
    ],
  },
  // // +
  // // +++
  {
    color: "#4147c9",
    rotateCb: getDefaultRotateCb(2),
    cells: [
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
    ],
  },
  //   +
  // +++
  {
    color: "#ff7e26",
    rotateCb: getDefaultRotateCb(2),
    cells: [
      { x: 5, y: 0 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
    ],
  },

  // ++
  // ++
  {
    color: "#ffc80e",
    rotateCb: <C extends Coords>(cells: C[]) => cells as [C, C, C, C],
    cells: [
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
    ],
  },
  //  +
  // +++
  {
    color: "#a34aa3",
    rotateCb: getDefaultRotateCb(2),

    cells: [
      { x: 4, y: 0 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 },
    ],
  },
  // ++++
  {
    color: "#00a2e8",
    rotateCb: <C extends Coords>(cells: C[], rotateCount?: number) => {
      if (rotateCount === undefined) throw Error("Missing rotate count");

      let a: Array<(c: C) => C> = [];
      if (rotateCount === 0) {
        a = [
          (cell: C) => ({ ...cell, x: cell.x + 2, y: cell.y - 1 }),
          (cell: C) => ({ ...cell, x: cell.x + 1, y: cell.y }),
          (cell: C) => ({ ...cell, x: cell.x, y: cell.y + 1 }),
          (cell: C) => ({ ...cell, x: cell.x - 1, y: cell.y + 2 }),
        ];
      } else if (rotateCount === 1) {
        a = [
          (cell: C) => ({ ...cell, x: cell.x + 1, y: cell.y + 2 }),
          (cell: C) => ({ ...cell, x: cell.x, y: cell.y + 1 }),
          (cell: C) => ({ ...cell, x: cell.x - 1, y: cell.y }),
          (cell: C) => ({ ...cell, x: cell.x - 2, y: cell.y - 1 }),
        ];
      } else if (rotateCount === 2) {
        a = [
          (cell: C) => ({ ...cell, x: cell.x - 2, y: cell.y + 1 }),
          (cell: C) => ({ ...cell, x: cell.x - 1, y: cell.y }),
          (cell: C) => ({ ...cell, x: cell.x, y: cell.y - 1 }),
          (cell: C) => ({ ...cell, x: cell.x + 1, y: cell.y - 2 }),
        ];
      } else if (rotateCount === 3) {
        a = [
          (cell: C) => ({ ...cell, x: cell.x - 1, y: cell.y - 2 }),
          (cell: C) => ({ ...cell, x: cell.x, y: cell.y - 1 }),
          (cell: C) => ({ ...cell, x: cell.x + 1, y: cell.y }),
          (cell: C) => ({ ...cell, x: cell.x + 2, y: cell.y + 1 }),
        ];
      }
      return cells.map((c, i) => a[i](c)) as [C, C, C, C];
    },
    cells: [
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
    ],
  },
];
