import React, {Component, PropTypes} from 'react'
import { handle } from './styles.css'

class Handle extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    onDrag: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func,
  };

  handleDragStart = () => {
    this.dragListener = window.addEventListener('mouseup', this.handleDragEnd);
    this.dragEndListener = window.addEventListener('mousemove', this.handleDrag);
    console.log('drag start!!');
  };

  handleDragEnd = () => {
    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.handleDragEnd);
    this.dragListener = null;
    this.dragEndListener = null;
    console.log('handle drag end!!');
  };

  handleDrag = event => this.props.onDrag(event.screenX);

  render() {
    return (
      <div 
        className={handle}
        style={{left: this.props.value}}
        onMouseDown={this.handleDragStart}>
        handle
      </div>
    )
  }
}

export default Handle;
