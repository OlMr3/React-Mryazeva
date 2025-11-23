import React from "react";
import { withRainbowFrame } from './withRainbowFrameHOC';
import DoubleButton from './DoubleButton';

class MyComponent extends React.Component{
    render() {
  let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];
  const FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);
  return (
    <div>
        <DoubleButton
          caption1="однажды"
          caption2="пору"
          cbPressed={(num) => alert(`Нажата кнопка ${num}`)}
        >
          в студёную зимнюю
        </DoubleButton>
        <FramedDoubleButton
          caption1="я из лесу"
          caption2="мороз"
          cbPressed={(num) => alert(`Нажата кнопка ${num}`)}
        >
          вышел, был сильный
        </FramedDoubleButton>
      </div>
  );
}
}

export default MyComponent;