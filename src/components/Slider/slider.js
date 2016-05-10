import React, {Component, PropTypes} from 'react'
import Title from 'react-title-component'
import { slider, bar, handle } from './styles.css'
import Handle from './handle';

class Slider extends Component {

  static propTypes = {
    value: PropTypes.number,
    defaultValue: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  };

  static defaultProps = {
    defaultValue: 0, 
    min: 0,
    max: 100,
    step: 1,
  }

  state = {
    value: this.props.defaultValue,
    pixelsPerValue : 1,
  }

  handleDrag = pixelOffset => {
    const value = Math.max(Math.min(
      Math.floor(pixelOffset / this.state.pixelsPerValue),
      this.props.max), this.props.min);
    console.log('new value: ', value);
    this.setState({value});
  };

  measure = () => {
    const {width, height} = this.refs.slider.getBoundingClientRect();
    console.log('measure: ', width, height);
    this.setState({pixelsPerValue: width / (this.props.max - this.props.min)})
  }

  componentDidMount() {
    this.measure();
    this.resizeListener = window.addEventListener('resize', this.measure);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.measure);
  }

  render() {
    // keep value between min, max
    const nextValue = Math.max(Math.min(
      this.state.value,
      this.props.max), this.props.min);
    return (
      <div className={slider} ref='slider'>
          <div className={bar}>bar</div>
            <Handle
              onDrag={this.handleDrag}
              position={this.state.value * this.state.pixelsPerValue}
              value={this.state.value}/>
          <div className={bar}>bar</div>
      </div>
    )
  }
}

export default Slider;
