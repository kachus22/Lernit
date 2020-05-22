import React, { Component } from 'react';
import Login from 'components/Login';
import AuthHeader from 'components/AuthHeader/AuthHeader';
import './Login.css';

export default class extends Component {
  subHeader = 'Vuelve a contar ahora';

  render() {
    return (
      <div className="Login">
        <AuthHeader subHeader={this.subHeader} />
        <Login />
      </div>
    );
  }
}