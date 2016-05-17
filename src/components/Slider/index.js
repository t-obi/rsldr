import React from 'react';
import Title from 'react-title-component';
import Slider from './slider';

const SliderContainer = () => (
  <div>
    <Title render={prev => `${prev} | Slider!`} />
    <Slider
      values={[0, 50, 100]}
      onChange={values => console.log('during drag: ', values)}
      onAfterChange={values => console.log('after drag: ', values)}
      onBeforeChange={values => console.log('before drag: ', values)}
      onHandleCollision={handles => console.error('handle collision: ', handles)}
      minDistance={10}
    />
  </div>
);

export default SliderContainer;
