// ^import_component
import React from 'react'
import { HashRouter, Route, Switch, hashHistory } from 'react-router-dom';

import Home from 'app-main/view/home/home';
// $import_component

const RootRouter = () => (
  <HashRouter history={hashHistory}>
    <Switch>
      {/* ^routes_define */}
      <Route exact path="/" component={Home} />
      {/* $routes_define */}
    </Switch>
  </HashRouter>
);
export default RootRouter;