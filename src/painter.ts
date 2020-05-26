import { Coord } from './game';
import Snake, { DirectionTypes } from './snake';

const GRID_SIZE = 25;

export default class Painter {

  size: number;
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(container: HTMLElement, size: number) {
    this.container = container;
    this.size = size;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;

    this.canvas.style.width = this.size * GRID_SIZE + 'px';
    this.canvas.style.height = this.size * GRID_SIZE + 'px';
    this.canvas.width = this.size * GRID_SIZE;
    this.canvas.height = this.size * GRID_SIZE;

    this.container.appendChild(this.canvas);
  }

  drawGrid() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const color = (x + y) % 2 === 0 ? 'rgb(171, 213, 90)' : 'rgb(163, 207, 83)';
        this.context.fillStyle = color;
        this.context.beginPath();
        this.context.rect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        this.context.closePath();
        this.context.fill();
      }
    }
  }

  drawApple(apple: Coord) {
    const [x, y] = this._convertCoord(apple);
    this.context.save();
    this.context.shadowColor = 'rgba(50, 50, 50, .2)';
    this.context.shadowBlur = 10;
    this.context.beginPath();
    this.context.arc(x, y, 8, 0, Math.PI * 2);
    this.context.fillStyle = '#f5222d';
    this.context.fill();
    this.context.restore();
  }

  drawSnake(snake: Snake) {
    const { segments, head, direction } = snake;

    // draw body
    const bodyPath = new Path2D();
    segments.forEach((coord, index) => {
      const [x, y] = this._convertCoord(coord);
      if (index === 0) {
        bodyPath.moveTo(x, y);
      } else {
        bodyPath.lineTo(x, y);
      }
    });

    this.context.save();
    this.context.shadowColor = 'rgba(50, 50, 50, .2)';
    this.context.shadowBlur = 10;
    this.context.lineCap = 'round';
    this.context.lineJoin = 'round';
    this.context.lineWidth = GRID_SIZE * 0.8;
    this.context.strokeStyle = '#40a9ff';
    this.context.stroke(bodyPath);
    this.context.restore();

    // draw eyes
    const [x, y] = this._convertCoord(head);
    const socketOffset = { x: 0, y: 0 };
    const eyeOffset = { x: 0 ,y: 0 };
    switch (direction) {
      case DirectionTypes.UP:
        socketOffset.x = 7;
        eyeOffset.y = -2;
        break;
      case DirectionTypes.DOWN:
        socketOffset.x = 7;
        eyeOffset.y = 2;
        break;
      case DirectionTypes.LEFT:
        socketOffset.y = 7;
        eyeOffset.x = -2;
        break;
      case DirectionTypes.RIGHT:
        socketOffset.y = 7;
        eyeOffset.x = 2;
        break;
    }

    this.context.save();
    this.context.beginPath();
    this.context.arc(x - socketOffset.x, y - socketOffset.y, 5, 0, Math.PI * 2);
    this.context.closePath();
    this.context.arc(x + socketOffset.x, y + socketOffset.y, 5, 0, Math.PI * 2);
    this.context.closePath();
    this.context.lineWidth = 4;
    this.context.strokeStyle = '#40a9ff';
    this.context.fillStyle = '#fff';
    this.context.stroke();
    this.context.fill();

    this.context.beginPath();
    this.context.arc(x - socketOffset.x + eyeOffset.x, y - socketOffset.y + eyeOffset.y, 3, 0, Math.PI * 2);
    this.context.closePath();
    this.context.arc(x + socketOffset.x + eyeOffset.x, y + socketOffset.y + eyeOffset.y, 3, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fillStyle = '#000';
    this.context.fill();
    this.context.restore();

  }

  drawGameOver() {
    this.context.font = 'bold 48px YaHei';
    this.context.fillStyle = 'red';
    const size = this.context.measureText('GAME OVER');
    this.context.fillText(
      'GAME OVER',
      (this.canvas.width - size.width) / 2,
      (this.canvas.height - 48) / 2,
    );
  }

  private _convertCoord = (coord: Coord) => {
    return [coord.x * GRID_SIZE + GRID_SIZE / 2, coord.y * GRID_SIZE + GRID_SIZE / 2];
  }
}