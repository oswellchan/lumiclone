const React = require('react');


export class Timer extends React.Component {
  render() {
    return (
      <div>
        <div style={{
          fontFamily: 'helvetica',
          fontSize: 40,
          color: 'white'
        }}>
          Time
        </div>
        <span style={{
          fontFamily: 'helvetica',
          fontSize: 100,
          color: 'white'
        }}>
          {this.props.timeLimit}
        </span>
      </div>
    );
  }
}
