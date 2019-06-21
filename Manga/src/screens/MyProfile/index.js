import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { TabView, PagerScroll, TabBar } from 'react-native-tab-view';
import BaseScreen from '../../components/BaseScreen';
import ListManga from '../../components/ListManga';
import Loading from '../../components/Loading';
import Api from '../../services/api.js';
import Lang from '../../Language';
import styles from './styles';
import Const from '../../utils/const';
import { getManga, insertManga } from '../../data/realm';
import realm from '../../data/realm';

class MyProfile extends BaseScreen {
  static options = {
    topBar: {
      visible: true,
      animate: true, // Controls whether TopBar visibility changes should be animated
      drawBehind: false,
      testID: 'topBar',
      title: {
        text: Lang.getByKey('profile_title'),
        fontSize: 20
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'follow', title: Lang.getByKey('profile_follow_tab_title') },
        {
          key: 'download',
          title: Lang.getByKey('profile_download_tab_title')
        },
        { key: 'history', title: Lang.getByKey('profile_history_tab_title') }
      ],
      listFollow: [],
      listDownload: [],
      listHistory: [],
      pageFollow: 1,
      pageDownload: 1,
      pageHistory: 1,
      isFollowLoadFirst: false,
      isDownloadLoadFirst: false,
      isHistoryLoadFirst: false,
      isFollowLoadMore: false,
      isDownloadLoadMore: false,
      isHistoryLoadMore: false
    };
  }
  test = async () => {
    let manga = {
      author: 'Đang cập nhật',
      category: 'Drama - Manhua - Ngôn Tình - Truyện Màu',
      created: '2019-06-15T03:20:33.182Z',
      description: 'Đường Nhược Sơ ',
      folowers: 0,
      latestChapter: 'Chapter 30: Liên quan gì tới cô',
      link: 'http://www.nettruyen.com/truyen-tranh/con-duong-phan-cong-cua-sung-the',
      name: 'Con Đường Phản Công Của Sủng Thê',
      rating: 0,
      status: 'Đang tiến hành',
      thumbnail: 'http://st.nettruyen.com/data/comics/247/con-duong-phan-cong-cua-sung-the.jpg',
      updated: '2019-06-21T03:19:01.510Z',
      viewers: 0,
      _id: '5d0464019627483f328dbafbxxYYYYYYYYx'
    };

    // insertManga(manga)
    //   .then(x => console.log(' ############ x', x))
    //   .catch(error => console.log(' ############ error', error));
    let data = await insertManga(manga);
    console.log(' ################### data', data);
    // //let result =  getManga();
    // for (var item of result) {
    //   console.log(' ################### item', item);
    // }
  };

  componentDidMount() {
    this.test();
    this.getFirstFollowManga();
  }
  onChangeTab = index => {
    this.setState({ index });
    switch (index) {
      case 0: {
        const { listFollow } = this.state;
        if (listFollow && listFollow.length === 0) {
          this.getFirstFollowManga();
        }
        break;
      }
      case 1: {
        const { listDownload } = this.state;
        if (listDownload && listDownload.length === 0) {
          this.getFirstDownloadManga();
        }
        break;
      }
      case 2: {
        const { listHistory } = this.state;
        if (listHistory && listHistory.length === 0) {
          this.getFirstHistoryManga();
        }
        break;
      }
    }
  };

  renderContenOfTabView = (listData, isLoading, isLoadMore, fucGetMoreData) => {
    return (
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loading />
          </View>
        ) : (
          <ListManga listManga={listData} getMoreData={fucGetMoreData} isLoadMore={isLoadMore} componentId={Const.ID_SCREEN.MYPROFILE} />
        )}
      </View>
    );
  };

  renderTabBar = props => (
    <TabBar {...props} indicatorStyle={styles.indicator} style={styles.tabbar} tabStyle={styles.tab} labelStyle={styles.label} scrollEnabled={false} />
  );

  getFirstFollowManga = async () => {
    this.setState({ isFollowLoadFirst: true });
    let res = await Api.getLatestManga();
    if (res && res.status === 200) {
      this.setState({ listFollow: res.data.listManga });
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isFollowLoadFirst: false });
  };

  getMoreFollowManga = async () => {
    this.setState({ isFollowLoadMore: true });
    let { pageFollow, listFollow } = this.state;
    pageFollow++;

    let res = await Api.getLatestManga({ page: pageFollow });

    if (res && res.status === 200) {
      listFollow = [...listFollow, ...res.data.listManga];
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isFollowLoadMore: false, pageFollow, listFollow });
  };

  getFirstDownloadManga = async () => {
    this.setState({ isDownloadLoadFirst: true });
    let res = await Api.getLatestManga();
    if (res && res.status === 200) {
      this.setState({ listDownload: res.data.listManga });
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isDownloadLoadFirst: false });
  };

  getMoreDownloadManga = async () => {
    this.setState({ isDownloadLoadMore: true });
    let { pageDownload, listDownload } = this.state;
    pageDownload++;

    let res = await Api.getLatestManga({ page: pageDownload });

    if (res && res.status === 200) {
      listDownload = [...listDownload, ...res.data.listManga];
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isDownloadLoadMore: false, pageDownload, listDownload });
  };

  getFirstHistoryManga = async () => {
    this.setState({ isHistoryLoadFirst: true });
    let res = await Api.getLatestManga();
    if (res && res.status === 200) {
      this.setState({ listHistory: res.data.listManga });
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isHistoryLoadFirst: false });
  };

  getMoreHistoryManga = async () => {
    this.setState({ isHistoryLoadMore: true });
    let { pageHistory, listHistory } = this.state;
    pageHistory++;

    let res = await Api.getLatestManga({ page: pageHistory });

    if (res && res.status === 200) {
      listHistory = [...listHistory, ...res.data.listManga];
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isHistoryLoadMore: false, pageHistory, listHistory });
  };

  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={this.state}
          renderPager={props => <PagerScroll {...props} />}
          renderScene={({ route, jumpTo }) => {
            switch (route.key) {
              case 'follow':
                return this.renderContenOfTabView(this.state.listFollow, this.state.isFollowLoadFirst, this.state.isFollowLoadMore, this.getMoreFollowmanga);
              case 'download':
                return this.renderContenOfTabView(
                  this.state.listDownload,
                  this.state.isDownloadLoadFirst,
                  this.state.isDownloadLoadMore,
                  this.getMoreDownloadManga
                );
              case 'history':
                return this.renderContenOfTabView(
                  this.state.listHistory,
                  this.state.isHistoryLoadFirst,
                  this.state.isHistoryLoadMore,
                  this.getMoreHistoryManga
                );
            }
          }}
          onIndexChange={this.onChangeTab}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    );
  }
}

export default MyProfile;
