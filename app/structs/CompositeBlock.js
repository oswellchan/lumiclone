import { BlockStateEnum, BlockTypeEnum } from '../utils/constants';
import { rotateMatrix, rotateMatrixCounterClockwise } from '../utils/utils';

export class CompositeBlock {
  constructor(length, height) {
    this.grid = [];
    for (let i = 0; i < length; i += 1) {
      let tempRow = [];
      for (let j = 0; j < height; j += 1) {
        tempRow.push({
          type: BlockTypeEnum.NONE,
          state: BlockStateEnum.NORMAL,
          count: null
        });
      }
      this.grid.push(tempRow);
    }

    this.getLength = this.getLength.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getGrid = this.getGrid.bind(this);
    this.getLength = this.getLength.bind(this);
  }

  getLength() {
    return this.grid.length;
  }

  getHeight() {
    return this.grid[0].length;
  }

  getGrid() {
    return this.grid;
  }

  getValue(x, y) {
    if (x < 0 || x >= this.grid.length) {
      throw new Error('Array out of bounds');
    }

    if (y < 0 || y >= this.grid[0].length) {
      throw new Error('Array out of bounds');
    }

    return this.grid[x][y];
  }

  setBlockAt(x, y, { type = null, state = null, count = null }) {
    if (x < 0 || x >= this.grid.length) {
      throw new Error(`Array out of bounds: ${x}, ${y}`);
    }

    if (y < 0 || y >= this.grid[0].length) {
      throw new Error(`Array out of bounds: ${x}, ${y}`);
    }

    if (type !== null) {
      this.grid[x][y].type = type;
    }

    if (state !== null) {
      this.grid[x][y].state = state;
    }

    if (state !== null) {
      this.grid[x][y].count = count;
    }
  }

  rotateRight() {
    this.grid = rotateMatrixCounterClockwise(this.grid);
  }

  rotateLeft() {
    this.grid = rotateMatrix(this.grid);
  }
}
