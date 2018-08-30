const React = require('react');
import { CompositeBlock } from '../structs/CompositeBlock';
import { Board } from '../structs/Board';
import { Queue } from '../structs/Queue';
import { BlockStateEnum, BlockTypeEnum, GameState } from '../utils/constants';
import { Engine } from './Engine';
import { Screen } from './Screen';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.startTimerID = null;
    this.gameTimerID = null;

    this.timeLimit = this.props.timeLimit;

    this.state = this.getNewGameState();
    this.startCountdownTimer();

    this.handleGridUpdate = this.handleGridUpdate.bind(this);
    this.handleQueueUpdate = this.handleQueueUpdate.bind(this);
    this.handleLineUpdate = this.handleLineUpdate.bind(this);
    this.handleRestartGame = this.handleRestartGame.bind(this);
  }

  componentWillUnmount() {
    this.removeGameTimer();
    this.removeCountdownTimer();
  }

  getNewGameState() {
    let nextBlocks = new Queue();
    for (let i = 0; i < 3; i += 1) {
      nextBlocks.enqueue(this.generateNextBlock());
    }

    return {
      grid: new Board(this.props.length, this.props.height),
      currBlock: this.generateNextBlock(),
      nextBlocks: nextBlocks,
      currBlockLocation: this.generateBlockStartingPos(),
      instructions: null,
      linePosition: 0,
      currCount: 0,
      totalCount: 0,
      currTime: this.timeLimit,
      startCountdownTime: 3
    };
  }

  startCountdownTimer() {
    this.startTimerID = setInterval(
      () => this.setState({ startCountdownTime: this.state.startCountdownTime - 1 }),
      1000
    );
  }

  removeCountdownTimer() {
    if (this.startTimerID !== null) {
      clearInterval(this.startTimerID);
      this.startTimerID = null;
    }
  }

  startGameTimer() {
    if (this.gameTimerID === null) {
      this.gameTimerID = setInterval(
        () => this.setState({ currTime: this.state.currTime - 1 }),
        1000
      );
    }
  }

  removeGameTimer() {
    if (this.gameTimerID !== null) {
      clearInterval(this.gameTimerID);
      this.gameTimerID = null;
    }
  }

  handleRestartGame() {
    this.removeGameTimer();
    this.removeCountdownTimer();

    this.setState(this.getNewGameState());
    this.startCountdownTimer();
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
    let game_state = null;
    let engine = null;
    let currentTime = this.state.currTime;

    if (this.state.startCountdownTime >= 0) {
      game_state = GameState.STARTING;
    } else if (currentTime >= 0) {
      this.startGameTimer();
      game_state = GameState.IN_PROGRESS;
      engine = (
        <Engine
          grid={this.state.grid}
          currBlock={this.state.currBlock}
          currBlockLocation={this.state.currBlockLocation}
          linePosition={this.state.linePosition}
          timeLimit={this.state.currTime}
          updateGrid={this.handleGridUpdate}
          updateQueue={this.handleQueueUpdate}
          updateLinePosition={this.handleLineUpdate}/>
      );
    } else {
      game_state = GameState.ENDED;
      currentTime = 0;
      this.removeGameTimer();
    }

    return (
      <div>
        {engine}
        <Screen
          grid={this.state.grid}
          currBlock={this.state.currBlock}
          currBlockLocation={this.state.currBlockLocation}
          queue={this.state.nextBlocks.toArray()}
          linePosition={this.state.linePosition}
          score={this.state.totalCount}
          timeLimit={currentTime}
          countdown={this.state.startCountdownTime}
          gameState={game_state}
          restartGame={this.handleRestartGame}/>
      </div>
    );
  }
}
