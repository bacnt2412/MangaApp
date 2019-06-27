import React, { PureComponent } from 'react';
import {
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Lang from '../../../Language';
import Icon from 'react-native-vector-icons/AntDesign';
import { Loading, MangaItem } from '../../../components';
import Api from '../../../services/api';
import Utils from '../../../utils/utils';
import Const from '../../../utils/const';

let timeout = null;

class SearchScreen extends PureComponent {
  static options = {
    topBar: {
      visible: true,
      animate: true,
      testID: 'topBar',
      title: {
        text: 'Search',
        fontSize: 20,
        page: 1
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      listManga: [],
      isLoadFirst: false,
      isLoadMore: false
    };
  }

  searchManga = async () => {
    let { textSearch, listManga } = this.state;
    if (!textSearch) return;
    this.setState({
      isLoadFirst: true,
      page: 1
    });
    let data = {
      key: textSearch
    };
    let res = await Api.searchMangaByName(data);
    if (res && res.status === 200) {
      console.log(' ################## searchManga', res);
      listManga = res.data.listManga;
    }
    this.setState({
      isLoadFirst: false,
      listManga
    });
  };

  getMoreData = async () => {
    let { textSearch, listManga, page } = this.state;
    if (!textSearch) return;

    page++;
    this.setState({
      isLoadMore: true
    });
    let data = {
      key: textSearch,
      page
    };
    let res = await Api.searchMangaByName(data);
    if (res && res.status === 200) {
      console.log(' ################## res', res);
      listManga = [...listManga, ...res.data.listManga];
    }
    this.setState({
      isLoadMore: false,
      listManga,
      page
    });
  };
  onChangeTextSearch = text => {
    this.setState({ textSearch: text });
    clearTimeout(timeout);
    timeout = setTimeout(this.searchManga, 500);
  };

  onClearText = () => {
    this.setState({ textSearch: '' });
  };

  keyExtractor = item => {
    return item && item._id
      ? item._id.toString()
      : Utils.Number.random().toString();
  };

  renderItem = ({ index, item }) => {
    if (!item || !item._id) {
      return <View key={'key_213'} />;
    }
    return (
      <MangaItem
        componentId={this.props.componentId}
        elementId={
          `manga_` + item && item._id
            ? item._id
            : Utils.Number.random().toString()
        }
        index={index}
        item={item}
      />
    );
  };

  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      this.getMoreData();
    }
  };

  render() {
    const { listManga, isLoadFirst, isLoadMore } = this.state;
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 40,
            paddingHorizontal: 15,
            paddingRight: 30,
            shadowOpacity: 0.7,
            shadowRadius: 5,
            shadowColor: '#b3b5b7',
            shadowOffset: { height: 2, width: 0 },
            flexDirection: 'row',
            elevation: 1
          }}>
          <TextInput
            placeholder={'Search'}
            style={{ fontSize: 15, flex: 1 }}
            onChangeText={this.onChangeTextSearch}
            value={this.state.textSearch}
          />
          {this.state.textSearch ? (
            <TouchableOpacity
              onPress={this.onClearText}
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                right: 10,
                top: 0,
                bottom: 0,
                padding: 5
              }}>
              <Icon name={'close'} size={20} color={'gray'} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{flex: 1}} >
          {isLoadFirst ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Loading />
            </View>
          ) : (
            <FlatList
              data={listManga}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              extraData={this.state}
              scrollEventThrottle={160}
              onEndReachedThreshold={0.5}
              onMomentumScrollBegin={this.onMomentumScrollBegin}
              onEndReached={this.onEndReached}
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
      </View>
    );
  }
}

export default SearchScreen;
