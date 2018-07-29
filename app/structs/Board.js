import { CompositeBlock } from './CompositeBlock';
import { BlockTypeEnum, BlockStateEnum } from '../utils/constants';

export class Board extends CompositeBlock {
  constructor(length, height) {
    super(length, height);
  }

  isOverlap(x, y, block) {
    if (x < 0 || x >= this.getLength()) {
      throw new Error('Array out of bounds');
    }

    // block exceeds the bottom of board
    if (y + block.getHeight() > this.getHeight()) {
      return true;
    }

    for (let i = 0; i < block.getLength(); i += 1) {
      for (let j = block.getHeight() - 1; j >= 0; j -= 1) {
        if (this.getValue(x + i, y + j).type !== BlockTypeEnum.NONE) {
          return true;
        }
      }
    }
    return false;
  }

  addBlock(x, block) {
    if (x < 0 || x >= this.getLength()) {
      throw new Error(`Array out of bounds: ${x}`);
    }

    for (let i = 0; i < block.getLength(); i += 1) {
      for (let j = block.getHeight() - 1; j >= 0; j -= 1) {
        for (let k = this.getHeight() - 1; k >= 0; k -= 1) {
          if (this.getValue(x + i, k).type === BlockTypeEnum.NONE) {
            this.setBlockAt(x + i, k, block.getValue(i, j));
            break;
          }
        }
      }
    }

    // reset all block counts
    this.resetAllBlocks();
    this.resolveBlocks(this.getLength() - 2, this.getHeight() - 1, BlockTypeEnum.T1);
    this.resolveBlocks(this.getLength() - 2, this.getHeight() - 1, BlockTypeEnum.T2);
  }

  resetAllBlocks() {
    for (let y = 0; y < this.getHeight(); y += 1) {
      for (let x = 0; x < this.getLength(); x += 1) {
        this.setBlockAt(x, y, { state: BlockStateEnum.NORMAL, count: 0 });
      }
    }
  }

  resolveBlocks(start_x, start_y, t) {
    let x = start_x;
    let y = start_y;
    let count = 0;

    while (x >= 0) {
      // start next col
      if (this.getValue(x, y).type === BlockTypeEnum.NONE) {
        x -= 1;
        y = this.getHeight() - 1;
        continue;
      }

      if (this.has2x2BlockPattern(x, y, t)) {
        count += 1;
        let tl = this.getValue(x, y).count;
        let tr = this.getValue(x + 1, y).count;
        let bl = this.getValue(x, y + 1).count;
        let br = this.getValue(x + 1, y + 1).count;

        if (tr && !tl && !bl && !br) {
          this.setBlockAt(x + 1, y, { state: BlockStateEnum.ACTIVE, count });
        }

        if (!tl) { this.setBlockAt(x, y, { state: BlockStateEnum.ACTIVE, count }); }
        if (!tr) { this.setBlockAt(x + 1, y, { state: BlockStateEnum.ACTIVE, count }); }
        if (!bl) { this.setBlockAt(x, y + 1, { state: BlockStateEnum.ACTIVE, count }); }
        if (!br) { this.setBlockAt(x + 1, y + 1, { state: BlockStateEnum.ACTIVE, count }); }
      }

      y -= 1;

      if (y < 0) {
        x -= 1;
        y = this.getHeight() - 1;
      }
    }
  }

  /**
   * Search pattern: X denotes starting pt
   * X#
   * ##
   *
   * @param {number}        x  X coordinate to start the search
   * @param {number}        y  Y coordinate to start the search
   * @param {BlockTypeEnum} t  Type of block
   *
   * @return {boolean} true if found, false otherwise
   */
  has2x2BlockPattern(x, y, t) {
    try {
      return (
        this.getValue(x, y).type === t &&
        this.getValue(x + 1, y).type === t &&
        this.getValue(x, y + 1).type === t &&
        this.getValue(x + 1, y + 1).type === t
      );
    } catch (err) {
      return false;
    }
  }
}
