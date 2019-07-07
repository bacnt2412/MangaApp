import React, { PureComponent } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Lang from '../../../Language';
import Api from '../../../services/api';
import FastImage from 'react-native-fast-image';
import { Loading } from '../../../components';
import Utils from '../../../utils/utils';
import Const from '../../../utils/const';
import images from '../../../assets/images';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import PhotoView from '@merryjs/photo-viewer';
import { insertReadChapter } from '../../../data/realm';

class ChapterDetail extends PureComponent {
  static options = {
    topBar: {
      visible: true,
      drawBehind: false,
      layout: {
        backgroundColor: '#000000'
      },
      translucent: true,
      transparent: true,
      leftButtons: [
        {
          id: 'backPress',
          icon: images.back_icon
        }
      ]
    },
    bottomTabs: {
      visible: false,
      drawBehind: true
    }
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    this.state = {
      isFirstLoad: false,
      isLoadMore: false,
      listImage:
        props.chapter && props.chapter.listImage ? props.chapter.listImage : [],
      idChapter: props.chapter ? props.chapter._id : null,
      isLocal: props.chapter && props.chapter.listImage ? true : false,
      isShowHeader: true,
      indexPhotoView: 0,
      visiblePhotoView: false
    };
    this.scrollY = 0;
    this.isShowHeader = true;
  }

  navigationButtonPressed({ buttonId }) {
    switch (buttonId) {
      case 'backPress': {
        this.handleBackPress();
        break;
      }
    }
  }

  handleBackPress = () => {
    Navigation.popTo(this.props.componentIdParent);
    return true;
  };

  addReadChapter = () => {
    try {
      const { chapter } = this.props;
      let data = {
        _id: chapter.idmanga,
        idchapter: chapter._id,
        islocal: chapter.islocal ? true : false
      };
      insertReadChapter(data);
    } catch (error) {}
  };

  componentDidMount() {
    console.log('######################################## ', this.props);
    this.addReadChapter();
    if (!this.state.isLocal) this.getData();
  }

  pushToChapter = next => {
    try {
      let index = next ? this.props.index - 1 : this.props.index + 1;

      let isFirst = this.props.listChapter.length - 1 === index;
      let isLast = index === 0;
      if (this.props.isAscending) {
        index = !next ? this.props.index - 1 : this.props.index + 1;
        isLast = this.props.listChapter.length - 1 === index;
        isFirst = index === 0;
      }
      let item = this.props.listChapter[index];

      Navigation.push(this.props.componentIdParent, {
        component: {
          name: Const.NAME_SCREEN.CHAPTER_DETAIL,
          passProps: {
            chapter: item,
            listChapter: this.props.listChapter,
            index: index,
            isFirst,
            isLast,
            componentIdParent: this.props.componentIdParent,
            isAscending: this.props.isAscending
          },
          options: {
            topBar: {
              title: {
                text: item.name
              }
            }
          }
        }
      });
    } catch (error) {}
  };

  hideTopBar = () => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: false,
        drawBehind: true,
        animate: true
      }
    });
    this.setState({ isShowHeader: false });
    this.isShowHeader = false;
  };

  showTopBar = () => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: true,
        drawBehind: true,
        animate: true
      }
    });
    this.setState({ isShowHeader: true });
    this.isShowHeader = true;
  };

  getData = async () => {
    this.setState({ isFirstLoad: true });
    let res = await Api.getListImageByIdChapter({
      idChapter: this.state.idChapter
    });
    if (res && res.status === 200) {
      let data = res.data.listImage;
      if (data.length > 0) {
        res.data.listImage.map((item, index) => {
          if (item.link.includes('proxy.truyen.cloud')) {
            let newLink = Utils.String.getFromBetween(
              item.link,
              'url=',
              '&hash='
            );
            data[index].link = newLink;
          }
        });
      }
      console.log('### getListImageByIdChapter: ', data);

      this.setState({ listImage: data });
    }
    this.setState({ isFirstLoad: false });
  };

  getMoreData = async () => {
    this.setState({ isLoadMore: true });
    let { listImage } = this.state;
    let lastIdImage =
      listImage && listImage.length > 0
        ? listImage[listImage.length - 1]
        : null;
    let res = await Api.getListImageByIdChapter({
      idChapter: this.state.idChapter,
      lastIdImage
    });
    if (res && res.status === 200) {
      let data = res.data.listImage;
      if (data.length > 0) {
        res.data.listImage.map((item, index) => {
          if (item.link.includes('proxy.truyen.cloud')) {
            let newLink = Utils.String.getFromBetween(
              item.link,
              'url=',
              '&hash='
            );
            data[index].link = newLink;
          }
        });
      }
      this.setState({ listImage: [...listImage, ...data] });
    }
    this.setState({ isLoadMore: false });
  };

  renderItem = ({ item, index }) => {
    return (
      <View>
        <ImageItem
          isLocal={this.state.isLocal}
          item={item}
          onClick={() => {
            this.onImageClick(index);
          }}
        />
      </View>
    );
  };

  keyExtractor = item => {
    return item && item._id;
  };

  onMomentumBegin = () => {
    this.onMomentumScrollBegin = false;
  };

  loadMoreData = () => {
    if (!this.onMomentumScrollBegin && !this.props.chapter.isLocal) {
      this.getMoreData();
      this.onMomentumScrollBegin = true;
    }
  };

  nextChapter = () => {
    this.pushToChapter(true);
  };

  previusChapter = () => {
    this.pushToChapter();
  };

  onImageClick = index => {
    this.setState({
      visiblePhotoView: true,
      indexPhotoView: index
    });
  };

  render() {
    const {
      listImage,
      isFirstLoad,
      isLoadMore,
      visiblePhotoView,
      indexPhotoView
    } = this.state;
    let dataPhotoView = listImage.map(item => {
      let linkImage = this.props.chapter.isLocal
        ? 'file://' + item.link
        : item.link;
      linkImage = { source: { uri: linkImage } };
      return linkImage;
    });
    console.log(' ################# ', dataPhotoView);
    return (
      <View style={{ flex: 1 }}>
        {isFirstLoad ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loading />
          </View>
        ) : null}

        <PhotoView
          visible={visiblePhotoView}
          data={dataPhotoView}
          hideCloseButton={true}
          hideShareButton={true}
          hideStatusBar={false}
          initial={indexPhotoView}
          onDismiss={() => this.setState({ visiblePhotoView: false })}
        />

        <FlatList
          scrollEventThrottle={160}
          onScroll={event => {
            if (
              (event.nativeEvent.contentOffset.y <= this.scrollY ||
                event.nativeEvent.contentOffset.y <= 0) &&
              !this.isShowHeader &&
              !this.state.isLoadMore
            ) {
              this.showTopBar();
            } else {
              if (
                this.isShowHeader &&
                event.nativeEvent.contentOffset.y > this.scrollY &&
                event.nativeEvent.contentOffset.y > 0 &&
                !this.state.isLoadMore
              ) {
                this.hideTopBar();
              }
            }
            this.scrollY = event.nativeEvent.contentOffset.y;
          }}
          style={{ flex: 1 }}
          data={listImage}
          removeClippedSubviews={true}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMoreData}
          onMomentumScrollBegin={this.onMomentumBegin}
        />
        {this.isShowHeader == true ? (
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View>
              {this.props.isFirst ? null : (
                <TouchableOpacity
                  onPress={this.previusChapter}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: 30
                  }}>
                  <IconAntDesign name={'banckward'} size={25} color='gray'/>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16}} >{this.props.chapter.name}</Text>
            </View>
            <View>
              {this.props.isLast ? null : (
                <TouchableOpacity
                  onPress={this.nextChapter}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingHorizontal: 30,
                  }}>
                  <IconAntDesign name={'forward'} size={25} color='gray' />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

class ImageItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { ratio: 1, isLoading: true, isError: false };
  }

  render() {
    const { item, isLocal } = this.props;
    const { ratio, isError, isLoading } = this.state;
    const { width, height } = Dimensions.get('window');
    const heightItem = width * ratio;
    let linkImage = isLocal ? 'file://' + item.link : item.link;
    linkImage = isError ? images.no_image : { uri: linkImage };
    return (
      <View
        style={{
          flex: 1,
          width: width,
          height: heightItem
        }}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              width: width,
              height: heightItem
            }}>
            <Loading />
          </View>
        ) : null}
        <TouchableWithoutFeedback onPress={this.props.onClick}>
          <FastImage
            source={linkImage}
            style={{
              width: width,
              height: heightItem
            }}
            onLoad={evt => {
              let ratio = evt.nativeEvent.height / evt.nativeEvent.width;
              this.setState({ ratio });
            }}
            onError={error => {
              console.log('############### onError', error);
              this.setState({ isError: true });
            }}
            onLoadEnd={() => {
              this.setState({ isLoading: false });
            }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
export default ChapterDetail;
