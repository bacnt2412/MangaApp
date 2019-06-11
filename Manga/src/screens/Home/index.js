import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import BaseScreen from '../../components/BaseScreen';
const FirstRoute = () => <View style={[styles.scene]} />;

const SecondRoute = () => <View style={[styles.scene]} />;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

export default class Home extends BaseScreen {
  static options = {
    topBar: {
      visible: true,
      animate: false, // Controls whether TopBar visibility changes should be animated
      hideOnScroll: true,
      drawBehind: false,
      testID: 'topBar',
      title: {
        text: 'Home',
        fontSize: 20,
      },
     
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [{ key: 'first', title: 'First' }, { key: 'second', title: 'Second' }]
    };
  }
  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
