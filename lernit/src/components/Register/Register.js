import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Register.css';

export default class Register extends Component {
  render() {
    return (
      <div className="Register">
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Control type="email" placeholder="Correo electrónico" />
          </Form.Group>
  
          <Form.Group controlId="formPassword">
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <Form.Group controlId="formPasswordConfirmation">
            <Form.Control type="password" placeholder="Confirma la contraseña" />
          </Form.Group>

          <div className="actions">
            <Button type="submit"> Crear Cuenta </Button>
            <Button> Ya tengo cuenta </Button>
          </div>
        </Form>
      </div>
    );
  }
}