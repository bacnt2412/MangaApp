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
    let idManga = props.manga._id;
    let listChapter =
      props.manga && props.manga.listChapter ? props.manga.listChapter : [];
    this.state = {
      isFirstLoad: false,
      isLoadMore: false,
      idManga,
      listChapter,
      page: 1,
      isLast: false
    };
  }

  componentDidMount = () => {
    if (this.props.manga.isLocal) {
    } else {
      this.getData();
    }
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
      </TouchableOpacity>
    );
  };

  render() {
    const { listChapter, isFirstLoad, isLast, isLoadMore } = this.state;
    const loadingView = (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10
        }}>
        <ActivityIndicator size={'small'} color={Const.COLOR.LOADDING} />
      </View>
    );
    return (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.title_text}>
            {Lang.getByKey('manga_list_chapter')}
          </Text>
        </View>
        <View>
          {isFirstLoad
            ? loadingView
            : listChapter &&
              listChapter.map(item => {
                return this.renderChapterItem(item);
              })}
        </View>
        {isLast || isLoadMore || this.props.manga.isLocal ? null : (
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
