import React from 'react';
import RainbowFrame from './RainbowFrame';

function withRainbowFrame(colors) {
  return function (WrappedComponent) {
   class NewComp extends React.Component {
      render() {
        return (
          <RainbowFrame colors={colors}>
            <WrappedComponent {...this.props} />
          </RainbowFrame>
        );
      }
    };
    return NewComp;
  };
}

export { withRainbowFrame };