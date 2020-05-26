import { Coord } from './game';

export enum DirectionTypes {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export default class Snake {
  readonly size: number;
  segments: Coord[];

  direction: DirectionTypes;

  get head() {
    return this.segments[0];
  }

  constructor(size: number, segments: Coord[], direction: DirectionTypes) {
    this.size = size;
    this.segments = segments;
    this.direction = direction;
  }

  turnUpward() {
    if ([DirectionTypes.UP, DirectionTypes.DOWN].includes(this.direction)) return;
    this.direction = DirectionTypes.UP;
  }

  turnDownward() {
    if ([DirectionTypes.UP, DirectionTypes.DOWN].includes(this.direction)) return;
    this.direction = DirectionTypes.DOWN;
  }

  turnLeft() {
    if ([DirectionTypes.LEFT, DirectionTypes.RIGHT].includes(this.direction)) return;
    this.direction = DirectionTypes.LEFT;
  }

  turnRight() {
    if ([DirectionTypes.LEFT, DirectionTypes.RIGHT].includes(this.direction)) return;
    this.direction = DirectionTypes.RIGHT;
  }

  update(appleCoord: Coord) {
    const { head, direction, segments } = this;

    let { x, y } = head;

    switch (direction) {
      case DirectionTypes.UP:
        y -= 1;
        break;
      case DirectionTypes.DOWN:
        y += 1;
        break;
      case DirectionTypes.LEFT:
        x -= 1;
        break;
      case DirectionTypes.RIGHT:
        x += 1;
        break;
    }

    if (x < 0 || x >= this.size) return true;
    if (y < 0 || y >= this.size) return true;

    if (!(appleCoord.x === x && appleCoord.y === y)) {
      this.segments.pop();
    }

    if (segments.some(coord => coord.x === x && coord.y === y)) return true;
    this.segments.unshift({ x, y });

    if (this.segments.length === this.size ** 2) return true;

    return false;
  }
}