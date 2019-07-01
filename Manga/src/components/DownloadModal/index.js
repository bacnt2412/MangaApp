import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import * as Progress from 'react-native-progress';
import RNFS from 'react-native-fs';
import Const from '../../utils/const';
import Utils from '../../utils/utils';
import Api from '../../services/api';
import { getManga, insertManga, insertListImage } from '../../data/realm';
import RNFetchBlob from 'rn-fetch-blob';

const { width, height } = Dimensions.get('window');

class DownloadModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
      idManga: '',
      thumbnail: '',
      totalImage: 0,
      totalImageDownloaded: 0,
      isSuccess: false
    };
  }

  addMangaToDbLocal = async manga => {
    let data = await insertManga(manga);
  };

  addImageToChapter = async (idChapter, listImage) => {
    let data = await insertListImage(idChapter, listImage);
  };

  downloadChapter = async (chapter, folderManga) => {
    let folderChapter = folderManga + '/' + chapter._id;
    await RNFS.mkdir(folderChapter);

    let listImage = chapter.listImage;
    if (listImage.length > 0) {
      chapter.listImage.map((item, index) => {
        if (item.link.includes('proxy.truyen.cloud')) {
          let newLink = Utils.String.getFromBetween(
            item.link,
            'url=',
            '&hash='
          );
          listImage[index].link = newLink;
        }
      });
    }

    if (listImage.length > 0) {
      let newListImage = [];
      for (let image of listImage) {
        try {
          let saveImage = folderChapter + '/' + image._id + '.png';
          let resultDownloadImage = false;
          await RNFetchBlob.config({
            // response data will be saved to this path if it has access right.
            path: saveImage
          })
            .fetch('GET', image.link, {
              //some headers ..
            })
            .then(() => {
              console.log(' #### Download hoan thanh ');

              resultDownloadImage = true;
            });

          if (!resultDownloadImage) {
            console.log(' #### lỗi tải ảnh ', image.link);
          } else {
            image.link = saveImage;
            newListImage.push(image);
          }

          await this.setState({
            totalImageDownloaded: this.state.totalImageDownloaded + 1
          });
        } catch (error) {}
      }
      this.addImageToChapter(chapter._id, newListImage);
      console.log(
        ' ########################## Download Thành Công Chapter #######################',
        chapter.name
      );
      return { success: true };
    }
  };

  downloadManga = async idManga => {
    let checkExistFolderApp = await RNFS.exists(Const.DOCUMENT.FOLDER_APP);
    if (!checkExistFolderApp) {
      await RNFS.mkdir(Const.DOCUMENT.FOLDER_APP);
    }
    // init file
    let folderManga = Const.DOCUMENT.FOLDER_APP + '/Manga/' + idManga;
    let fileThumbnail = folderManga + '/thumbnail.png';

    let checkExist = await RNFS.exists(folderManga);

    // get infomation manga
    res = await Api.getMangaById({ idManga });
    if (!res | (res.status !== 200)) {
      alert('Lỗi tải thông tin truyện');
      return;
    }
    infomationManga = res.data.manga;

    console.log(' ############## infomationManga', infomationManga);
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
    let resultDownloadThumbnail = false;
    await RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      path: fileThumbnail
    })
      .fetch('GET', infomationManga.thumbnail, {
        //some headers ..
      })
      .then(() => {
        resultDownloadThumbnail = true;
      });
    let listChapter = infomationManga.listChapter.map(chapter => {
      return { ...chapter, listImage: [] };
    });
    let realmManga = {
      ...infomationManga,
      listChapter,
      thumbnail: fileThumbnail
    };
    this.addMangaToDbLocal(realmManga);
    // get total Image;
    let totalImage = 0;
    infomationManga.listChapter.map(item => {
      totalImage = totalImage + item.listImage.length;
    });
    await this.setState({ totalImage });

    for (let chapter of infomationManga.listChapter) {
      let resultDownloadChapter = await this.downloadChapter(
        chapter,
        folderManga
      );
      if (!resultDownloadChapter || !resultDownloadChapter.success) {
        alert('Lỗi tải hình ảnh ' + chapter.name);
      }
    }

    this.setState({ isSuccess: true });
    let data = await RNFS.readDir(folderManga);
  };

  show = async idManga => {
    this.setState({ visiable: true, idManga });
    if (Platform.OS == 'android') {
      await Utils.Permission.request_WRITE_EXTERNAL_STORAGE_Permission();
      await Utils.Permission.request_READ_EXTERNAL_STORAGE_Permission();
    }

    this.downloadManga(idManga);
  };

  hide = () => {
    this.setState({ visiable: false });
  };

  render() {
    const { totalImage, totalImageDownloaded } = this.state;
    let progress = totalImage > 0 ? totalImageDownloaded / totalImage : 0;
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
              Download
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
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              {this.state.isSuccess ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <Text
                    style={{
                      fontSize: 24,
                      color: 'green',
                      fontWeight: '600'
                    }}>
                    Thành Công
                  </Text>
                </View>
              ) : (
                <Progress.Circle
                  progress={progress}
                  size={120}
                  thickness={5}
                  showsText={true}
                  borderWidth={0}
                  allowFontScaling={true}
                  direction={'clockwise'}
                />
              )}
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  backgroundColor: this.state.isSuccess ? '#26bf3c' : 'gray',
                  borderRadius: 5,
                  paddingHorizontal: 20,
                  paddingVertical: 5
                }}
                onPress={this.hide}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {this.state.isSuccess ? 'Ok' : 'Hủy'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default DownloadModal;
