import React from "react";
import './DoubleButton.css'
class DoubleButton extends React.Component {
    render() {
        const {caption1, caption2, cbPressed, children} = this.props;
        return(
            <div>
                <input
                type="button"
                value={caption1}
                onClick={() => cbPressed(1)}>
                </input>
                {' '}
                <span>{children}</span>
                {' '}
                <input
                type="button"
                value={caption2}
                onClick={() => cbPressed(2)}>
                </input>
            </div>
        );
    }
}

export default DoubleButton;