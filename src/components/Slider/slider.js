import React, { Component, PropTypes } from 'react';
import { slider, bar, bar1, bar2 } from './styles.css';
import Handle from './handle';

class Slider extends Component {

  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.number.isRequired),
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    stepSize: PropTypes.number.isRequired,
    minDistance: PropTypes.number,
    onBeforeChange: PropTypes.func,
    onChange: PropTypes.func,
    onAfterChange: PropTypes.func,
    onHandleCollision: PropTypes.func,
  };

  static defaultProps = {
    values: [0, 100],
    min: 0,
    max: 100,
    stepSize: 1,
    minDistance: 1,
    onBeforeChange: () => {},
    onChange: () => {},
    onAfterChange: () => {},
    onHandleCollision: () => {},
  }

  state = {
    values: this.props.values.map(value => {
      const stepsMin = Math.floor(value / this.props.stepSize);
      console.log('step min: ', value, stepsMin);
      return stepsMin * this.props.stepSize;
    }),
    pixelsPerValue: 1,
  }

  componentDidMount() {
    this.measure();
    this.resizeListener = window.addEventListener('resize', this.measure);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.measure);
  }

  valueToStep = value => {
    const stepsMin = Math.floor(value / this.props.stepSize);
    console.log('step min: ', value, stepsMin);
    return stepsMin * this.props.stepSize;
  }

  handleDrag = (pixelOffset, idx) => {
    // keep value between min, max
    const { values } = this.state;
    const { stepSize, minDistance } = this.props;
    const min = idx === 0 ?
      this.props.min :
      values[idx - 1] + minDistance;
    const max = idx === values.length - 1 ?
      this.props.max :
      values[idx + 1] - minDistance;

    const valueAtMouse = Math.floor(pixelOffset / this.state.pixelsPerValue);
    // find steps adjacent to value at mouse-position
    const nextLowerValue = Math.floor(valueAtMouse / stepSize) * stepSize;
    const nextBiggerValue = Math.floor(valueAtMouse / stepSize + 1) * stepSize;
    // determine wich of these is closer to mouse-position
    const closerValue = valueAtMouse - nextLowerValue < nextBiggerValue - valueAtMouse
      ? nextLowerValue : nextBiggerValue;
    // if the found value is different from current value, use as next value
    // (else do not change the value)
    if (values[idx] !== closerValue) {
      values[idx] = Math.max(Math.min(
        closerValue,
        max), min);
    }

    // emit collision events if adjacent handles are closer than mindistance
    if (values[idx] === values[idx - 1] + minDistance) {
      this.props.onHandleCollision([idx - 1, idx]);
    } else if (values[idx] === values[idx + 1] - minDistance) {
      this.props.onHandleCollision([idx, idx + 1]);
    }

    this.setState({ values });
    this.props.onChange(values);
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
            onDragStart={() => this.props.onBeforeChange(this.state.values)}
            onDrag={nextValue => this.handleDrag(nextValue, currentIndex)}
            onDragEnd={() => this.props.onAfterChange(this.state.values)}
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
