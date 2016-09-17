import React from 'react';

import { IndexLink } from 'react-router';

const { element } = React.PropTypes;
const propTypes = {
  children: element,
};

const App = props => (
  <div>
    <h1>Slider Example</h1>
    <ul>
      <li><IndexLink to="/example">Slider</IndexLink></li>
    </ul>
    {props.children}
  </div>
);

App.propTypes = propTypes;

export default App;
