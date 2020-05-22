import React, { Component } from 'react';
import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import { FirebaseContext } from './firebase';
import './App.css';

class App extends Component {
  static contextType = FirebaseContext

  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    const that = this;
    this.context.fb.auth.onAuthStateChanged(user => {
      // Using realtime database
      // const ref = this.context.fb.counterByUID(user.uid)
      // ref.on('value', (snap) => {
      //   that.setState({ counter: snap.val().counter });
      // });
      // Using firestorage
      const ref = that.context.fb.counterByUID(user.uid)
      ref.onSnapshot((doc) => {
        that.setState({ counter: doc.data().counter });
      });
    });
  }

  logout() {
    this.context.fb.logout()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('error', err);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload {this.state.counter}.
          </p>
          <Button variant="plus-lernit" className="transition-3d-hover" onClick={() => this.plusOne()}>+</Button>
        </header>
        <div className="actions">
          <Button variant="primary-lernit" className="transition-3d-hover" onClick={() => this.logout()}>Cerrar sesión</Button>
        </div>
      </div>
    );
  }
}

export default App;
