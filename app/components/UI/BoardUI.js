const React = require('react');
import { BlockTypeEnum } from '../../utils/constants';
import { Orange, OffWhite } from './constants';

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

export class BoardUI extends React.Component {
  generateCellStyle(block) {
    if (block.type === BlockTypeEnum.NONE) {
      return cellStyle;
    }
    let style = Object.assign({}, cellStyle);
    style.border = '1px solid black';
    if (block.type === BlockTypeEnum.T1) {
      style.backgroundColor = Orange;
    }
    if (block.type === BlockTypeEnum.T2) {
      style.backgroundColor = OffWhite;
    }
    return style;
  }

  render() {
    const loc = this.props.currBlockLocation;
    const table = [];

    for (let y = 0; y < this.props.grid.getHeight(); y += 1) {
      const row = [];
      for (let x = 0; x < this.props.grid.getLength(); x += 1) {
        const style = this.generateCellStyle(this.props.grid.getValue(x, y));
        row.push(<th key={x} style={ style } />);
      }
      table.push(row);
    }

    for (let y = 0; y < this.props.currBlock.getHeight(); y += 1) {
      for (let x = 0; x < this.props.currBlock.getLength(); x += 1) {
        const style = this.generateCellStyle(this.props.currBlock.getValue(x, y));
        table[loc.y + y][loc.x + x] = <th key={loc.x + x} style={ style } />;
      }
    }

    for (let y = 0; y < this.props.grid.getHeight(); y += 1) {
      table[y] = <tr key={y}>{table[y]}</tr>;
    }

    return <table style={ tableStyle }><tbody>{table}</tbody></table>;
  }
}
