const React = require('react');

export class Engine extends React.Component {
  constructor(props) {
    super(props);
    this.userHasInteracted = false;
  }

  componentDidMount() {
    this.blockDropID = setInterval(
      () => this.blockDrop(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.blockDropID);
  }

  blockDrop() {
    if (this.userHasInteracted) {
      this.userHasInteracted = false;
      return;
    }

    this.props.currBlockLocation.y += 1;
    this.resolveCollision();
    this.props.updateGrid(this.props.grid);
  }

  resolveCollision() {

  }

  render() {
    return null;
  }
}
