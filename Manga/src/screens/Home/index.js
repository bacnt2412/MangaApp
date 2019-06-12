import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import BaseScreen from '../../components/BaseScreen';
import ListManga from '../../components/ListManga';
import Loading from '../../components/Loading';
import Api from '../../services/api.js';

export default class Home extends BaseScreen {
  static options = {
    topBar: {
      visible: true,
      animate: true, // Controls whether TopBar visibility changes should be animated
      drawBehind: false,
      testID: 'topBar',
      title: {
        text: 'Home',
        fontSize: 20
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [{ key: 'new', title: 'Latest New' }, { key: 'favorite', title: 'Most Favorite' }, { key: 'view', title: 'Most View' }],
      listLatestManga: [],
      listMostFavoriteManga: [],
      listMostViewManga: [],
      isLatestMangaFirstLoading: false,
      isMostViewFirstLoading: false,
      isMostFavoriteFirstLoading: false
    };
  }

  componentDidMount() {
    this.getListManga();
  }

  getListManga = async () => {
    this.setState({ isLatestMangaFirstLoading: true });
    let res = await Api.getLatestManga();

    if (res && res.status === 200) {
      console.log('############################ res', res.data.data);
      this.setState({ listLatestManga: res.data.data });
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isLatestMangaFirstLoading: false });
  };

  renderContenOfTabView = (listData, isLoading) => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{isLoading ? <Loading /> : <ListManga listManga={listData} />}</View>;
  };

  onChangeTab = index => {
    this.setState({ index });

    console.log('##############', index);
    switch (index) {
      case 0: {
        if (this.state.listLatestManga) break;
      }
      case 1:
        break;
      case 2:
        break;
    }
  };
  renderContent() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={({ route, jumpTo }) => {
          switch (route.key) {
            case 'new':
              return this.renderContenOfTabView(this.state.listLatestManga, this.state.isLatestMangaFirstLoading);
            case 'favorite':
              return this.renderContenOfTabView(this.state.listMostFavoriteManga, this.state.isMostFavoriteFirstLoading);
            case 'view':
              return this.renderContenOfTabView(this.state.listMostViewManga, this.state.isMostViewFirstLoading);
          }
        }}
        onIndexChange={this.onChangeTab}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}
