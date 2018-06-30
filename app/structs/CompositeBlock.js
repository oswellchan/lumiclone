import { BlockStateEnum, BlockTypeEnum } from './Constants';

export class CompositeBlock {
  constructor(length, height) {
    this.grid = [];
    for (let i = 0; i < length; i += 1) {
      let tempRow = [];
      for (let j = 0; j < height; j += 1) {
        tempRow.push({
          type: BlockTypeEnum.NONE,
          state: BlockStateEnum.NORMAL
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

  setBlockAt(x, y, { type = null, state = null }) {
    if (x < 0 || x >= this.grid.length) {
      throw new Error('Array out of bounds');
    }

    if (y < 0 || y >= this.grid[0].length) {
      throw new Error('Array out of bounds');
    }

    if (type !== null) {
      this.grid[x][y].type = type;
    }

    if (state !== null) {
      this.grid[x][y].state = state;
    }
  }
}
