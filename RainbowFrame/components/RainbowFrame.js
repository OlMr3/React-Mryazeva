import React from 'react';
import PropTypes from 'prop-types';
import './RainbowFrame.css';

class RainbowFrame extends React.Component {
  static propTypes= {
    colors: PropTypes.array,
  };
  buildFrames(colors, children) {
    return colors.reduceRight((acc, color) => (
      <div 
      key = {color}
      style={{
          border: `10px solid ${color}`
        }}
        className='RainbowFrame'
      >
        {acc}
      </div>

    ), children);
  }
render(){
  const {colors, children} = this.props;
  return this.buildFrames(colors, children);
}

}

export default RainbowFrame;
