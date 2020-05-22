import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CustomAlert from 'components/CustomAlert';
import { FirebaseContext } from '../../firebase';
import './Login.css';

const defaultFormValues = {
  email: '',
  password: ''
}

class Login extends Component {
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

  handleChange(event) {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ form: { ...this.state.form, [fieldName]: fleldVal } })
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      this.context.fb.login(this.state.form.email, this.state.form.password)
      .then((res) =>{
        console.log(res); // TODO: Redirect to home
      })
      .catch((err) => {
        if (err.code === 'auth/wrong-password') {
          this.showAlert('La contraseña ingresada es incorrecta', 'warning');
        } else {
          this.showAlert('Un error inesperado a ocurrido', 'danger');
        }
      })
    } else {
      this.showAlert('Revisa bien tus datos', 'danger');
    }
  }

  showAlert(message, variant) {
    this.setState({alert: { message: message, show: true, variant: variant }})
    setTimeout(() => {
      this.setState({alert: { ...this.state.alert, show: false }})
    }, 2500);
  }

  render() {
    const showAlert = this.state.alert.show;

    return (
      <>
      <div className="Login-component">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Control type="email" name="email" placeholder="Correo electrónico" 
              value={this.state.form.email} onChange={this.handleChange} required />
          </Form.Group>
  
          <Form.Group controlId="formPassword">
            <Form.Control type="password" name="password" placeholder="Contraseña" 
              value={this.state.form.password} onChange={this.handleChange} required />
          </Form.Group>

          <div className="actions">
            <Button variant="primary-lernit" className="transition-3d-hover" type="submit"> Iniciar Sesión </Button>
            <Button variant="primary-lernit" className="transition-3d-hover" onClick={() => this.props.history.push("/register")}> No tengo cuenta </Button>
          </div>
        </Form>
      </div>
      <CustomAlert showAlert={showAlert} variant={this.state.alert.variant} message={this.state.alert.message} />
      </>
    );
  }
}

export default withRouter(Login);
