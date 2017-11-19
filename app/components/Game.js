const React = require('react');
import { Engine } from './Engine';
import { Screen } from './Screen';

export const BlockStateEnum = {
  NORMAL: 0,
  ACTIVE: 1,
  INACTIVE: 2
};

export const BlockTypeEnum = {
  NONE: 0,
  T1: 1,
  T2: 2
};

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.generateEmptyGrid(this.props.row, this.props.col)
    };
  }

  generateEmptyGrid(row, col) {
    let grid = [];
    for (let i = 0; i < row; i += 1) {
      let tempRow = [];
      for (let j = 0; j < col; j += 1) {
        tempRow.push({
          type: BlockTypeEnum.NONE,
          state: BlockStateEnum.NORMAL
        });
      }
      grid.push(tempRow);
    }
    return grid;
  }

  render() {
    return (
      <div>
        <Engine grid={this.state.grid} />
        <Screen grid={this.state.grid} />
      </div>
    );
  }
}
