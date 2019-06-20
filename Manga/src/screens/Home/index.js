import React from 'react';
import { View, Dimensions } from 'react-native';
import { TabView, PagerScroll, TabBar } from 'react-native-tab-view';
import BaseScreen from '../../components/BaseScreen';
import ListManga from '../../components/ListManga';
import Loading from '../../components/Loading';
import Api from '../../services/api.js';
import Lang from '../../Language';
import styles from './styles';
import Const from '../../utils/const';
import ListCategory from './ListCategory';

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
        {
          key: 'favorite',
          title: Lang.getByKey('home_most_favorite_title_tab')
        },
        { key: 'view', title: Lang.getByKey('home_most_view_title_tab') },
        {
          key: 'category',
          title: Lang.getByKey('home_category_title_tab')
        }
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
    this.setState({
      isLoadMoreFavorite: false,
      pageMostFavorite,
      listMostFavoriteManga
    });
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
    this.setState({
      isLoadMoreMostView: false,
      pageMostView,
      listMostViewManga
    });
  };

  renderContenOfTabView = (listData, isLoading, isLoadMore, fucGetMoreData) => {
    return (
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loading />
          </View>
        ) : null}
        <ListManga listManga={listData} getMoreData={fucGetMoreData} componentId={Const.ID_SCREEN.HOME} />
      </View>
    );
  };

  onChangeTab = index => {
    this.setState({ index });
    switch (index) {
      case 0: {
        const { listLatestManga } = this.state;
        if (listLatestManga && listLatestManga.length === 0) {
          this.getLatestManga();
        }
        break;
      }
      case 1: {
        const { listMostFavoriteManga } = this.state;
        if (listMostFavoriteManga && listMostFavoriteManga.length === 0) {
          this.getMostFavoriteManga();
        }
        break;
      }
      case 2: {
        const { listMostViewManga } = this.state;
        if (listMostViewManga && listMostViewManga.length === 0) {
          this.getMostViewManga();
        }
        break;
      }
    }
  };

  renderTabBar = props => (
    <TabBar {...props} indicatorStyle={styles.indicator} style={styles.tabbar} tabStyle={styles.tab} labelStyle={styles.label} scrollEnabled={false} />
  );

  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={this.state}
          renderPager={props => <PagerScroll {...props} />}
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
              case 'category':
                return <ListCategory />;
            }
          }}
          onIndexChange={this.onChangeTab}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </View>
    );
  }
}
