import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Utils from '../../utils/utils';
import Api from '../../services/api';
import Lang from '../../Language';

class HeartAnimation extends PureComponent {
  constructor(props) {
    super(props);
    console.log('########## props',props)
    let isEnable = props.idManga
      ? Utils.userData.listIdMangaFollow.includes(props.idManga)
      : false;
    this.state = {
      isEnable
    };
  }

  onPress = () => {
    const { idManga } = this.props;
    const { isEnable } = this.state;
    if (!isEnable) {
      Api.followManga({ idManga });
      this.setState({ isEnable: true });
      Utils.userData.listIdMangaFollow.push(idManga);
      Alert.alert(Lang.getByKey('manga_follow'),Lang.getByKey('manga_follow_message'))
    } else {
      Api.unfollowManga({ idManga });
      this.setState({ isEnable: false });
      var index = Utils.userData.listIdMangaFollow.indexOf(idManga);
      if (index !== -1) Utils.userData.listIdMangaFollow.splice(index, 1);
      Alert.alert(Lang.getByKey('manga_unfollow'),Lang.getByKey('manga_unfollow_message'))
    }
  };

  render() {
    const { isEnable } = this.state;

    return (
      <TouchableOpacity onPress={this.onPress}>
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
