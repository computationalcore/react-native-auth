import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

// Custom components
import { Button, Card, CardSection, TextField, Spinner } from './common';

/**
 * @description	The Login form component.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 */
class LoginForm extends Component {
  constructor(props) {
    super(props);

    /**
     * @typedef {Object} ComponentState
     * @property {string} email - The user email.
     * @property {string} password - The user password.
     * @property {string} error - Login error message.
     * @property {boolean} loading - Indicates whether loading is visible
     *    (Loader should be visible when the app is sending data to the server).
     */

    /** @type {ComponentState} */
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  /**
   * @description Callback executed when login button is pressed.
   */
  onButtonPress() {
    const { email, password } = this.state;

    // Validate inputs
    if (!email) {
      this.setState({ error: 'Email field is required.' });
      return;
    } else if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      this.setState({ error: 'Invalid email.' });
      return;
    } else if (!password) {
      this.setState({ error: 'Password field is required.' });
      return;
    }

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  /**
	 * @description Callback executed when the user login is successful.
	 */
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  /**
   * @description Callback executed when the user login fails.
   * @param {string} error - Login error message.
   */
  onLoginFail(error) {
    console.log(error);
    let errorMessage = '\nAuthentication Failed.\n';
    errorMessage += (error.message) ? error.message : '';
    this.setState({
      error: errorMessage,
      loading: false
    });
  }

  /**
   * @description Render the Login button based on the loading state.
   */
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Sign In
      </Button>
    );
  }

  render() {
    const { errorTextStyle, linkStyle } = styles;
    return (
      <Card>
        <CardSection>
          <TextField
            placeholder="user@email.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <TextField
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
          <Text>Don{'\''}t have an account? </Text>
          <TouchableOpacity onPress={this.props.onSignUpPressed}>
            <Text style={linkStyle}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </CardSection>
      </Card>
    );
  }
}

/**
 * The component StyleSheet.
 */
const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    textAlign: 'center'
  },
  linkStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontWeight: 'bold'
  }
});

export default LoginForm;
