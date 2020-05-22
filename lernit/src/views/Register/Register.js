import React, { Component } from 'react';
import Register from 'components/Register';
import AuthHeader from 'components/AuthHeader/AuthHeader';
import './Register.css';


export default class extends Component {
  subHeader = 'Empieza a contar hoy';
  
  render() {
    return (
      <div className="Register">
        <AuthHeader subHeader={this.subHeader} />
        <Register />
      </div>
    );
  }
}