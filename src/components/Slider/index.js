import React, { Component, PropTypes } from 'react';
import Title from 'react-title-component';
import { slider, bar, handle } from './styles.css';
import Handle from './handle';
import Slider from './slider';

class SliderContainer extends Component {

  render() {
    return (
      <div>
        <Title render={prev => `${prev} | Slider!`} />
        <Slider />
      </div>
    );
  }
}

export default SliderContainer;
