import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <LottieView
          style={{ width: 100, height: 100 }}
          autoPlay={true}
          loop={true}
          source={require('../../assets/loading/loading1.json')}
          enableMergePathsAndroidForKitKatAndAbove
        />
    );
  }
}

export default Loading;
