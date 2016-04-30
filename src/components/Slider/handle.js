import React, {Component, PropTypes} from 'react'
import { handle } from './styles.css'

class Handle extends Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    onDrag: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func,
  };

  handleDragStart = () => {
    this.dragListener = document.addEventListener('mouseup', this.handleDragEnd);
    this.dragEndListener = document.addEventListener('mousemove', this.handleDrag);
  };

  handleDragEnd = () => {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);
    this.dragListener = null;
    this.dragEndListener = null;
    console.log('handle drag end!!');
  };

  handleDrag = event => this.props.onDrag(event.screenX);

  componentWillUnmount(){
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);
  }

  render() {
    const style = {
      position: 'absolute',
      transform: 'translateX(-50%)',
      left: this.props.value
    }

    return (
      <div
        style={style}
        className={`handle ${handle}`}
        onMouseDown={this.handleDragStart}>
        handle
      </div>
    )
  }
}

export default Handle;
