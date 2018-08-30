const React = require('react');
import { BoardUI } from './UI/BoardUI';
import { Score } from './UI/Score';
import { Timer } from './UI/Timer';
import { Overlay } from './UI/Overlay';
import { GameState } from '../utils/constants';


const containerStyle = {
  display: 'flex',
  position: 'relative'
};

const timeScoreStyle = {
  padding: 60,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
};

export class Screen extends React.Component {
  render() {
    let value = null;

    if (this.props.gameState === GameState.STARTING) {
      value = this.props.countdown;
      if (this.props.countdown <= 0) {
        value = 'Go';
      }
    }

    if (this.props.gameState === GameState.ENDED) {
      value = <i onClick={this.props.restartGame} className='fas fa-redo-alt' />;
    }

    let overlay = null;

    if (value) {
      const item = (<span style={{
        color: 'white',
        fontFamily: 'arial',
        fontSize: '10em'
      }}>{ value }</span>);
      overlay = <Overlay content={ item } />;
    }

    return (
      <div>
        <div style={ containerStyle }>
          <div style={{ display: 'flex', flexBasis: '65%', justifyContent: 'flex-end' }}>
            <BoardUI
              grid={this.props.grid}
              currBlock={this.props.currBlock}
              currBlockLocation={this.props.currBlockLocation}
              linePosition={this.props.linePosition}
              queue={this.props.queue}
            />
          </div>
          <div style={{ display: 'flex', flexBasis: '35%', justifyContent: 'flex-start' }}>
            <div style={ timeScoreStyle }>
              <Timer timeLimit={this.props.timeLimit} />
              <Score score={this.props.score} />
            </div>
          </div>
          { overlay }
        </div>
      </div>
    );
  }
}
