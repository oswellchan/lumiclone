const React = require('react');
import { BoardUI } from './UI/BoardUI';

export class Screen extends React.Component {
  render() {
    return (
      <BoardUI
        grid={this.props.grid}
        currBlock={this.props.currBlock}
        currBlockLocation={this.props.currBlockLocation}
      />
    );
  }
}
