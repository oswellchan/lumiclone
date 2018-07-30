const React = require('react');
import { BoardUI } from './UI/BoardUI';

const container_style = {
  display: 'flex',
  justifyContent: 'center'
};

export class Screen extends React.Component {
  render() {
    return (
      <div style={ container_style }>
        <BoardUI
          grid={this.props.grid}
          currBlock={this.props.currBlock}
          currBlockLocation={this.props.currBlockLocation}
          linePosition={this.props.linePosition}
        />
      </div>
    );
  }
}
