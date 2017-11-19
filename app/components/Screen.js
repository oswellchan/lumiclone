const React = require('react');
import { BlockStateEnum, BlockTypeEnum } from './Game';

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
    let grid = this.props.grid;
    let table = grid.map((row, i) => {
      let trow = row.map((block, j) => {
        let style = this.generateCellStyle(block);
        return <th key={j} style={ style } />;
      });
      return <tr key={i}>{trow}</tr>;
    });
    return <table style={ tableStyle }><tbody>{table}</tbody></table>;
  }
}
