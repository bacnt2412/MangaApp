import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';

const { width, height } = Dimensions.get('window');

class DownloadModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
      idManga: ''
    };
  }

  show = idManga => {
    console.log(' ####################### RNFS.DocumentDirectoryPath', RNFS.DocumentDirectoryPath )
    this.setState({ visiable: true, idManga });
  };

  hide = () => {
    this.setState({ visiable: false });
  };

  render() {
    return (
      <Modal
        visible={this.state.visiable}
        transparent={true}
        animated={true}
        animationType={'fade'}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
          <View
            style={{
              width: width - 100,
              height: height / 3.5,
              backgroundColor: 'white',
              borderRadius: 5
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '600',
                marginTop: 5
              }}>
              {' '}
              Download{' '}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                marginVertical: 5
              }}>
              Vui lòng chờ tải xong..!
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Progress.Circle
                progress={1}
                size={120}
                thickness={5}
                showsText={true}
                borderWidth={0}
                allowFontScaling={true}
                direction={'clockwise'}
              />
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: 'gray',
                  borderRadius: 5,
                  paddingHorizontal: 20,
                  paddingVertical: 5
                }}
                onPress={this.hide}
                >
                <Text style={{ color: 'white' }}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default DownloadModal;
