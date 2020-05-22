import React, { Component } from 'react';
import Firebase from './firebase';
import FirebaseContext from './context';

export default class FirebaseProvider extends Component {
  constructor(props) {
    super(props);
    this.fb = new Firebase();
    this.state = {
      user: null,
      fb: this.fb
    }
  }

  componentDidMount() {
    this.fb.auth.onAuthStateChanged(user => {
      this.setState({user: user, fb: this.fb});
      console.log(this.state);
    });
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <FirebaseContext.Provider value={this.state}>
        {this.props.children}
      </FirebaseContext.Provider>
    )
  }
}