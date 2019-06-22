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
      link:
        'http://www.nettruyen.com/truyen-tranh/con-duong-phan-cong-cua-sung-the',
      name: 'Con Đường Phản Công Của Sủng Thê',
      rating: 0,
      status: 'Đang tiến hành',
      thumbnail:
        'http://st.nettruyen.com/data/comics/247/con-duong-phan-cong-cua-sung-the.jpg',
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
    //   this.test();
  }
  onChangeTab = index => {
    this.setState({ index });
  };

  renderContenOfTabView = getData => {
    return (
      <View style={{ flex: 1 }}>
        <ListManga getData={getData} componentId={Const.ID_SCREEN.MYPROFILE} />
      </View>
    );
  };

  renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
      scrollEnabled={false}
    />
  );

  getDataFollow = async data => {
    return await Api.getFollowManga(data);
  };

  getDataHistory = async data => {
    return await Api.getHistoryManga(data);
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
                return this.renderContenOfTabView(
                  this.getDataFollow
                );
              case 'download':
                return this.renderContenOfTabView(
                  
                );
              case 'history':
                return this.renderContenOfTabView(this.getDataHistory);
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
