const React = require('react');
import { BoardUI } from './UI/BoardUI';


const containerStyle = {
  display: 'flex',
  justifyContent: 'center'
};

export class Screen extends React.Component {
  render() {
    return (
      <div>
        <div style={ containerStyle }>
          <BoardUI
            grid={this.props.grid}
            currBlock={this.props.currBlock}
            currBlockLocation={this.props.currBlockLocation}
            linePosition={this.props.linePosition}
            queue={this.props.queue}
          />
        </div>
      </div>
    );
  }
}
