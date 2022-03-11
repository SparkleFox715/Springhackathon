
import React from 'react';
import { Route, Routes } from 'react-router-dom';

/**
 * Import all page components here
 */
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Quiz from './components/Quiz/Quiz';
import HomePage from './components/Home/Home';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Routes>
    <Route exact path="/" component={HomePage}>
      {/*<IndexRoute component={Home} />*/}
    </Route>
    <Route path="/Admin" component={Admin} />
    <Route path="/Quiz/:group*" component={Quiz} />
  </Routes>
);
