import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Slider from 'examples/components/Slider';
import './styles.css';
import App from './components/App';
import NoMatch from './components/NoMatch';

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Slider} />
      <Route path="example" component={Slider} />
    </Route>
    <Route path="*" status={404} component={NoMatch} />
  </Route>
);
