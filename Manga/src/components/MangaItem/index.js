import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Lang from '../../Language';

class MangaItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginTop: 10, borderWidth: 1, borderRadius: 5 }}>
        <FastImage
          source={{ uri: item.thumbnail }}
          style={{ width: 100, height: 120, borderRadius: 5, borderWidth: 0.5 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{ flex: 1, paddingTop: 5, paddingLeft: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', paddingBottom: 5 }} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, paddingBottom: 5 }} numberOfLines={1}>
            <Text style={{ fontWeight: '600' }}>{Lang.getByKey('manga_item_author')}</Text>
            {':  ' + item.author}
          </Text>
          <Text style={{ fontSize: 14, paddingBottom: 5 }} numberOfLines={1}>
            <Text style={{ fontWeight: '600' }}>{Lang.getByKey('manga_item_category')}</Text>
            {':  ' + item.category}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ fontSize: 14 }} numberOfLines={1}>
              <Text style={{ fontWeight: '600' }}>{Lang.getByKey('manga_item_chapter')}</Text>
              {':  '}
            </Text>
            <View>
              <Text>Chap 3</Text>
              <Text>Chap 2</Text>
              <Text>Chap 1</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default MangaItem;
