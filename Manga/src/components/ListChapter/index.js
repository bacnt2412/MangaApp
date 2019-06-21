import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Api from '../../services/api';
import Const from '../../utils/const';
import Lang from '../../Language';
import styles from './styles';
import { Navigation } from 'react-native-navigation';

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

  updateVieManga = async idChapter => {
    let res = await Api.updateViewManga({
      idManga: this.state.idManga,
      idChapter
    });
    console.log(' ## updateViewManga ', res);
  };

  renderChapterItem = item => {
    return (
      <TouchableOpacity
        key={item._id}
        style={styles.item_container}
        onPress={() => {
          Navigation.push(this.props.componentId, {
            component: {
              name: Const.NAME_SCREEN.CHAPTER_DETAIL,
              passProps: {
                chapter: item
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
          this.updateVieManga(item._id);
        }}>
        <Text style={styles.item_name} numberOfLines={1}>
          {item.name}
        </Text>
        {/* <Text
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: '500',
            maxWidth: Dimensions.get('window').width / 2
          }}
          numberOfLines={1}>
          {Utils.Time.getTimeNow()}
        </Text> */}
      </TouchableOpacity>
    );
  };

  render() {
    const { listChapter, isFirstLoad, isLast, isLoadMore } = this.state;
    const loadingView = (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'small'} color={Const.COLOR.LOADDING} />
      </View>
    );
    return (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.title_text}>
            {Lang.getByKey('manga_list_chapter')}
          </Text>
          {/* <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: '500',
              marginBottom: 5,
              textAlign: 'center',
              backgroundColor: 'red'
            }}>
            Thời gian{' '}
          </Text> */}
        </View>
        <View>
          {isFirstLoad
            ? loadingView
            : listChapter &&
              listChapter.map(item => {
                return this.renderChapterItem(item);
              })}
        </View>
        {isLast || isLoadMore ? null : (
          <Text
            onPress={() => {
              this.getMoreData();
            }}
            style={styles.view_more}>
            {Lang.getByKey('view_more')}
          </Text>
        )}
        {isLoadMore ? loadingView : null}
      </View>
    );
  }
}

export default ListChapter;
