import { Color, DrawCallback } from "../types";

export default class Canvas {
  element = document.createElement("canvas");
  context = this.element.getContext("2d") as CanvasRenderingContext2D;

  background!: Color;

  constructor(background: Color) {
    this.background = background;

    window.onresize = this.resize.bind(this);
  }

  resize() {
    if (!this.element.parentElement) return;

    this.element.width = this.element.parentElement.offsetWidth;
    this.element.height = this.element.parentElement.offsetHeight;

    this.clear();
  }

  draw(callback: DrawCallback) {
    callback(this.context, this.element);
  }

  clear() {
    this.context.beginPath();
    this.context.fillStyle = this.background;
    this.context.rect(0, 0, this.element.width, this.element.height);
    this.context.fill();
  }

  get width() {
    return this.element.width;
  }

  get height() {
    return this.element.height;
  }
}
