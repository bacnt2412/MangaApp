import React, { PureComponent } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import Const from '../../utils/const';
import Api from '../../services/api';

const { width, height } = Dimensions.get('window');

class DownloadModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
      idManga: '',
      thumbnail: ''
    };
  }

  downloadChapter = async (chapter, folderManga) => {
    let folderChapter = folderManga + '/' + chapter._id;
    console.log(' ############################# folderChapter', folderChapter);

    await RNFS.mkdir(folderChapter);

    let fileInfoChapter = folderChapter + '/info.txt';

    let res = await Api.getAllImageByIdChapter({ idChapter: chapter._id });
    if (!res || res.status !== 200) return { success: false, message: ' Lỗi lấy thông tin Chapter' };
    let listImage = res.data.listImage;
    if (listImage.length > 0) {
      let resultWriteFileInfo = false;
      await RNFS.writeFile(fileInfoChapter, JSON.stringify(chapter), 'utf8').then(success => {
        resultWriteFileInfo = true;
      });
      if (!resultWriteFileInfo) return { success: false, message: ' Lỗi ghi file Chapter' };

      for (let image of listImage) {
        let saveImage = folderChapter + '/' + image._id + '.png';
        let downloadImageOptions = {
          fromUrl: image.link,
          toFile: saveImage,
          readTimeout: 60 * 1000
        };
        let resultDownloadImage = await RNFS.downloadFile(downloadImageOptions).promise;
        if (!resultDownloadImage || resultDownloadImage.statusCode !== 200) {
          console.log(' ####################### Lỗi tải ảnh: ', image.link);
          return { success: false, message: ' Lỗi tải ảnh: ' + image.name };
        }
        console.log(' ##### Download Thành Công Image', image.name);
      }
      console.log(' ########################## Download Thành Công Chapter #######################', chapter.name);
      return { success: true };
    }
  };

  downloadManga = async idManga => {
    let checkExistFolderApp = await RNFS.exists(Const.DOCUMENT.FOLDER_APP);
    if (!checkExistFolderApp) {
      await RNFS.mkdir(Const.DOCUMENT.FOLDER_APP);
    }

    let folderManga = Const.DOCUMENT.FOLDER_APP + '/Manga/' + idManga;
    let fileInfomationMangga = folderManga + '/info.txt';
    let fileThumbnail = folderManga + '/thumbnail.png';
    console.log(' ############ fileThumbnail', fileThumbnail);
    let checkExist = await RNFS.exists(folderManga);
    let res = await Api.getMangaById({ idManga });
    if (!res | (res.status !== 200)) {
      alert('Lỗi tải thông tin truyện');
      return;
    }
    infomationManga = res.data.listManga;
    console.log(' ############# infomationManga', infomationManga);

    // Nếu tồn tại thì hỏi xem có muốn tải lại hay ko
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

    let resultWriteInfo = false;
    // ghi info manga vào file
    await RNFS.writeFile(fileInfomationMangga, JSON.stringify(infomationManga), 'utf8').then(success => {
      resultWriteInfo = true;
    });
    if (resultWriteInfo) {
      // download thumbnail
      let downloadFileOptions = {
        fromUrl: infomationManga.thumbnail,
        toFile: fileThumbnail,
        readTimeout: 60 * 1000
      };
      let result = await RNFS.downloadFile(downloadFileOptions).promise;
      console.log('################ result Download thumbnail', result);

      for (let chapter of infomationManga.listChapter) {
        let resultDownloadChapter = await this.downloadChapter(chapter, folderManga);
        console.log(' ############## resultDownloadChapter', resultDownloadChapter);
      }

      let data = await RNFS.readDir(folderManga);

      console.log('####### data ', data);
    } else {
      alert(' Lỗi ghi file Manga');
    }
  };

  show = async idManga => {
    this.setState({ visiable: true, idManga });
    this.downloadManga(idManga);
  };

  hide = () => {
    this.setState({ visiable: false });
  };

  render() {
    const { thumbnail } = this.state;
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
