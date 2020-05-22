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
      uid: null,
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
        that.setState({ uid: user.uid, counter: doc.data().counter });
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

  plusOne() {
    this.context.fb.counterByUID(this.state.uid).set({ counter: this.state.counter + 1,})
      .then((doc) => {
        console.log(doc)
      })
      .catch((docErr) => {
        console.log('error', docErr);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="counter">{this.state.counter}</span>
          <p>Contador</p>
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
