import React, { Component, PropTypes } from 'react';
import { slider, bar, bar1, bar2 } from './styles.css';
import Handle from './handle';

class Slider extends Component {

  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.number),
    defaultValues: PropTypes.arrayOf(PropTypes.number.isRequired),
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  };

  static defaultProps = {
    defaultValues: [0, 20],
    min: 0,
    max: 100,
    step: 1,
  }

  state = {
    values: this.props.defaultValues,
    pixelsPerValue: 1,
  }

  componentDidMount() {
    this.measure();
    this.resizeListener = window.addEventListener('resize', this.measure);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.measure);
  }

  handleDrag = (pixelOffset, idx) => {
    // keep value between min, max
    const { values } = this.state;
    values[idx] = Math.max(Math.min(
      Math.floor(pixelOffset / this.state.pixelsPerValue),
      this.props.max), this.props.min);
    console.log('set values: ', values);
    this.setState({ values });
  };

  measure = () => {
    const { width } = this.refs.slider.getBoundingClientRect();
    this.setState({
      width,
      pixelsPerValue: width / (this.props.max - this.props.min),
    });
  }

  render() {
    const { values } = this.state;
    const { min, max } = this.props;
    return (
      <div className={slider} ref="slider">
        <div
          style={{
            height: 50,
            position: 'absolute',
            left: 0,
            right: `${(max - min - values[0]) / (max - min) * 100}%`,
          }}
          className={`${bar} ${bar1} bar1`}
        />
        <Handle
          onDrag={value => this.handleDrag(value, 0)}
          position={this.state.values[0] * this.state.pixelsPerValue}
          value={this.state.values[0]}
        />
        <div
          style={{
            height: 50,
            position: 'absolute',
            background: 'green',
            left: `${values[0] / (max - min) * 100}%`,
            right: `${(max - min - values[1]) / (max - min) * 100}%`,
          }}
          className={`${bar} ${bar2} bar2`}
        />
        <Handle
          onDrag={value => this.handleDrag(value, 1)}
          position={(this.state.values[1]) * this.state.pixelsPerValue}
          value={this.state.values[1]}
        />
        <div
          style={{
            height: 50,
            position: 'absolute',
            left: `${values[1] / (max - min) * 100}%`,
            right: 0,
          }}
          className={`${bar} ${bar2} bar2`}
        />
      </div>
    );
  }

}

export default Slider;
