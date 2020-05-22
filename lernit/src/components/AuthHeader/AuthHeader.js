import React, { Component } from 'react';
import logo from 'logo_lernit_white.svg';
import './AuthHeader.css';


export default class extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <header className="Auth-Header">
        <p>Somos <span className="company-name"><img src={logo} className="Auth-Logo" alt="logo" /></span></p>
        <p className="sub-header">{this.props.subHeader}</p>
      </header>
    );
  }
}