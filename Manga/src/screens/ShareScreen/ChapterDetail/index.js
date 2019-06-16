import React, { PureComponent } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import Lang from '../../../Language';
import Api from '../../../services/api';
import FastItem from 'react-native-fast-image';
import Loading from '../../../components/Loading';
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
      listImage: [],
      idChapter: props.chapter ? props.chapter._id : null
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ isFirstLoad: true });
    let res = await Api.getListImageByIdChapter({
      idChapter: this.state.idChapter
    });
    if (res && res.status === 200) {
      let data = res.data.data;
      if (data.length > 0) {
        res.data.data.map((item, index) => {
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
      console.log('#########################', data);

      this.setState({ listImage: res.data.data });
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
      this.setState({ listImage: [...listImage, ...res.data.data] });
    }
    this.setState({ isLoadMore: false });
  };

  renderItem = ({ item }) => {
    return (
      <View>
        <ImageItem image={item.link} />
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
    if (!this.onMomentumScrollBegin) {
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
    const { image, isLoading } = this.props;
    const { width, height } = Dimensions.get('window');
    const heightItem = width * this.state.ratio;
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
        <FastItem
          source={{ uri: image }}
          style={{
            width: width,
            height: heightItem
          }}
          resizeMode={FastItem.resizeMode.contain}
          onLoad={evt => {
            let ratio = evt.nativeEvent.height / evt.nativeEvent.width;
            this.setState({ ratio });
          }}
          onLoadEnd={() => {
            this.setState({ isLoading: false });
          }}
        />
      </View>
    );
  }
}
export default ChapterDetail;
