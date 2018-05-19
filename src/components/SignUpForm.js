import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

// Custom components
import { Button, Card, CardSection, TextField, Spinner } from './common';

/**
 * @description	The Login page component.
 * @constructor
 * @param {Object} props - The props that were defined by the caller of this component.
 */
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    /**
     * @typedef {Object} ComponentState
     * @property {string} email - The user email.
     * @property {string} password - The user password.
     * @property {string} password - The confirmation password.
     * @property {string} error - Login error message.
     * @property {boolean} loading - Indicates whether loading is visible
     *    (Loader should be visible when the app is sending data to the server).
     */

    /** @type {ComponentState} */
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      loading: false
    };
  }

  /**
   * @description Callback executed when create account button is pressed.
   */
  onButtonPress() {
    const { email, password, confirmPassword } = this.state;

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
    } else if (password !== confirmPassword) {
      this.setState({ error: 'Passwords must match.' });
      return;
    }

    this.setState({ error: '', loading: true });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onCreateSuccess.bind(this))
      .catch(this.onCreateFail.bind(this));
  }

  /**
	 * @description Callback executed when the user account is created with successful.
	 */
  onCreateSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  /**
   * @description Callback executed when the user account creation fails.
   * @param {string} error - Login error message.
   */
  onCreateFail(error) {
    console.log(error);
    let errorMessage = 'Account Creation Failed.\n';
    errorMessage += (error.message) ? error.message : '';
    this.setState({
      error: errorMessage,
      loading: false
    });
  }

  /**
   * @description Render the Create Account button based on the loading state.
   */
  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Create Account
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

        <CardSection>
          <TextField
            secureTextEntry
            placeholder="confirm-password"
            label="Confirm Pass"
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
          />
        </CardSection>

        <Text style={errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

        <CardSection>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={this.props.onLoginPressed}>
            <Text style={linkStyle}>
              Login
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

export default SignUpForm;
