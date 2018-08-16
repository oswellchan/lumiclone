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
        try {
          if (this.getValue(x + i, y + j).type !== BlockTypeEnum.NONE) {
            return true;
          }
        } catch (err) {
          return false;
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
            if (k < 0) {
              continue;
            }

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
        if (this.getValue(x, y).state !== BlockStateEnum.INACTIVE) {
          this.setBlockAt(x, y, { state: BlockStateEnum.NORMAL, count: 0 });
        } else {
          this.setBlockAt(x, y, { count: 0 });
        }
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
        let tl = this.getValue(x, y);
        let tr = this.getValue(x + 1, y);
        let bl = this.getValue(x, y + 1);
        let br = this.getValue(x + 1, y + 1);

        if (tr.count && !tl.count && !bl.count && !br.count) {
          let state = tr.state === BlockStateEnum.INACTIVE ? BlockStateEnum.INACTIVE : BlockStateEnum.ACTIVE;
          this.setBlockAt(x + 1, y, { state, count });
        }

        if (!tl.count) {
          let state = tl.state === BlockStateEnum.INACTIVE ? BlockStateEnum.INACTIVE : BlockStateEnum.ACTIVE;
          this.setBlockAt(x, y, { state, count });
        }
        if (!tr.count) {
          let state = tr.state === BlockStateEnum.INACTIVE ? BlockStateEnum.INACTIVE : BlockStateEnum.ACTIVE;
          this.setBlockAt(x + 1, y, { state, count });
        }
        if (!bl.count) {
          let state = bl.state === BlockStateEnum.INACTIVE ? BlockStateEnum.INACTIVE : BlockStateEnum.ACTIVE;
          this.setBlockAt(x, y + 1, { state, count });
        }
        if (!br.count) {
          let state = br.state === BlockStateEnum.INACTIVE ? BlockStateEnum.INACTIVE : BlockStateEnum.ACTIVE;
          this.setBlockAt(x + 1, y + 1, { state, count });
        }
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
      let tl = this.getValue(x, y);
      let tr = this.getValue(x + 1, y);
      let bl = this.getValue(x, y + 1);
      let br = this.getValue(x + 1, y + 1);

      if (tl.state === BlockStateEnum.ACTIVE) {
        return (
          tl.type === t && tl.state !== BlockStateEnum.INACTIVE &&
          tr.type === t && tr.state !== BlockStateEnum.INACTIVE &&
          bl.type === t && bl.state !== BlockStateEnum.INACTIVE &&
          br.type === t && br.state !== BlockStateEnum.INACTIVE
        );
      }

      return (
        tl.type === t &&
        tr.type === t &&
        bl.type === t &&
        br.type === t
      );
    } catch (err) {
      return false;
    }
  }

  setColInactive(x) {
    let has_active = false;
    for (let y = 0; y < this.getHeight(); y += 1) {
      let block = this.getValue(x, y);
      if (block.state === BlockStateEnum.ACTIVE) {
        this.setBlockAt(x, y, { state: BlockStateEnum.INACTIVE });
        has_active = true;
      }
    }
    return has_active;
  }

  clearBlocksUpTo(x) {
    if (x === 0) {
      return 0;
    }

    let max_count_t1 = null;
    let min_count_t1 = null;

    let max_count_t2 = null;
    let min_count_t2 = null;

    for (let i = 0; i <= x; i += 1) {
      for (let j = this.getHeight() - 1; j >= 0; j -= 1) {
        let block = this.getValue(i, j);
        if (block.state === BlockStateEnum.INACTIVE) {
          if (block.type === BlockTypeEnum.T1) {
            if (min_count_t1 === null || block.count < min_count_t1) {
              min_count_t1 = block.count;
            }

            if (max_count_t1 === null || block.count > max_count_t1) {
              max_count_t1 = block.count;
            }
          }

          if (block.type === BlockTypeEnum.T2) {
            if (min_count_t2 === null || block.count < min_count_t2) {
              min_count_t2 = block.count;
            }

            if (max_count_t2 === null || block.count > max_count_t2) {
              max_count_t2 = block.count;
            }
          }

          this.setBlockAt(i, j, {
            type: BlockTypeEnum.NONE,
            state: BlockStateEnum.NORMAL,
            count: 0
          });
        }
      }

      for (let j = this.getHeight() - 1; j >= 0; j -= 1) {
        let block = this.getValue(i, j);
        if (block.type === BlockTypeEnum.NONE) {
          let is_found = false;
          for (let k = j - 1; k >= 0; k -= 1) {
            let next_block = this.getValue(i, k);
            if (next_block.type !== BlockTypeEnum.NONE) {
              is_found = true;
              this.setBlockAt(i, j, next_block);
              this.setBlockAt(i, k, {
                type: BlockTypeEnum.NONE,
                state: BlockStateEnum.NORMAL,
                count: 0
              });
              break;
            }
          }

          if (!is_found) {
            break;
          }
        }
      }
    }

    // reset all block counts
    this.resetAllBlocks();
    this.resolveBlocks(this.getLength() - 2, this.getHeight() - 1, BlockTypeEnum.T1);
    this.resolveBlocks(this.getLength() - 2, this.getHeight() - 1, BlockTypeEnum.T2);

    const t1_count = max_count_t1 === null && min_count_t1 === null ? 0 : max_count_t1 - min_count_t1 + 1;
    const t2_count = max_count_t2 === null && min_count_t2 === null ? 0 : max_count_t2 - min_count_t2 + 1;

    return t1_count + t2_count;
  }
}
