import React, { Component } from 'react';
import Firebase from './firebase';
import FirebaseContext from './context';

export default class FirebaseProvider extends Component {
  render() {
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        {this.props.children}
      </FirebaseContext.Provider>
    )
  }
}