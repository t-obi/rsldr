import React from 'react';
import Title from 'react-title-component';
import Slider from './slider';

const SliderContainer = () => (
  <div>
    <Title render={prev => `${prev} | Slider!`} />
    <Slider
      values={[0, 50, 100]}
      onAfterChange={values => console.log('after drag: ', values)}
      onBeforeChange={values => console.log('before drag: ', values)}
      minDistance={10}
      stepSize={20}
    />
  </div>
);

export default SliderContainer;
