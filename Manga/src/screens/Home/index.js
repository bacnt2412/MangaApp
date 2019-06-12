import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import BaseScreen from '../../components/BaseScreen';
import ListManga from '../../components/ListManga';
import Loading from '../../components/Loading';
import Api from '../../services/api.js';
import Lang from '../../Language';

export default class Home extends BaseScreen {
  static options = {
    topBar: {
      visible: true,
      animate: true, // Controls whether TopBar visibility changes should be animated
      drawBehind: false,
      testID: 'topBar',
      title: {
        text: Lang.getByKey('home_title'),
        fontSize: 20
      }
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'new', title: Lang.getByKey('home_latest_title_tab') },
        { key: 'favorite', title: Lang.getByKey('home_most_favorite_title_tab') },
        { key: 'view', title: Lang.getByKey('home_most_view_title_tab') }
      ],
      listLatestManga: [],
      listMostFavoriteManga: [],
      listMostViewManga: [],
      isLatestMangaFirstLoading: false,
      isMostViewFirstLoading: false,
      isMostFavoriteFirstLoading: false,
      pageLatest: 1,
      pageMostFavorite: 1,
      pageMostView: 1,
      isLoadMoreLatest: true,
      isLoadMoreFavorite: false,
      isLoadMoreMostView: false
    };
  }

  componentDidMount() {
    this.getLatestManga();
  }

  getLatestManga = async () => {
    this.setState({ isLatestMangaFirstLoading: true });
    let res = await Api.getLatestManga();

    if (res && res.status === 200) {
      this.setState({ listLatestManga: res.data.listManga });
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isLatestMangaFirstLoading: false });
  };

  getMoreLatestmanga = async () => {
    console.log('################');
    this.setState({ isLoadMoreLatest: true });
    let { pageLatest, listLatestManga } = this.state;
    pageLatest++;

    let res = await Api.getLatestManga({ page: pageLatest });

    if (res && res.status === 200) {
      listLatestManga = [...listLatestManga, ...res.data.listManga];
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isLoadMoreLatest: false, pageLatest, listLatestManga });
  };

  getMostFavoriteManga = async () => {
    this.setState({ isMostFavoriteFirstLoading: true });
    let res = await Api.getMostFavoriteManga();

    if (res && res.status === 200) {
      this.setState({ listMostFavoriteManga: res.data.listManga });
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isMostFavoriteFirstLoading: false });
  };

  getMoreMostFavoriteManga = async () => {
    this.setState({ isLoadMoreFavorite: true });
    let { pageMostFavorite, listMostFavoriteManga } = this.state;
    pageMostFavorite++;

    let res = await Api.getLatestManga({ page: pageMostFavorite });

    if (res && res.status === 200) {
      listMostFavoriteManga = [...listMostFavoriteManga, ...res.data.listManga];
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isLoadMoreFavorite: false, pageMostFavorite, listMostFavoriteManga });
  };

  getMostViewManga = async () => {
    this.setState({ isMostViewFirstLoading: true });
    let res = await Api.getMostViewManga();

    if (res && res.status === 200) {
      this.setState({ listMostViewManga: res.data.listManga });
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isMostViewFirstLoading: false });
  };

  getMoreMostView = async () => {
    this.setState({ isLoadMoreMostView: true });
    let { pageMostView, listMostViewManga } = this.state;
    pageMostView++;

    let res = await Api.getLatestManga({ page: pageMostView });

    if (res && res.status === 200) {
      listMostViewManga = [...listMostViewManga, ...res.data.listManga];
    } else if (res && res.error && res.error.response.status === 403) {
      alert('Token is not valid');
    }
    this.setState({ isLoadMoreMostView: false, pageMostView, listMostViewManga });
  };

  renderListManga(listData, isLoadMore, fucGetMoreData) {
    return (
      <ScrollView style={{ flex: 1 }}>
        <ListManga listManga={listData} getMoreData={fucGetMoreData} />
        {isLoadMore ? <ActivityIndicator size={'small'} color={'#4286f4'} style={{ paddingTop: 5 }} /> : null}
      </ScrollView>
    );
  }
  renderContenOfTabView = (listData, isLoading, isLoadMore, fucGetMoreData) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? <Loading /> : this.renderListManga(listData, isLoadMore, fucGetMoreData)}
      </View>
    );
  };

  onChangeTab = index => {
    this.setState({ index });
    switch (index) {
      case 0: {
        if (this.state.listLatestManga.length === 0) {
          this.getLatestManga();
        }
        break;
      }
      case 1: {
        if (this.state.listMostFavoriteManga.length === 0) {
          this.getMostFavoriteManga();
        }
        break;
      }
      case 2: {
        if (this.state.listMostViewManga.length === 0) {
          this.getMostViewManga();
        }
        break;
      }
    }
  };
  renderContent() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={({ route, jumpTo }) => {
          switch (route.key) {
            case 'new':
              return this.renderContenOfTabView(
                this.state.listLatestManga,
                this.state.isLatestMangaFirstLoading,
                this.state.isLoadMoreLatest,
                this.getMoreLatestmanga
              );
            case 'favorite':
              return this.renderContenOfTabView(
                this.state.listMostFavoriteManga,
                this.state.isMostFavoriteFirstLoading,
                this.state.isLoadMoreFavorite,
                this.getMoreMostFavoriteManga
              );
            case 'view':
              return this.renderContenOfTabView(
                this.state.listMostViewManga,
                this.state.isMostViewFirstLoading,
                this.state.isLoadMoreMostView,
                this.getMoreMostView
              );
          }
        }}
        onIndexChange={this.onChangeTab}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}
