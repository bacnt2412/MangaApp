import React, { PureComponent } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import MangaItem from '../MangaItem';
import Utils from '../../utils/utils';
import Loading from '../Loading';
import Const from '../../utils/const';

export default class ListManga extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      isLoadFirst: false,
      isLoadMore: false,
      listManga: [],
      page: 1
    };
  }

  componentDidMount() {
    this.getFirstData();
  }
  getFirstData = async () => {
    try {
      const { getData } = this.props;
      let { listManga } = this.state;
      this.setState({ isLoadFirst: true });
      const res = getData ? await getData() : null;
      if (res && res.status === 200 && res.data.listManga) {
        listManga = [...listManga, ...res.data.listManga];
      } else if (res && res.error && res.error.response.status === 403) {
        alert('Token is not valid');
      }
      this.setState({ isLoadFirst: false, listManga });
    } catch (error) {

    }
  };

  getMoreData = async () => {
    const { getData } = this.props;
    let { listManga, page } = this.state;
    this.setState({ isLoadMore: true });
    page++;
    const res = getData ? await getData({ page }) : null;
    if (res && res.status === 200) {
      listManga = [...listManga, ...res.data.listManga];
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isLoadMore: false, page, listManga });
  };

  refreshData = async () => {
    const { getData } = this.props;
    let { listManga } = this.state;

    this.setState({ isRefreshing: true });
    const res = getData ? await getData() : null;
    if (res && res.status === 200) {
      listManga = res.data.listManga;
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isRefreshing: false, listManga });
  };

  keyExtractor = item => {
    return item._id && item._id.toString();
  };

  renderItem = ({ index, item }) => {
    if (!item._id) {
      return <View key={213} />;
    }
    return (
      <MangaItem
        componentId={this.props.componentId}
        elementId={`manga_` + item._id}
        index={index}
        item={item}
      />
    );
  };

  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };

  onEndReached = async () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      await this.getMoreData();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  render() {
    const { isLoadFirst, isLoadMore } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {isLoadFirst ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loading />
          </View>
        ) : (
          <FlatList
            data={this.state.listManga}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            extraData={this.state}
            scrollEventThrottle={160}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            onEndReached={this.onEndReached}
            onRefresh={this.refreshData}
            refreshing={this.state.isRefreshing}
            ListFooterComponent={
              isLoadMore && (
                <View style={{ justifyContent: 'center', marginTop: 5 }}>
                  <ActivityIndicator
                    size={'small'}
                    color={Const.COLOR.LOADDING}
                  />
                </View>
              )
            }
          />
        )}
      </View>
    );
  }
}
