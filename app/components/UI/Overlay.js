const React = require('react');


const overlayStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center'
};

const innerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

export class Overlay extends React.Component {
  render() {
    return (
      <div style={ overlayStyle }>
      	<div style={ innerStyle }>
        	{ this.props.content }
        </div>
      </div>
    );
  }
}
