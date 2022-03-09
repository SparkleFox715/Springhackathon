
import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Quiz from './components/Quiz/Quiz';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={Home}>
    {/*<IndexRoute component={MainPage} />*/}
    <Route path="/Admin" component={Admin} />
    <Route path="/Quiz/:group*" component={Quiz} />
  </Route>
);
