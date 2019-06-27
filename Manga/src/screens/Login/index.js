import React, { PureComponent } from 'react';
import {  View, Text } from 'react-native';

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'red'}}>
        <Text> LoginScreen </Text>
      </View>
    );
  }
}

export default LoginScreen;
