import React from 'react';
const { arrayOf, element } = React.PropTypes;

import { IndexLink } from 'react-router';
import Title from 'react-title-component';

const propTypes = {
  children: arrayOf(element),
};

const App = props => (
  <div>
    <Title render="Awesome App" />
    <h1>Slider Example</h1>
    <ul>
      <li><IndexLink to="/">Home</IndexLink></li>
    </ul>
    {props.children}
  </div>
);

App.propTypes = propTypes;

export default App;
