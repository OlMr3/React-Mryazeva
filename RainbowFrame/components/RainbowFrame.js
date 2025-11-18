import React from 'react';
import PropTypes from 'prop-types';
import './RainbowFrame.css';

class RainbowFrame extends React.Component {
  static propTypes= {
    colors: PropTypes.array,
  };
render(){
  const {colors, children} = this.props;
  const buildFrames = colors.reduceRight((child, color) =>{
      return (
        <div style={{ border: `10px solid ${color}`}}
        className='RainbowFrame'>
          {child}
        </div>
      );
    }, children);
  return buildFrames;
}

}

export default RainbowFrame;
