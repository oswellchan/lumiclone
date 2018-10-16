const React = require('react');
import { Instructions } from '../utils/constants';
import { now } from '../utils/utils';

export class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.keyMapping = {
      LEFT: 'a',
      RIGHT: 'd',
      DOWN: 's',
      ROTATE_L: 'l',
      ROTATE_R: 'k'
    };
    this.updateID = null;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    document.addEventListener('keyup', this.handleKeyUp, false);
    this.updateID = setInterval(
      () => this.sendInstruction(),
      1000 / 100
    );
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
    document.removeEventListener('keyup', this.handleKeyUp, false);
    clearInterval(this.updateID);
  }

  sendInstruction() {
    if (this.currInstruction === null) {
      return;
    }

    let time_limit = 150;
    if (this.currInstruction === Instructions.DOWN) {
      time_limit = 0;
    }

    if (!this.lastTime || now() - this.lastTime < time_limit) {
      return;
    }

    this.props.updateInstructions(this.currInstruction);
  }

  handleKeyDown(event) {
    let instruction = null;
    const key = event.key.toLowerCase();
    if (key === this.keyMapping.LEFT) {
      instruction = Instructions.LEFT;
    }
    if (key === this.keyMapping.RIGHT) {
      instruction = Instructions.RIGHT;
    }
    if (key === this.keyMapping.DOWN) {
      instruction = Instructions.DOWN;
    }
    if (key === this.keyMapping.ROTATE_L) {
      instruction = Instructions.ROTATE_L;
    }
    if (key === this.keyMapping.ROTATE_R) {
      instruction = Instructions.ROTATE_R;
    }

    if (instruction === null) {
      return;
    }

    if (instruction !== this.currInstruction) {
      this.lastTime = now();
      this.currInstruction = instruction;
      this.props.updateInstructions(this.currInstruction);
    }
  }

  handleKeyUp(event) {
    const key = event.key.toLowerCase();
    if (
      key === this.keyMapping.LEFT ||
      key === this.keyMapping.RIGHT ||
      key === this.keyMapping.DOWN ||
      key === this.keyMapping.ROTATE_L ||
      key === this.keyMapping.ROTATE_R
    ) {
      this.lastTime = null;
      this.currInstruction = null;
    }
  }

  render() {
    return null;
  }
}
