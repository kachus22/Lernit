import React, { Component } from 'react';
import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import { FirebaseContext } from './firebase';
import './App.css';

class App extends Component {
  static contextType = FirebaseContext
  
  logout() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="actions">
          <Button variant="primary-lernit" className="transition-3d-hover" onClick={this.logout}>Cerrar sesión</Button>
        </div>
      </div>
    );
  }
}

export default App;
