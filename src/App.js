import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

// Custom components
import { Button, CardSection, Header, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

// Firebase config file
import FIREBASE_SETUP from '../config/firebase';

// All app states possibles
const AppStates = Object.freeze({
    LOADING: Symbol('loading'),
    LOGIN: Symbol('login'),
    SIGNUP: Symbol('signup'),
    LOGGED: Symbol('logged')
});

/**
 * @description Main App component.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 */
class App extends Component {
  constructor(props) {
		super(props);

		/**
		 * @typedef {Object} ComponentState
		 * @property {string} appState - The current app state.
		 * @property {string} loggedUser - The email of the user if logged.
		 */

		/** @type {ComponentState} */
		this.state = {
			appState: AppStates.LOADING,
      loggedUser: null
		};
	}

  /**
   * @description Lifecycle event handler called right before the component’s first render.
   */
  componentWillMount() {
    firebase.initializeApp(FIREBASE_SETUP);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ appState: AppStates.LOGGED, loggedUser: user.email });
      } else {
        this.setState({ appState: AppStates.LOGIN, loggedUser: null });
      }
    });
  }

  /**
	 * @description Callback executed when the user click on Sign Up link.
	 */
  onSignUpPressed() {
    this.setState({ appState: AppStates.SIGNUP });
  }

  /**
	 * @description Callback executed when the user click on Sign In link.
	 */
  onLoginPressed() {
    this.setState({ appState: AppStates.LOGIN });
  }

  /**
   * @description Renders app content based on the current AppState.
   */
  renderContent() {
    switch (this.state.appState) {
      case AppStates.LOGGED:
        return (
          <View>
            <Text style={styles.loggedTextStyle}>
              Hello <Text style={{ fontWeight: 'bold' }}>{this.state.loggedUser}</Text>
            </Text>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>
                Log Out
              </Button>
            </CardSection>
          </View>
        );
      case AppStates.LOGIN:
        return <LoginForm onSignUpPressed={this.onSignUpPressed.bind(this)} />;
      case AppStates.SIGNUP:
        return <SignUpForm onLoginPressed={this.onLoginPressed.bind(this)} />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

/**
 * The component StyleSheet.
 */
const styles = StyleSheet.create({
  loggedTextStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  }
});

export default App;
