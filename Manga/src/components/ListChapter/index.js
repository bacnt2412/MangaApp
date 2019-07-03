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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      isLast: false,
      isAscending: false
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

  changeAscending = () => {
    this.setState({ isAscending: !this.state.isAscending });
  };

  renderChapterItem = (item, index) => {
    let indexC = index;
    let listData = [...this.state.listChapter];
    let isFirst = this.state.listChapter.length - 1 === indexC;
    let isLast = indexC === 0;
    if (this.state.isAscending) {
      listData.reverse();
      isFirst = indexC === 0;
      isLast = this.state.listChapter.length - 1 === indexC;
    }
    return (
      <TouchableOpacity
        key={item._id}
        style={styles.item_container}
        onPress={() => {
          Navigation.push(this.props.componentIdParent, {
            component: {
              name: Const.NAME_SCREEN.CHAPTER_DETAIL,
              passProps: {
                chapter: item,
                listChapter: listData,
                index: indexC,
                isFirst,
                isLast,
                componentIdParent: this.props.componentIdParent,
                isAscending: this.state.isAscending
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
    const { listChapter, isFirstLoad, isAscending } = this.state;
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
    console.log(' ############### isAscending', isAscending);
    console.log(' ############### listChapter', listChapter);
    let listData = [...this.state.listChapter];

    if (isAscending) listData.reverse();

    return (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <Text style={styles.title_text}>
            {Lang.getByKey('manga_list_chapter')}
          </Text>
          {isAscending ? (
            <Icon
              name={'sort-ascending'}
              size={25}
              onPress={this.changeAscending}
              style={{ paddingHorizontal: 10 }}
            />
          ) : (
            <Icon
              name={'sort-descending'}
              size={25}
              onPress={this.changeAscending}
              style={{ paddingHorizontal: 10 }}
            />
          )}
        </View>
        <View>
          {isFirstLoad
            ? loadingView
            : listChapter &&
              listData.map((item, index) => {
                return this.renderChapterItem(item, index);
              })}
        </View>
      </View>
    );
  }
}

export default ListChapter;
