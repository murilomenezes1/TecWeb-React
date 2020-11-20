import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Stocks from './views/Stocks';
import Login from './views/Login';
import Signup from './views/Signup';
import Trending from './views/Trending';

import history from './history';

export default (props) => (
    <Router history={history}>
        <Switch>
            <Route exact path='/'>
                <Login />
            </Route>
            <Route path='/Stocks'>
                <Stocks />
            </Route>
            <Route path='/Signup'>
                <Signup />
            </Route>
            <Route path='/Trending'>
                <Trending />
            </Route>
        </Switch>
    </Router>
);
