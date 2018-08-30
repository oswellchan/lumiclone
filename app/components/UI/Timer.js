const React = require('react');


export class Timer extends React.Component {
  render() {
    return (
      <div>
        <div style={{
          fontFamily: 'arial',
          fontSize: 40,
          color: 'white'
        }}>
          Time
        </div>
        <span style={{
          fontFamily: 'arial',
          fontSize: 100,
          color: 'white'
        }}>
          {this.props.timeLimit}
        </span>
      </div>
    );
  }
}
