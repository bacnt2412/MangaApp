import React, { PureComponent } from 'react';
import { View, Text, SafeAreaView, Dimensions, ScrollView, ImageBackground, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Lang from '../../../Language';
import FastImage from 'react-native-fast-image';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const GUTTER = 8 * 2;
const TOOLBAR_HEIGHT = 56;
const BACKDROP_HEIGHT = 240;
const POSTER_WIDTH = 100;
const POSTER_HEIGHT = 160;
const POSTER_X = BACKDROP_HEIGHT - POSTER_HEIGHT + 32;

class MangaDetail extends PureComponent {
  static options = {
    topBar: {
      visible: true,
      drawBehind: true,
      title: {
        text: Lang.getByKey('detail_manga_title')
      },
      layout: {
        backgroundColor: '#000000'
      },
      translucent: true,
      transparent: true
    }
  };
  constructor(props) {
    super(props);
    this.state = {};
    console.log('########### this.props', this.props);
    this.scrollY = new Animated.Value(0);
    this.animatedHeroStyles = {
      transform: [
        {
          translateY: this.scrollY.interpolate({
            inputRange: [-(BACKDROP_HEIGHT + TOOLBAR_HEIGHT), 0, BACKDROP_HEIGHT],
            outputRange: [-(BACKDROP_HEIGHT + TOOLBAR_HEIGHT) / 2, 0, TOOLBAR_HEIGHT]
          })
        },
        {
          scale: this.scrollY.interpolate({
            extrapolate: 'clamp',
            inputRange: [-(BACKDROP_HEIGHT + TOOLBAR_HEIGHT), 0],
            outputRange: [2.5, 1]
          })
        }
      ]
    };
  }

  render() {
    const { manga } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          testID="MOVIE_SCREEN"
          contentInsetAdjustmentBehavior="never"
          scrollEventThrottle={1}
          overScrollMode="always"
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], { useNativeDriver: true })}>
          <Animated.View style={[{ position: 'relative', marginBottom: 48 }, this.animatedHeroStyles]}>
            <FastImage resizeMode="cover" source={{ uri: manga && manga.thumbnail }} style={{ height: 240, opacity: 0.875 }} />
            {/* <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
              style={StyleSheet.absoluteFill} 
            />*/}
          </Animated.View>

          {/* <PhotoView
            visible={this.state.visible}
            data={[{
              source: {
                uri: movie!.posterUrlOriginal,
              },
            }]}
            hideCloseButton={true}
            hideShareButton={true}
            hideStatusBar={false}
            initial={this.state.initial}
            onDismiss={() => this.setState({ visible: false })}
          /> */}

          {manga && (
            <View
              style={[
                {
                  position: 'absolute',
                  right: 0,
                  marginLeft: 16,
                  marginRight: 16
                },
                { top: POSTER_X, left: POSTER_WIDTH + GUTTER }
              ]}>
              <Text
                style={{
                  fontWeight: '300',
                  fontSize: 25,
                  color: '#FFFFFF',
                  marginBottom: 3
                }}>
                title
              </Text>
              <Text
                style={{
                  fontWeight: '100',
                  fontSize: 17,
                  color: '#B5B5B5',
                  paddingBottom: 5
                }}
                numberOfLines={2}>
                name
              </Text>
              <Text
                style={{
                  fontWeight: '100',
                  fontSize: 16,
                  color: '#B5B5B5',
                  paddingBottom: 4
                }}>
                formatRuntime
              </Text>
            </View>
          )}

          <View style={{ position: 'absolute', top: POSTER_X, left: GUTTER }}>
            <Navigation.Element resizeMode="cover" elementId="MOVIE_POSTER">
              <TouchableWithoutFeedback onPress={this.onPosterPress}>
                <View
                  style={{
                    width: 100,
                    height: 160,
                    borderRadius: 3,
                    aspectRatio: 0.6,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    backgroundColor: 'rgba(32, 32, 32, 0.66)'
                  }}>
                  {manga && manga.thumbnail && <FastImage resizeMode="cover" style={{ width: 100, height: 160 }} source={{ uri: manga.thumbnail }} />}
                </View>
              </TouchableWithoutFeedback>
            </Navigation.Element>
          </View>

          <View style={{ height: 100 }} />
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

export default MangaDetail;
