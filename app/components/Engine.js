const React = require('react');
import { Instructions } from '../utils/constants';
import { now } from '../utils/utils';
import { Controls } from './Controls';

export class Engine extends React.Component {
  constructor(props) {
    super(props);
    this.newBlockTs = null;
    this.handleInstructionsUpdate = this.handleInstructionsUpdate.bind(this);
    this.startNewDropTimer = this.startNewDropTimer.bind(this);
  }

  componentDidMount() {
    this.startNewDropTimer();
  }

  componentWillUnmount() {
    clearInterval(this.blockDropID);
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
      grid.addBlock(loc.x, block);
      this.props.updateQueue();
      this.newBlockTs = now();
      this.startNewDropTimer();
    }
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

  render() {
    return <Controls updateInstructions={this.handleInstructionsUpdate} />;
  }
}
