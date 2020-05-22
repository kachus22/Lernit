import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
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
    this.state = {
      form: { ...defaultFormValues },
      alert: {
        message: '',
        show: false,
        variant: 'danger'
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fleldVal}})
  }

  showAlert(message, variant) {
    this.setState({alert: { message: message, show: true, variant: variant }})
    setTimeout(() => {
      this.setState({alert: { ...this.state.alert, show: false }})
    }, 2500);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() && this.isEqualPassword()) {
      this.context.createUser("test@test.com", "cacacaca")
      .then((res) =>{
        console.log(res); // TODO: Redirect to home
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          this.showAlert('Ya existe una cuenta con este correo electrónico', 'warning');
        }
      })
    } else {
      this.showAlert('Revisa bien tus datos', 'danger');
    }
  }

  isEqualPassword() {
    return this.state.form.passwordConfirmation === this.state.form.password;
  }

  render() {
    const validPassword = this.isEqualPassword();
    const showAlert = this.state.alert.show;
    return (
      <>
      <div className="Register">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Control type="email" name="email" placeholder="Correo electrónico" 
              value={this.state.email} onChange={this.handleChange} required />
          </Form.Group>
  
          <Form.Group controlId="formPassword">
            <Form.Control type="password" name="password" placeholder="Contraseña" 
              value={this.state.password} onChange={this.handleChange} required />
          </Form.Group>

          <Form.Group controlId="formPasswordConfirmation">
            <Form.Control type="password" name="passwordConfirmation" placeholder="Confirma la contraseña" 
              value={this.state.passwordConfirmation} onChange={this.handleChange} isInvalid={!validPassword} required />
              <Form.Control.Feedback type="invalid">
                Las contraseñas deben ser iguales
              </Form.Control.Feedback>
          </Form.Group>

          <div className="actions">
            <Button type="submit"> Crear Cuenta </Button>
            <Button> Ya tengo cuenta </Button>
          </div>
        </Form>
      </div>
      {showAlert && (
        <Alert variant={this.state.alert.variant}>
        <p>
          {this.state.alert.message}
        </p>
      </Alert>
      )}
      </>
    );
  }
}