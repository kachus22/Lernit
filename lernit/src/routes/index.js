import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import * as path from './routes';
import Login from 'components/Login';
import Register from 'components/Register';
import App from '../App.js';

export default function() {
  return (
    <Router>
      <Switch>
      <Route exact path={path.HOME} component={App}/>
        <Route exact path={path.REGISTER}>
          <Register />
        </Route>
        <Route exact path={path.LOGIN} component={Login}/>
      </Switch>
    </Router>
  );
}