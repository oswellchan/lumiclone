const React = require('react');
import { CompositeBlock } from '../structs/CompositeBlock';
import { Board } from '../structs/Board';
import { Queue } from '../structs/Queue';
import { BlockStateEnum, BlockTypeEnum } from '../utils/constants';
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
      currBlockLocation: this.generateBlockStartingPos(),
      instructions: null,
      linePosition: 0,
      currCount: 0,
      totalCount: 0,
      timeLimit: this.props.timeLimit
    };

    this.timerID = setInterval(
      () => this.setState({ timeLimit: this.state.timeLimit - 1 }),
      1000
    );

    this.handleGridUpdate = this.handleGridUpdate.bind(this);
    this.handleQueueUpdate = this.handleQueueUpdate.bind(this);
    this.handleLineUpdate = this.handleLineUpdate.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
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
      y: -2
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

  handleLineUpdate(position, count) {
    let currCount = this.state.currCount + count;
    let totalCount = this.state.totalCount;

    if (Math.floor(position) === 0) {
      totalCount += currCount;
      currCount = 0;
    }

    this.setState({
      linePosition: position,
      currCount: currCount,
      totalCount: totalCount
    });
  }

  render() {
    return (
      <div>
        <Engine
          grid={this.state.grid}
          currBlock={this.state.currBlock}
          currBlockLocation={this.state.currBlockLocation}
          linePosition={this.state.linePosition}
          timeLimit={this.state.timeLimit}
          updateGrid={this.handleGridUpdate}
          updateQueue={this.handleQueueUpdate}
          updateLinePosition={this.handleLineUpdate}/>
        <Screen
          grid={this.state.grid}
          currBlock={this.state.currBlock}
          currBlockLocation={this.state.currBlockLocation}
          queue={this.state.nextBlocks.toArray()}
          linePosition={this.state.linePosition}
          score={this.state.totalCount}
          timeLimit={this.state.timeLimit}/>
      </div>
    );
  }
}
