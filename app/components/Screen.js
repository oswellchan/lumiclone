const React = require('react');
import { BlockTypeEnum } from '../structs/Constants';

const tableStyle = {
  backgroundColor: 'black',
  borderCollapse: 'collapse',
  margin: 'auto'
};

const cellStyle = {
  border: '1px solid gray',
  width: 40,
  height: 40
};

const orange = '#eb512e';
const offWhite = '#e9e9e9';

export class Screen extends React.Component {
  generateCellStyle(block) {
    if (block.type === BlockTypeEnum.NONE) {
      return cellStyle;
    }
    let style = Object.assign({}, cellStyle);
    if (block.type === BlockTypeEnum.T1) {
      style.backgroundColor = orange;
    }
    if (block.type === BlockTypeEnum.T2) {
      style.backgroundColor = offWhite;
    }
    return style;
  }

  render() {
    const grid = this.props.grid.getGrid();
    console.log(grid);
    const table = [];
    for (let y = 0; y < grid[0].length; y += 1) {
      const row = [];
      for (let x = 0; x < grid.length; x += 1) {
        const style = this.generateCellStyle(grid[x][y]);
        row.push(<th key={x} style={ style } />);
      }
      table.push(<tr key={y}>{row}</tr>);
    }
    return <table style={ tableStyle }><tbody>{table}</tbody></table>;
  }
}
