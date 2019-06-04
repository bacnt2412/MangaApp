import React from 'react';
import { View, Text } from 'react-native';

class componentName extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> componentText </Text>
      </View>
    );
  }
}

export default componentName;
