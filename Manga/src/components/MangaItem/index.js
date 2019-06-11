import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

class MangaItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row',paddingHorizontal: 10, paddingTop: 10 }}>
        <FastImage
          source={{ uri: item.thumbnail }}
          style={{ width: 100, height: 150 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text> {item.name} </Text>
      </View>
    );
  }
}

export default MangaItem;
