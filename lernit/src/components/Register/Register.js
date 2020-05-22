import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CustomAlert from 'components/CustomAlert';
import { FirebaseContext } from '../../firebase';
import './Register.css';

const defaultFormValues = {
  email: '',
  password: '',
  passwordConfirmation: ''
}

class Register extends Component {
  static contextType = FirebaseContext

  constructor(props) {
    super(props);
    this.state = {
      form: { ...defaultFormValues },
      alert: {
        message: '',
        show: false,
        variant: 'danger'
      },
      isLoading: false
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
    if (form.checkValidity() && this.isValidPassword()) {
      this.setState({...this.state, isLoading: true})
      this.context.fb.createUser(this.state.form.email, this.state.form.password)
      .then((res) =>{
        this.setState({...this.state, isLoading: false});
        console.log(res);
      })
      .catch((err) => {
        this.setState({...this.state, isLoading: false});
        if (err.code === 'auth/email-already-in-use') {
          this.showAlert('Ya existe una cuenta con este correo electrónico', 'warning');
        } else if (err.code === 'auth/weak-password') {
          this.showAlert('La contraseña debe ser ', 'danger');
        }
      })
    } else {
      this.showAlert('Revisa bien tus datos', 'danger');
    }
  }

  isValidPassword() {
    if ( this.state.form.password.length == 0) {
      return true;
    }
    return this.state.form.passwordConfirmation === this.state.form.password && this.state.form.password.length >= 6;
  }

  render() {
    const validPassword = this.isValidPassword();
    const showAlert = this.state.alert.show;
    return (
      <>
      <div className="Register-component">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Control type="email" name="email" placeholder="Correo electrónico" 
              value={this.state.form.email} onChange={this.handleChange} required />
          </Form.Group>
  
          <Form.Group controlId="formPassword">
            <Form.Control type="password" name="password" placeholder="Contraseña" 
              value={this.state.form.password} onChange={this.handleChange} required />
          </Form.Group>

          <Form.Group controlId="formPasswordConfirmation">
            <Form.Control type="password" name="passwordConfirmation" placeholder="Confirma la contraseña" 
              value={this.state.form.passwordConfirmation} onChange={this.handleChange} isInvalid={!validPassword} required />
              <Form.Control.Feedback type="invalid">
                Las contraseñas deben ser iguales y mínimo 6 caracteres
              </Form.Control.Feedback>
          </Form.Group>

          <div className="actions">
            <Button variant="primary-lernit" className="transition-3d-hover" disabled={this.state.isLoading} type="submit">
              {this.state.isLoading ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
            <Button variant="primary-lernit" className="transition-3d-hover" onClick={() => this.props.history.push("/login")}> Ya tengo cuenta </Button>
          </div>
        </Form>
      </div>
      <CustomAlert showAlert={showAlert} variant={this.state.alert.variant} message={this.state.alert.message} />
      </>
    );
  }
}

export default withRouter(Register);