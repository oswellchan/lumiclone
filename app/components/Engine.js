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
    const grid = this.props.grid;
    const block = this.props.currBlock;
    const loc = this.props.currBlockLocation;

    if (grid.isOverlap(loc.x, loc.y, block)) {
      grid.addBlock(loc.x, block);
      this.props.updateQueue();
    }
  }

  render() {
    return null;
  }
}
