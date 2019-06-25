import React, { PureComponent } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import Lang from '../../../Language';
import Api from '../../../services/api';
import FastImage from 'react-native-fast-image';
import { Loading } from '../../../components';
import Utils from '../../../utils/utils';

class ChapterDetail extends PureComponent {
  static options = {
    topBar: {
      visible: true,
      drawBehind: false,
      layout: {
        backgroundColor: '#000000'
      },
      translucent: true,
      transparent: true
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isFirstLoad: false,
      isLoadMore: false,
      listImage:
        props.chapter && props.chapter.listImage ? props.chapter.listImage : [],
      idChapter: props.chapter ? props.chapter._id : null,
      isLocal: props.chapter && props.chapter.listImage ? true : false
    };
  }

  componentDidMount() {
    if (!this.state.isLocal) this.getData();
  }

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

  renderItem = ({ item }) => {
    return (
      <View>
        <ImageItem item={item} />
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
  render() {
    const { listImage, isFirstLoad, isLoadMore } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {isFirstLoad ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loading />
          </View>
        ) : null}
        <FlatList
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
      </View>
    );
  }
}

class ImageItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { ratio: 1, isLoading: true };
  }

  render() {
    const { item, isLoading } = this.props;
    const { width, height } = Dimensions.get('window');
    const heightItem = width * this.state.ratio;
    console.log('############### image', item);
    let linkImage = item.isLocal ? 'file://' + item.link : item.link
    return (
      <View
        style={{
          flex: 1,
          width: width,
          height: heightItem
        }}>
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
        <FastImage
          source={{ uri: linkImage }}
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
            this.setState({ isLoading: false });
          }}
          onLoadEnd={() => {
            console.log('############### onLoadEnd');
            this.setState({ isLoading: false });
          }}
        />
      </View>
    );
  }
}
export default ChapterDetail;
