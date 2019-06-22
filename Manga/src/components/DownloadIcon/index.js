import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DownloadIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false
    };
  }

  render() {
    const { isEnable } = this.state;

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ isEnable: !this.state.isEnable });
        }}
        >
        <View style={{  paddingVertical: 6 }}>
          <Icon name={'progress-download'} size={30} color={'#707070'} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default DownloadIcon;
