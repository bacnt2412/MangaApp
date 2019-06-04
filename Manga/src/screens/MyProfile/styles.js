import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

class componentName extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let a = "";
    return (
      <View>
        <Text> componentText </Text>
      </View>
    );
  }
}

export default componentName;
