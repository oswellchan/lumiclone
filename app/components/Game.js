const React = require('react');
import { CompositeBlock } from '../structs/CompositeBlock';
import { BlockStateEnum, BlockTypeEnum } from '../structs/Constants';
import { Board } from '../structs/Board';
import { Queue } from '../structs/Queue';
import { Engine } from './Engine';
import { Screen } from './Screen';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    let nextBlocks = new Queue();
    for (let i = 0; i < 3; i += 1) {
      nextBlocks.enqueue(this.generateNextBlock());
    }

    this.state = {
      grid: new Board(this.props.length, this.props.height),
      currBlock: this.generateNextBlock(),
      nextBlocks: nextBlocks,
      currBlockLocation: this.generateBlockStartingPos()
    };

    this.handleGridUpdate = this.handleGridUpdate.bind(this);
    this.handleQueueUpdate = this.handleQueueUpdate.bind(this);
  }

  generateNextBlock() {
    let block = new CompositeBlock(2, 2);

    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < 2; j += 1) {
        let type = BlockTypeEnum.NONE;
        if (Math.random() <= 0.5) {
          type = BlockTypeEnum.T1;
        } else {
          type = BlockTypeEnum.T2;
        }
        block.setBlockAt(i, j, { type: type, state: BlockStateEnum.NORMAL });
      }
    }
    return block;
  }

  generateBlockStartingPos() {
    return {
      x: Math.floor(this.props.length / 2) - 1,
      y: 0
    };
  }

  handleGridUpdate(grid) {
    this.setState({
      grid: grid
    });
  }

  handleQueueUpdate() {
    const currBlock = this.state.nextBlocks.dequeue();
    this.state.nextBlocks.enqueue(this.generateNextBlock());
    this.setState({
      currBlock,
      currBlockLocation: this.generateBlockStartingPos()
    });
  }

  render() {
    return (
      <div>
        <Engine
          grid={this.state.grid}
          currBlock={this.state.currBlock}
          currBlockLocation={this.state.currBlockLocation}
          updateGrid={this.handleGridUpdate}
          updateQueue={this.handleQueueUpdate} />
        <Screen
          grid={this.state.grid}
          currBlock={this.state.currBlock}
          currBlockLocation={this.state.currBlockLocation}
          queue={this.state.queue} />
      </div>
    );
  }
}
