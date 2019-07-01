import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../services/api';
import DownloadModal from '../DownloadModal';

class DownloadIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDownloading: false
    };
  }

  onPress = () => {
    const { idManga } = this.props;
    this.refs.DownloadModal.show(idManga);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={{ paddingVertical: 6, marginRight: 10 }}>
          <Icon name={'progress-download'} size={30} color={'#707070'} />
        </View>
        <DownloadModal ref={'DownloadModal'} />
      </TouchableOpacity>
    );
  }
}

export default DownloadIcon;
