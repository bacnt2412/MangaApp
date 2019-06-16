import React, { PureComponent } from 'react';
import {
  View,
  Text,
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
import styles from './styles';

const GUTTER = 8 * 2;
const TOOLBAR_HEIGHT = 56;
const BACKDROP_HEIGHT = 240;
const POSTER_WIDTH = 100;
const POSTER_HEIGHT = 160;
const POSTER_X = BACKDROP_HEIGHT - POSTER_HEIGHT + 15;

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
      <Text onPress={onPress} style={styles.viewMore}>
        {Lang.getByKey('view_more')}
      </Text>
    );
  }
  renderViewLess(onPress) {
    return <Text />;
  }

  render() {
    const { manga } = this.props;

    const cover = (
      <Animated.View style={[styles.cover_container, this.animatedHeroStyles]}>
        <FastImage
          resizeMode="cover"
          source={{ uri: manga && manga.thumbnail }}
          style={styles.cover_image}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    );

    const avatar = (
      <View style={{ position: 'absolute', top: POSTER_X, left: GUTTER }}>
        <Navigation.Element resizeMode="cover" elementId="MANGA_DETAIL_AVATAR">
          <TouchableWithoutFeedback onPress={this.onPressAvatar}>
            <View style={styles.avatar_container}>
              {manga && manga.thumbnail && (
                <FastImage
                  resizeMode="cover"
                  style={styles.avatar_image}
                  source={{ uri: manga.thumbnail }}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </Navigation.Element>
      </View>
    );

    const detail = manga && (
      <View
        style={[
          styles.detail_container,
          { top: POSTER_X, left: POSTER_WIDTH + GUTTER }
        ]}>
        <Text style={styles.detail_name} numberOfLines={2}>
          {manga && manga.name}
        </Text>
        <TitleWithIcon title={manga.author} type={'author'} size={22} />
        <TitleWithIcon title={manga.category} type={'category'} size={20} />
        <View style={{ flexDirection: 'row' }}>
          <CountView count={manga.viewers} type={'view'} />
          <CountView
            count={manga.folowers}
            type={'red'}
            style={{ marginLeft: 30 }}
          />
        </View>
      </View>
    );

    const description = (
      <View style={styles.description_container}>
        <Text style={styles.description_title}>
          {Lang.getByKey('manga_description') + ' '}
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
              <Text>
                {'   '}
                {manga && manga.description ? manga.description : 'Updating...'}
              </Text>
            </ViewMoreText>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );

    return (
      <View style={{ flex: 1 }}>
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
          {cover}
          {avatar}
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
          {detail}

          {description}
          <ListChapter
            idManga={manga ? manga._id : null}
            componentId={this.props.componentId}
          />
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
      </View>
    );
  }
}

export default MangaDetail;
