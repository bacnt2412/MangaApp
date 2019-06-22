import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class HeartAnimation extends PureComponent {
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
        }}>
        {!isEnable ? (
          <View style={{ paddingHorizontal: 20, paddingVertical: 6 }}>
            <Icon name={'hearto'} size={30} color={'#707070'} />
          </View>
        ) : (
          <LottieView
            style={{ width: 40, height: 40 }}
            autoPlay={true}
            loop={false}
            source={require('../../assets/lotties/heart.json')}
            enableMergePathsAndroidForKitKatAndAbove
          />
        )}
      </TouchableOpacity>
    );
  }
}

export default HeartAnimation;
