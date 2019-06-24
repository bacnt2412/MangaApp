import React, { PureComponent } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import Const from '../../utils/const';

const { width, height } = Dimensions.get('window');

class DownloadModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
      idManga: ''
    };
  }

  show = async idManga => {
    try {
      let checkExistFolderApp = await RNFS.exists(Const.DOCUMENT.FOLDER_APP);
      if (!checkExistFolderApp) {
        await RNFS.mkdir(Const.DOCUMENT.FOLDER_APP);
      }

      let folderManga = Const.DOCUMENT.FOLDER_APP + '/Manga/' + idManga;
      let fileInfomationMangga = folderManga + '/info.txt';
      let fileThumbnail = folderManga + '/thumbnail.png';

      let checkExist = await RNFS.exists(folderManga);
      let infomationManga;
      if (checkExist) {
        await RNFS.unlink(folderManga)
          .then(() => {
            console.log('FILE DELETED');
          })
          // `unlink` will throw an error, if the item to unlink does not exist
          .catch(err => {
            console.log(err.message);
          });
      }
      await RNFS.mkdir(folderManga);
      infomationManga = {
        author: 'Đang cập nhật',
        category: 'Comic - Drama - Fantasy - Truyện Màu - Xuyên Không',
        created: '2019-06-24T00:06:58.213Z',
        description: 'Đang Loading...',
        folowers: 0,
        latestChapter: 'Chapter 3: Gọi Quản Lý Của Các Người Ra !!! Tôi Là Khách Kim Cương',
        link: 'http://www.nettruyen.com/truyen-tranh/do-thi-phong-than',
        name: 'Đô Thị Phong Thần',
        rating: 0,
        status: 'Đang tiến hành',
        thumbnail: 'http://st.nettruyen.com/data/comics/129/do-thi-phong-than.jpg',
        updated: '2019-06-24T06:35:52.851Z',
        viewers: 0,
        _id: '5d101422143f537734737c6d'
      };
      // ghi info manga vào file
      RNFS.writeFile(fileInfomationMangga, JSON.stringify(infomationManga), 'utf8')
        .then(success => {
          console.log('WRITTEN! infomation success');
        })
        .catch(err => {
          console.log(err.message);
        });

      // download thumbnail
      let downloadFileOptions = {
        fromUrl: infomationManga.thumbnail,
        toFile: fileThumbnail,
        readTimeout: 60 * 1000
      };
      let result = await RNFS.downloadFile(downloadFileOptions).promise;
      console.log('################ result', result);

      console.log('####### infomationManga ', infomationManga);

      var path = RNFS.DocumentDirectoryPath + '/test.txt';

      // write the file

      let data = await RNFS.readDir(folderManga);
      console.log('####### data ', data);
      this.setState({ visiable: true, idManga });
    } catch (error) {
      console.log('################## error', error);
    }
  };

  hide = () => {
    this.setState({ visiable: false });
  };

  render() {
    return (
      <Modal visible={this.state.visiable} transparent={true} animated={true} animationType={'fade'}>
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
              <Progress.Circle progress={1} size={120} thickness={5} showsText={true} borderWidth={0} allowFontScaling={true} direction={'clockwise'} />
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: 'gray',
                  borderRadius: 5,
                  paddingHorizontal: 20,
                  paddingVertical: 5
                }}
                onPress={this.hide}>
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
