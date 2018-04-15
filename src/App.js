import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header } from './components/common';
import FIREBASE_SETUP from '../config/firebase';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp(FIREBASE_SETUP);
  }

  render() {
    return (
      <View>
        <Header title="Authentication" />
      </View>
    );
  }
}

export default App;
