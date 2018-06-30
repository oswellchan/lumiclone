const React = require('react');
import { Game } from './Game';

export class App extends React.Component {
  render() {
    return <Game width={16} height={10} />;
  }
}
