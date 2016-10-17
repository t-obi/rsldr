import React from 'react';
import Slider from '../../../lib';

const SliderContainer = () => (
  <Slider
    values={[100, 150, 200]}
    onAfterChange={values => console.log('after drag: ', values)}
    onBeforeChange={values => console.log('before drag: ', values)}
    minDistance={10}
    stepSize={20}
    min={0}
    max={200}
  />
);

export default SliderContainer;
