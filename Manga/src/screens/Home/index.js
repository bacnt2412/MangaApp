import React from 'react';
import { View, Dimensions, PermissionsAndroid } from 'react-native';
import { TabView, PagerScroll, TabBar } from 'react-native-tab-view';
import { ListManga, Loading } from '../../components';
import BaseScreen from '../../components/BaseScreen';
import Api from '../../services/api.js';
import Lang from '../../Language';
import styles from './styles';
import Const from '../../utils/const';
import Analytic from '../../utils/analytic';
import ListCategory from './ListCategory';
import RNFS from 'react-native-fs';

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
      ]
    };
  }

  componentDidMount = async ()=> {
    Analytic.sendScreen('HomeScreen');
  }

  getLatestManga = async data => {
    let res = await Api.getLatestManga(data);
    return res;
  };

  getMostFavoriteManga = async data => {
    return await Api.getMostFavoriteManga(data);
  };

  getMostViewManga = async data => {
    return await Api.getMostViewManga(data);
  };

  renderContenOfTabView = getData => {
    return (
      <View style={{ flex: 1 }}>
        <ListManga getData={getData} componentId={Const.ID_SCREEN.HOME} />
      </View>
    );
  };

  onChangeTab = index => {
    this.setState({ index });
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
                return this.renderContenOfTabView(this.getLatestManga);
              case 'favorite':
                return this.renderContenOfTabView(this.getMostFavoriteManga);
              case 'view':
                return this.renderContenOfTabView(this.getMostViewManga);
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
