import React, { Component, PropTypes } from 'react';
import { handle } from './styles.css';

class Handle extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    onDrag: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func,
  };

  componentDidMount() {
    this.dragStartMousePosition = 0;
    this.dragStartHandlePosition = 0;
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);
  }

  handleDragStart = (event) => {
    this.dragStartMousePosition = event.screenX;
    this.dragStartHandlePosition = this.props.position;
    this.dragListener = document.addEventListener('mouseup', this.handleDragEnd);
    this.dragEndListener = document.addEventListener('mousemove', this.handleDrag);
  };

  handleDragEnd = () => {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);
    this.dragListener = null;
    this.dragEndListener = null;
  };

  handleDrag = event => {
    this.props.onDrag(this.dragStartHandlePosition + event.screenX - this.dragStartMousePosition);
  }

  render() {
    const style = {
      position: 'absolute',
      transform: 'translateX(-50%)',
      left: this.props.position,
    };

    return (
      <div
        ref="handle"
        style={style}
        className={`handle ${handle}`}
        onMouseDown={this.handleDragStart}
      >
        handle
      </div>
    );
  }
}

export default Handle;
