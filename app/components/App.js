const React = require('react');
import { Game } from './Game';

export class App extends React.Component {
  render() {
    return <Game row={10} col={16} />;
  }
}
