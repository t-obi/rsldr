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
  }

  handleDrag = value => {
    console.log('handle value changed: ', value);
    this.setState({value});
  };

  render() {
    return (
      <div>
        <Title render={prev => `${prev} | Slider!`}/>
        <div>hello slider</div>
        <div className={slider}>
            <div className={bar}>bar</div>
            <Handle
              onDrag={this.handleDrag}
              value={this.state.value}/>
            <div className={bar}>bar</div>
        </div>
      </div>
    )
  }
}

export default Slider;
