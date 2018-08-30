const React = require('react');
import { Game } from './Game';

export class App extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: 'black' }}>
        <Game length={16} height={10} timeLimit={60} />
      </div>
    );
  }
}
