const React = require('react');
import { Game } from './Game';

export class App extends React.Component {
  render() {
    return <Game length={16} height={10} />;
  }
}
