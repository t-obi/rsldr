import React from 'react';
import Title from 'react-title-component';
import Slider from './slider';

const SliderContainer = () => (
  <div>
    <Title render={prev => `${prev} | Slider!`} />
    <Slider
      values={[100, 150, 200]}
      onAfterChange={values => console.log('after drag: ', values)}
      onBeforeChange={values => console.log('before drag: ', values)}
      minDistance={10}
      stepSize={1}
      min={100}
      max={200}
    />
  </div>
);

export default SliderContainer;
