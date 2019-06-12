import React, { PureComponent } from 'react';
import { View, Text, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import Lang from '../../../Language';
import FastImage from 'react-native-fast-image';
const { width } = Dimensions.get('window');

class MangaDetail extends PureComponent {
  static options = {
    topBar: {
      visible: true,
      drawBehind: true,
      title: {
        text: Lang.getByKey('detail_manga_titile')
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
  }

  render() {
    const { manga } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <FastImage
            source={{ uri: manga.thumbnail }}
            style={{ width: width, height: 200 }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default MangaDetail;
