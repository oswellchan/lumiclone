const React = require('react');
import { BlockTypeEnum, BlockStateEnum } from '../../utils/constants';
import { Orange, DarkOrange, OffWhite, DarkOffWhite } from './constants';

const tableStyle = {
  backgroundColor: 'black',
  borderCollapse: 'collapse',
  margin: 'auto'
};

const containerStyle = {
  display: 'inline-flex'
};

const cellStyle = {
  border: '2px solid gray',
  width: '42px',
  height: '42px',
  boxSizing: 'border-box'
};

const inactiveStyle = {
  border: '2px solid gray',
  width: '42px',
  height: '42px',
  boxSizing: 'border-box'
};

const TOP_LEFT_STYLE = {
  borderLeft: '4px solid white',
  borderTop: '4px solid white',
  borderRight: '4px solid transparent',
  borderBottom: '4px solid transparent'
};

const TOP_RIGHT_STYLE = {
  borderLeft: '4px solid transparent',
  borderTop: '4px solid white',
  borderRight: '4px solid white',
  borderBottom: '4px solid transparent'
};

const BTM_LEFT_STYLE = {
  borderLeft: '4px solid white',
  borderTop: '4px solid transparent',
  borderRight: '4px solid transparent',
  borderBottom: '4px solid white'
};

const BTM_RIGHT_STYLE = {
  borderLeft: '4px solid transparent',
  borderTop: '4px solid transparent',
  borderRight: '4px solid white',
  borderBottom: '4px solid white'
};

const TOP_STYLE = {
  borderLeft: '4px solid white',
  borderTop: '4px solid white',
  borderRight: '4px solid white',
  borderBottom: '4px solid transparent'
};

const LEFT_STYLE = {
  borderLeft: '4px solid white',
  borderTop: '4px solid white',
  borderRight: '4px solid transparent',
  borderBottom: '4px solid white'
};

const RIGHT_STYLE = {
  borderLeft: '4px solid transparent',
  borderTop: '4px solid white',
  borderRight: '4px solid white',
  borderBottom: '4px solid white'
};

const BTM_STYLE = {
  borderLeft: '4px solid white',
  borderTop: '4px solid transparent',
  borderRight: '4px solid white',
  borderBottom: '4px solid white'
};

const SQUARE_STYLE = {
  borderLeft: '4px solid white',
  borderTop: '4px solid white',
  borderRight: '4px solid white',
  borderBottom: '4px solid white'
};

const TOP_LEFT_2X2 = ((1 << 2) - 1) << 7 | ((1 << 2) - 1) << 4; // 110110000
const TOP_RIGHT_2X2 = ((1 << 2) - 1) << 6 | ((1 << 2) - 1) << 3; // 011011000
const BTM_LEFT_2X2 = ((1 << 2) - 1) << 4 | ((1 << 2) - 1) << 1; // 000110110
const BTM_RIGHT_2X2 = ((1 << 2) - 1) << 3 | (1 << 2) - 1; // 000011011

const RIGHT_CORNER = ((1 << 2) - 1) << 7 | 1 << 4; // 110010000
const LEFT_CORNER = ((1 << 2) - 1) << 6 | 1 << 4; // 011010000

const LEFT_2X1 = ((1 << 2) - 1) << 4; // 000110000
const TOP_1X2 = 1 << 7 | 1 << 4; // 010010000
const RIGHT_2X1 = ((1 << 2) - 1) << 3; // 000011000
const BTM_1X2 = 1 << 4 | 1 << 1; // 000010010


export class BoardUI extends React.Component {
  generateCellStyle(block) {
    if (block.type === BlockTypeEnum.NONE) {
      return cellStyle;
    }

    if (block.state === BlockStateEnum.INACTIVE) {
      return cellStyle;
    }

    let style = Object.assign({}, cellStyle);
    style.border = '2px solid black';
    if (block.type === BlockTypeEnum.T1) {
      if (block.state === BlockStateEnum.NORMAL) {
        style.backgroundColor = Orange;
      } else if (block.state === BlockStateEnum.ACTIVE) {
        style.backgroundColor = DarkOrange;
      }
    }

    if (block.type === BlockTypeEnum.T2) {
      if (block.state === BlockStateEnum.NORMAL) {
        style.backgroundColor = OffWhite;
      } else if (block.state === BlockStateEnum.ACTIVE) {
        style.backgroundColor = DarkOffWhite;
      }
    }

    return style;
  }

  generateCell(key, style) {
    return <th key={ key } style={ style } />;
  }

  setGridStyle(x, y, table, has_set) {
    if (has_set[y][x]) { return; }

    const block = this.props.grid.getValue(x, y);
    let style = this.generateCellStyle(block);
    if (block.state === BlockStateEnum.NORMAL || !block.count) {
      has_set[y][x] = true;
      table[y][x] = this.generateCell(x, style);
      return;
    }

    const pattern = this.getPattern(x, y, block);

    switch (pattern) {
      case TOP_LEFT_2X2:
        this.setSquarePattern(x - 1, y - 1, table, has_set, style);
        break;
      case TOP_RIGHT_2X2:
        this.setSquarePattern(x, y - 1, table, has_set, style);
        break;
      case BTM_LEFT_2X2:
        this.setSquarePattern(x - 1, y, table, has_set, style);
        break;
      case BTM_RIGHT_2X2:
        this.setSquarePattern(x, y, table, has_set, style);
        break;
      case RIGHT_CORNER:
        has_set[y][x] = true;
        let btm_style = Object.assign({}, style, BTM_STYLE);
        delete btm_style.border;
        table[y][x] = this.generateCell(x, btm_style);

        has_set[y - 1][x] = true;
        let tr_style = Object.assign({}, style, TOP_RIGHT_STYLE);
        delete tr_style.border;
        table[y - 1][x] = this.generateCell(x, tr_style);

        has_set[y - 1][x - 1] = true;
        let l_style = Object.assign({}, style, LEFT_STYLE);
        delete l_style.border;
        table[y - 1][x - 1] = this.generateCell(x - 1, l_style);
        break;
      case LEFT_CORNER:
        has_set[y][x] = true;
        let btm_style1 = Object.assign({}, style, BTM_STYLE);
        delete btm_style1.border;
        table[y][x] = this.generateCell(x, btm_style1);

        has_set[y - 1][x] = true;
        let tl_style = Object.assign({}, style, TOP_LEFT_STYLE);
        delete tl_style.border;
        table[y - 1][x] = this.generateCell(x, tl_style);

        has_set[y - 1][x + 1] = true;
        let r_style = Object.assign({}, style, RIGHT_STYLE);
        delete r_style.border;
        table[y - 1][x + 1] = this.generateCell(x + 1, r_style);
        break;
      case LEFT_2X1:
        has_set[y][x] = true;
        let r_style1 = Object.assign({}, style, RIGHT_STYLE);
        delete r_style1.border;
        table[y][x] = this.generateCell(x, r_style1);

        has_set[y][x - 1] = true;
        let l_style1 = Object.assign({}, style, LEFT_STYLE);
        delete l_style1.border;
        table[y][x - 1] = this.generateCell(x - 1, l_style1);
        break;
      case TOP_1X2:
        has_set[y][x] = true;
        let btm_style2 = Object.assign({}, style, BTM_STYLE);
        delete btm_style2.border;
        table[y][x] = this.generateCell(x, btm_style2);

        has_set[y - 1][x] = true;
        let top_style = Object.assign({}, style, TOP_STYLE);
        delete top_style.border;
        table[y - 1][x] = this.generateCell(x, top_style);
        break;
      case RIGHT_2X1:
        has_set[y][x + 1] = true;
        let r_style2 = Object.assign({}, style, RIGHT_STYLE);
        delete r_style2.border;
        table[y][x + 1] = this.generateCell(x + 1, r_style2);

        has_set[y][x] = true;
        let l_style2 = Object.assign({}, style, LEFT_STYLE);
        delete l_style2.border;
        table[y][x] = this.generateCell(x, l_style2);
        break;
      case BTM_1X2 :
        has_set[y + 1][x] = true;
        let btm_style3 = Object.assign({}, style, BTM_STYLE);
        delete btm_style3.border;
        table[y + 1][x] = this.generateCell(x, btm_style3);

        has_set[y][x] = true;
        let top_style2 = Object.assign({}, style, TOP_STYLE);
        delete top_style2.border;
        table[y][x] = this.generateCell(x, top_style2);
        break;
      default:
        has_set[y][x] = true;
        let sq_style = Object.assign({}, style, SQUARE_STYLE);
        delete sq_style.border;
        table[y][x] = this.generateCell(x, sq_style);
    }
  }

  setSquarePattern(x, y, table, has_set, style) {
    has_set[y][x] = true;
    let tl_style = Object.assign({}, style, TOP_LEFT_STYLE);
    delete tl_style.border;
    table[y][x] = this.generateCell(x, tl_style);

    has_set[y][x + 1] = true;
    let tr_style = Object.assign({}, style, TOP_RIGHT_STYLE);
    delete tr_style.border;
    table[y][x + 1] = this.generateCell(x + 1, tr_style);

    has_set[y + 1][x] = true;
    let bl_style = Object.assign({}, style, BTM_LEFT_STYLE);
    delete bl_style.border;
    table[y + 1][x] = this.generateCell(x, bl_style);

    has_set[y + 1][x + 1] = true;
    let br_style = Object.assign({}, style, BTM_RIGHT_STYLE);
    delete br_style.border;
    table[y + 1][x + 1] = this.generateCell(x + 1, br_style);
  }

  // Returns bit array of blocks in 3x3 block around x,y
  getPattern(x, y, start_block) {
    if (!start_block.count) { return 0; }

    let pattern = 0;
    let idx = 9;

    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        idx -= 1;
        try {
          const block = this.props.grid.getValue(x + j, y + i);
          if (block.count === start_block.count && block.type === start_block.type) {
            pattern |= (1 << idx);
          }
        } catch (err) {
          continue;
        }
      }
    }
    return pattern;
  }

  render() {
    const loc = this.props.currBlockLocation;
    const table = [];
    const has_set = [];

    for (let i = 0; i < this.props.grid.getHeight(); i += 1) {
      let table_row = [];
      let has_set_row = [];
      for (let j = 0; j < this.props.grid.getLength(); j += 1) {
        table_row.push(null);
        has_set_row.push(false);
      }
      table.push(table_row);
      has_set.push(has_set_row);
    }

    // Draw grid
    for (let y = 0; y < this.props.grid.getHeight(); y += 1) {
      for (let x = 0; x < this.props.grid.getLength(); x += 1) {
        this.setGridStyle(x, y, table, has_set);
      }
    }

    // Draw dropping block
    for (let y = 0; y < this.props.currBlock.getHeight(); y += 1) {
      for (let x = 0; x < this.props.currBlock.getLength(); x += 1) {
        const style = this.generateCellStyle(this.props.currBlock.getValue(x, y));
        table[loc.y + y][loc.x + x] = this.generateCell(loc.x + x, style);
      }
    }

    for (let y = 0; y < this.props.grid.getHeight(); y += 1) {
      table[y] = <tr key={y}>{table[y]}</tr>;
    }

    const line_style = {
      borderLeft: '2px solid white',
      position: 'relative',
      top: '0px',
      left: `${this.props.linePosition / this.props.grid.getLength() * 100}%`,
      height: '100%',
      width: '2px'
    };

    return (
      <div style={ containerStyle }>
        <div style={ line_style } />
        <table style={ tableStyle }><tbody>{table}</tbody></table>
      </div>
    );
  }
}
