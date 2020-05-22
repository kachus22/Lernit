import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import './CustomAlert.css';

export default class CustomAlert extends Component {
  render() {
    return (
      <>
      {this.props.showAlert && (
        <Alert variant={this.props.variant}>
        <p>
          {this.props.message}
        </p>
      </Alert>
      )}
      </>
    );
  }
}

