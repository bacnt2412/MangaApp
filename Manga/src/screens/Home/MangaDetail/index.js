import React, { PureComponent } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ImageBackground,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import Lang from '../../../Language';
import FastImage from 'react-native-fast-image';
import { Navigation } from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import PhotoView from '@merryjs/photo-viewer';
import CountView from '../../../components/CountView';
import TitleWithIcon from '../../../components/TitleWithIcon';
import ViewMoreText from 'react-native-view-more-text';
import ListChapter from '../../../components/ListChapter';

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
    this.state = {
      initial: 0,
      visible: false
    };
    console.log('########### this.props', this.props);
    this.scrollY = new Animated.Value(0);
    this.animatedHeroStyles = {
      transform: [
        {
          translateY: this.scrollY.interpolate({
            inputRange: [
              -(BACKDROP_HEIGHT + TOOLBAR_HEIGHT),
              0,
              BACKDROP_HEIGHT
            ],
            outputRange: [
              -(BACKDROP_HEIGHT + TOOLBAR_HEIGHT) / 2,
              0,
              TOOLBAR_HEIGHT
            ]
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
    this.animatedTopBarStyles = {
      opacity: this.scrollY.interpolate({
        inputRange: [0, TOOLBAR_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      })
    };
  }

  onPressAvatar = () => {
    this.setState({ visible: true });
  };

  renderViewMore(onPress) {
    return (
      <Text onPress={onPress} style={{ color: '#4286f4' }}>
        View more
      </Text>
    );
  }
  renderViewLess(onPress) {
    return <Text onPress={onPress}>View less</Text>;
  }

  render() {
    const { manga } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <Animated.ScrollView
          style={{ flex: 1 }}
          testID="MOVIE_SCREEN"
          contentInsetAdjustmentBehavior="never"
          scrollEventThrottle={1}
          overScrollMode="always"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
            { useNativeDriver: true }
          )}>
          {/* Cover */}
          <Animated.View
            style={[
              { position: 'relative', marginBottom: 48 },
              this.animatedHeroStyles
            ]}>
            <FastImage
              resizeMode="cover"
              source={{ uri: manga && manga.thumbnail }}
              style={{ height: 240, opacity: 0.875 }}
            />
            <LinearGradient
              colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
          {/* Avatar */}
          <View style={{ position: 'absolute', top: POSTER_X, left: GUTTER }}>
            <Navigation.Element resizeMode="cover" elementId="MOVIE_POSTER">
              <TouchableWithoutFeedback onPress={this.onPressAvatar}>
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
                  {manga && manga.thumbnail && (
                    <FastImage
                      resizeMode="cover"
                      style={{ width: 100, height: 160, borderRadius: 3 }}
                      source={{ uri: manga.thumbnail }}
                    />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </Navigation.Element>
          </View>
          {/* Photo view zoom */}
          <PhotoView
            visible={this.state.visible}
            data={[
              {
                source: {
                  uri: manga ? manga.thumbnail : null
                }
              }
            ]}
            hideCloseButton={true}
            hideShareButton={true}
            hideStatusBar={false}
            initial={this.state.initial}
            onDismiss={() => this.setState({ visible: false })}
          />
          {/* info manga Detail */}
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
                }}
                numberOfLines={2}>
                {manga && manga.name}
              </Text>
              <TitleWithIcon title={manga.author} type={'author'} size={22} />
              <TitleWithIcon
                title={manga.category}
                type={'category'}
                size={20}
              />
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <CountView count={manga.viewers} type={'view'} />
                <CountView
                  count={manga.folowers}
                  type={'red'}
                  style={{ marginLeft: 30 }}
                />
              </View>
            </View>
          )}
          <View style={{ padding: 10 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '500',
                marginBottom: 5
              }}>
              Nội dung:{' '}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                this.refs.ViewMoreText.onPressLess();
              }}>
              <View>
              <ViewMoreText
                numberOfLines={4}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                ref={'ViewMoreText'}>
                <Text style={{ color: 'white' }}>
                  {'   '}
                  {manga && manga.description ? manga.description : ''}
                </Text>
              </ViewMoreText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          
          <ListChapter idManga={manga._id}/>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              ...this.animatedTopBarStyles
            }}>
            <View
              style={{
                height: TOOLBAR_HEIGHT,
                width: '100%',
                backgroundColor: 'black'
              }}
            />
            <LinearGradient
              colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']}
              style={{ height: TOOLBAR_HEIGHT * 2, width: '100%' }}
            />
          </Animated.View>
        </Animated.ScrollView>
      </SafeAreaView>
    );
  }
}

export default MangaDetail;
