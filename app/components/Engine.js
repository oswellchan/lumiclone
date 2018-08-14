const React = require('react');
import { Instructions } from '../utils/constants';
import { now } from '../utils/utils';
import { Controls } from './Controls';

const FRAME_RATE = 60; // frame per sec
const LINE_SPEED = 4; // blocks per sec

export class Engine extends React.Component {
  constructor(props) {
    super(props);
    this.newBlockTs = null;
    this.hasActive = false;
    this.lastLinePos = null;
    this.handleInstructionsUpdate = this.handleInstructionsUpdate.bind(this);
  }

  componentDidMount() {
    this.startNewDropTimer();
    this.startLineTimer();
  }

  componentWillUnmount() {
    clearInterval(this.blockDropID);
    clearInterval(this.lineID);
  }

  blockDrop() {
    this.props.currBlockLocation.y += 1;
    this.resolveCollision();
    this.props.updateGrid(this.props.grid);
  }

  resolveCollision() {
    const grid = this.props.grid;
    const block = this.props.currBlock;
    const loc = this.props.currBlockLocation;

    if (grid.isOverlap(loc.x, loc.y, block)) {
      if (loc.y !== 0) {
        grid.addBlock(loc.x, block);
      }

      this.props.updateQueue();
      this.newBlockTs = now();
      this.startNewDropTimer();
    }
  }

  clearLine() {
    let position = this.props.linePosition;
    position += LINE_SPEED / FRAME_RATE;
    if (position >= this.props.grid.getLength()) {
      position = 0;
    }

    let count = 0;
    const nextLinePos = position - 0.05 < 0 ? 0 : Math.floor(position - 0.05);

    if (nextLinePos !== this.lastLinePos) {
      let grid = this.props.grid;
      this.lastLinePos = nextLinePos;
      const has_active = grid.setColInactive(nextLinePos);

      if ((!has_active && this.hasActive)) {
        count = grid.clearBlocksUpTo(nextLinePos - 1);
        this.props.updateGrid(this.props.grid);
      }
      this.hasActive = has_active;
    }

    this.props.updateLinePosition(position, count);
  }

  handleInstructionsUpdate(instruction) {
    if (this.newBlockTs && now() - this.newBlockTs < 200) {
      return;
    }

    const grid = this.props.grid;
    const block = this.props.currBlock;
    const loc = this.props.currBlockLocation;

    if (instruction === Instructions.LEFT) {
      if (loc.x > 0) {
        loc.x -= 1;
      }
    } else if (instruction === Instructions.RIGHT) {
      if (loc.x + block.getLength() < grid.getLength()) {
        loc.x += 1;
      }
    }
    if (instruction === Instructions.DOWN) {
      loc.y += 1;
    }
    if (instruction === Instructions.ROTATE_L) {
      block.rotateLeft();
    }
    if (instruction === Instructions.ROTATE_R) {
      block.rotateRight();
    }
    this.resolveCollision();
    this.props.updateGrid(this.props.grid);
  }

  startNewDropTimer() {
    if (this.blockDropID !== null) {
      clearInterval(this.blockDropID);
    }
    this.blockDropID = setInterval(
      () => this.blockDrop(),
      3000
    );
  }

  startLineTimer() {
    this.lineID = setInterval(
      () => this.clearLine(),
      1000 / FRAME_RATE
    );
  }

  render() {
    return <Controls updateInstructions={this.handleInstructionsUpdate} />;
  }
}
