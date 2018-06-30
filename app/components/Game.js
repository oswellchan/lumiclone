const React = require('react');
import { CompositeBlock } from '../structs/CompositeBlock';
import { Board } from '../structs/Board';
import { Queue } from '../structs/Queue';
import { Engine } from './Engine';
import { Screen } from './Screen';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    let nextBlocks = new Queue();
    for (let i = 0; i < 3; i += 1) {
      nextBlocks.enqueue(new CompositeBlock(2, 2));
    }

    this.state = {
      grid: new Board(this.props.width, this.props.height),
      currBlock: new CompositeBlock(2, 2),
      nextBlocks: nextBlocks,
      currBlockLocation: this.generateBlockStartingPos()
    };

    this.handleGridUpdate = this.handleGridUpdate.bind(this);
  }

  generateBlockStartingPos() {
    return {
      x: Math.floor(this.props.col / 2) - 1,
      y: 0
    };
  }

  handleGridUpdate(grid) {
    this.setState({
      grid: grid
    });
  }

  render() {
    return (
      <div>
        <Engine
          grid={this.state.grid}
          currBlock={this.state.currBlock}
          currBlockLocation={this.state.currBlockLocation}
          updateGrid={this.handleGridUpdate} />
        <Screen grid={this.state.grid} />
      </div>
    );
  }
}
