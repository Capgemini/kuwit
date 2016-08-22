import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from 'containers/App';
import Chat from 'containers/Chat';

const rootView = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Chat} />
    </Route>
  </Router>
);

export default rootView;
