import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FirebaseContext } from '../../firebase'
import './Register.css';

const defaultFormValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
}

export default class Register extends Component {
  static contextType = FirebaseContext

  constructor(props) {
    super(props);
    this.fb = this.context;
    this.state = {
      form: { ...defaultFormValues }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleChange(event) {
    // const value = event.target.name;
    console.log(event.target.value);
    // // this.setState({[value]: value});
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fleldVal}})
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    return (
      <div className="Register">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Control type="email" placeholder="Correo electrónico" 
              value={this.state.email} onChange={this.handleChange} required />
          </Form.Group>
  
          <Form.Group controlId="formPassword">
            <Form.Control type="password" placeholder="Contraseña" 
              value={this.state.password} onChange={this.handleChange} required />
          </Form.Group>

          <Form.Group controlId="formPasswordConfirmation">
            <Form.Control type="password" placeholder="Confirma la contraseña" 
              value={this.state.passwordConfirmation} onChange={this.handleChange} required />
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