const React = require('react');


export class Score extends React.Component {
  render() {
    return (
      <div>
        <div style={{
          fontFamily: 'arial',
          fontSize: 40,
          color: 'white'
        }}>
          Score
        </div>
        <span style={{
          fontFamily: 'arial',
          fontSize: 100,
          color: 'white'
        }}>
          {this.props.score}
        </span>
      </div>
    );
  }
}
