import './styles.css';
import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Slider from './components/Slider';

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Slider} />
    </Route>
    <Route path="*" status={404} component={NoMatch} />
  </Route>
);
