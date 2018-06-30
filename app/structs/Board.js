import { CompositeBlock } from './CompositeBlock';
import { BlockTypeEnum } from './Constants';

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
  }
}
