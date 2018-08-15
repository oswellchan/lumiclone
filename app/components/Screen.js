const React = require('react');
import { BoardUI } from './UI/BoardUI';
import { Score } from './UI/Score';
import { Timer } from './UI/Timer';


const containerStyle = {
  display: 'flex',
  justifyContent: 'center'
};

const timeScoreStyle = {
  padding: 60,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
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
          <div style={ timeScoreStyle }>
            <Timer timeLimit={this.props.timeLimit} />
            <Score score={this.props.score} />
          </div>
        </div>
      </div>
    );
  }
}
