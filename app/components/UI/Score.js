const React = require('react');


export class Score extends React.Component {
  render() {
    return (
      <div>
        <div style={{
          fontFamily: 'helvetica',
          fontSize: 40,
          color: 'white'
        }}>
          Score
        </div>
        <span style={{
          fontFamily: 'helvetica',
          fontSize: 100,
          color: 'white'
        }}>
          {this.props.score}
        </span>
      </div>
    );
  }
}
