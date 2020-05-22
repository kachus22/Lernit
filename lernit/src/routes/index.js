import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import * as path from './routes';
import Login from 'components/Login';
import Register from 'components/Register';
import { FirebaseContext } from '../firebase';
import App from '../App.js';

export default class extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute exact path={path.REGISTER} component={Register} />
          <PublicRoute exact path={path.LOGIN} component={Login} />
          <AuthRoute exact path={path.HOME} component={App} />
        </Switch>
      </Router>
    );
  }
}

class AuthRoute extends Component {
  static contextType = FirebaseContext

  render() {
    if(this.context.user === null)
      return (<Redirect to={path.LOGIN} />);
    return(
      <Route { ...this.props } />
    )
  }
}

class PublicRoute extends Component {
  static contextType = FirebaseContext

  render() {
    if(this.context.user !== null)
      return (<Redirect to={path.HOME} />);
    return(
      <Route { ...this.props } />
    )
  }
}