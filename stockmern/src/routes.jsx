import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from
'react-router-dom'


import Stocks from './stocks'
import Login from './login'
import Signup from './signup'

export default props => (
 	<Router>
 	<Switch>
 		<Route exact path='/'>
 			<Login/>
 		</Route>
 		<Route path='/Stocks'>
 			<Stocks/>
 		</Route>
 		<Route path='/Signup'>
 			<Signup/>
 		</Route>

 	</Switch>
 	</Router>
)