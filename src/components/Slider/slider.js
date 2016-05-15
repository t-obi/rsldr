import React, { Component, PropTypes } from 'react';
import { slider, bar, bar1, bar2 } from './styles.css';
import Handle from './handle';

class Slider extends Component {

  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.number.isRequired),
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  };

  static defaultProps = {
    values: [0, 100],
    min: 0,
    max: 100,
    step: 1,
  }

  state = {
    values: this.props.values,
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
          key="bar0"
          style={{
            height: 50,
            position: 'absolute',
            left: 0,
            right: `${(max - min - values[0]) / (max - min) * 100}%`,
          }}
          className={`${bar} ${bar1} bar0`}
        />
        {/* create one handle per value */}
        {values.map((value, currentIndex) => (
          <Handle
            key={`handle${currentIndex}`}
            onDrag={nextValue => this.handleDrag(nextValue, currentIndex)}
            position={value * this.state.pixelsPerValue}
            value={value}
          />
        ))}
        {/* create one bar in-between every two values.
          * i.e., not first and last bars,
          * these will always be created
         */}
        {values.map((value, currentIndex) => (
          currentIndex === values.length - 1
            ? null
            : <div
              key={`bar${currentIndex + 1}`}
              style={{
                height: 50,
                position: 'absolute',
                background: 'green',
                left: `${value / (max - min) * 100}%`,
                right: `${(max - min - values[currentIndex + 1]) / (max - min) * 100}%`,
              }}
              className={`${bar} ${bar2} bar${currentIndex + 1}`}
            />
          ))}
        />
        <div
          style={{
            height: 50,
            position: 'absolute',
            left: `${values[values.length - 1] / (max - min) * 100}%`,
            right: 0,
          }}
          className={`${bar} ${bar2} bar${values.length}`}
        />
      </div>
    );
  }

}

export default Slider;
