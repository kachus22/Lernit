import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Correo electrónico" />
          </Form.Group>
  
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <div className="actions">
            <Button type="submit"> Iniciar Sesión </Button>
            <Button> No tengo cuenta </Button>
          </div>
        </Form>
      </div>
    );
  }
}