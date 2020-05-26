import Snake, { DirectionTypes } from './snake';
import Painter from './painter';

const GAME_GRID_SIZE = 21;

export interface Coord {
  x: number;
  y: number;
}

export default class Game {

  snake: Snake;
  painter: Painter;
  size: number;
  private _timer: any;
  private _apple: Coord = { x: 0, y: 0 };
  private _start = false;

  constructor(container: HTMLElement, size = GAME_GRID_SIZE) {
    this.size = size;

    const headCoord = { x: Math.floor(this.size / 2), y: Math.floor(this.size / 2) };
    this.snake = new Snake(this.size, [
      headCoord,
      { x: headCoord.x, y: headCoord.y + 1 },
      { x: headCoord.x, y: headCoord.y + 2 },
    ], DirectionTypes.UP);

    this.painter = new Painter(container, size);

    window.addEventListener('keydown', this._handleKeydown, false);

    this._placeApple();
    this._update();
  }

  private _placeApple = () => {
    const { segments } = this.snake;

    const coords = new Array(this.size ** 2)
      .fill(0)
      .map((_, index) => {
        return {
          x: index % this.size,
          y: Math.floor(index / this.size)
        }
      })
      .filter(coord => segments.every(({ x, y }) => coord.x !== x && coord.y !== y));

    if (coords.length === 0) return;
    const index = Math.floor(coords.length * Math.random());
    this._apple = coords[index];
  }

  private _update = () => {
    const gameOver = this.snake.update(this._apple);

    if (gameOver) {
      clearInterval(this._timer);
      this.painter.drawGameOver();
      return;
    }

    if (this._apple.x === this.snake.head.x && this._apple.y === this.snake.head.y) {
      this._placeApple();
    }

    this.painter.drawGrid();
    this.painter.drawApple(this._apple);
    this.painter.drawSnake(this.snake);
  }

  private _handleKeydown = (event: KeyboardEvent) => {
    if (!this._start) {
      this._timer = setInterval(this._update, 200);
      this._start = true;
    }

    switch (event.key) {
      case 'ArrowUp':
        this.snake.turnUpward();
        break;
      case 'ArrowDown':
        this.snake.turnDownward();
        break;
      case 'ArrowLeft':
        this.snake.turnLeft();
        break;
      case 'ArrowRight':
        this.snake.turnRight();
        break;
    }
  }
}