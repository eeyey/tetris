import Tetra from "../common/Tetra";

import { randomInteger } from "../utils";

import { tetras } from "../Tetras";

export default class TetraGenerator {
  range: [number, number];

  _currentTetra: number;
  _nextTetra: number;

  get nextTetra() {
    return new Tetra(tetras[this._nextTetra]);
  }

  constructor(from: number, to: number) {
    this.range = [from, to];
    this._nextTetra = randomInteger(...this.range);
  }

  getTetra() {
    let id = randomInteger(...this.range);

    this._currentTetra = this._nextTetra;

    while (id === this._currentTetra) id = randomInteger(...this.range);

    this._nextTetra = id;

    return new Tetra(tetras[this._currentTetra]);
  }
}
