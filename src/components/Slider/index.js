import React from 'react';
import Title from 'react-title-component';
import Slider from './slider';

const SliderContainer = () => (
  <div>
    <Title render={prev => `${prev} | Slider!`} />
    <Slider values={[0, 20, 50, 12, 100, 88]} />
  </div>
);

export default SliderContainer;
