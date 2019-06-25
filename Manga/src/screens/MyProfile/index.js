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
import { getManga, insertManga, insertListImage } from '../../data/realm';

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

  GetDataDownload = async (page) => {
    if(page) return;
    let data = await getManga();
    let listManga = [];

    for (let manga of data) {
      let listChapter = [];
      for (let chapter of manga.listChapter) {
        let listImage = [];
        for (image of chapter.listImage) {
          listImage.push({ ...image, isLocal: true });
        }
        chapter = { ...chapter, listImage: listImage, isLocal: true };
        listChapter.push({ ...chapter });
      }
      manga = { ...manga, listChapter: listChapter, isLocal: true };
      listManga.push({ ...manga });
    }
    let res = { data: { listManga }, status: 200 };
    console.log(' ###################### GetDataDownload',res)
    return res;
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
                return this.renderContenOfTabView(this.getDataFollow);
              case 'download':
                return this.renderContenOfTabView(this.GetDataDownload);
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
