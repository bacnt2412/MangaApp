import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import Api from '../../services/api';
import Const from '../../utils/const';

class ListChapter extends PureComponent {
  constructor(props) {
    super(props);
    let { idManga } = props;

    this.state = {
      isFirstLoad: false,
      isLoadMore: false,
      idManga,
      listChapter: [],
      page: 1,
      isLast: false
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    this.setState({
      isFirstLoad: true
    });
    let res = await Api.getListChapterByIdManga({
      idManga: this.state.idManga
    });
    let isLast = false;
    if (res && res.status === 200) {
      if (res.data.listChapter.length < Const.PAGE_LIMIT) {
        isLast = true;
      }
      this.setState({ listChapter: res.data.listChapter, isLast });
    }
    this.setState({
      isFirstLoad: false
    });
  };

  getMoreData = async () => {
    this.setState({
      isLoadMore: true
    });
    let { page, listChapter } = this.state;
    if (!page) page = 1;
    page++;
    let res = await Api.getListChapterByIdManga({
      idManga: this.state.idManga,
      page: page
    });
    let isLast = false;
    if (res && res.status === 200) {
      if (res.data.listChapter.length < Const.PAGE_LIMIT) {
        isLast = true;
      }
      this.setState({
        listChapter: [...listChapter, ...res.data.listChapter],
        isLast
      });
    }

    this.setState({
      isLoadMore: false,
      page
    });
  };

  render() {
    const { listChapter, isFirstLoad, isLast, isLoadMore } = this.state;
    const loadingView = (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'small'} color={Const.COLOR.LOADDING} />
      </View>
    );
    return (
      <View style={{ padding: 10, paddingTop: 0 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              textAlign: 'center'
            }}>
            Danh sách chapter{' '}
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              textAlign: 'center',
              backgroundColor: 'red'
            }}>
            Thời gian{' '}
          </Text>
        </View>
        <View >
          {isFirstLoad
            ? loadingView
            : listChapter &&
              listChapter.map(item => {
                return (
                  <View key={item._id} style={{ flex: 1, flexDirection:'row'}}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: '500',
                        marginBottom: 5,
                        maxWidth: Dimensions.get('window').width /2
                        ,marginRight: 10
                      }} numberOfLines={1}>
                      {item.name} asd asd asd sad asd asd asd asd asd asd asdasd
                    </Text>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 16,
                        fontWeight: '500',
                        marginBottom: 5,
                        backgroundColor: 'red',
                        maxWidth: Dimensions.get('window').width /2

                      }} numberOfLines={1}>
                      {item.created}
                    </Text>
                  </View>
                );
              })}
        </View>
        {isLast || isLoadMore ? null : (
          <Text
            onPress={() => {
              this.getMoreData();
            }}
            style={{
              color: Const.COLOR.LOADDING,
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              alignSelf: 'center'
            }}>
            Xem thêm
          </Text>
        )}
        {isLoadMore ? loadingView : null}
      </View>
    );
  }
}

export default ListChapter;
