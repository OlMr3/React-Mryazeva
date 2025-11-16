import React from 'react';
import PropTypes from 'prop-types';
import './br2jsx.css'

class BR2JSX extends React.Component {
  static propTypes = {
    text: PropTypes.string
  }
  render() {
    const { text } = this.props;
    const parts = text.split(/<br\s*\/?>/i);
    const elements = [];
    parts.forEach((part, index) => {
      if (part !== '') {
        elements.push(part);
      }
      if (index !== parts.length - 1) {
        elements.push(<br key={`br-${index}`} />);
      }
    });
    return (
      <div className='br2jsx'>
        {elements}
      </div>
    );
  }
}
export default BR2JSX;
