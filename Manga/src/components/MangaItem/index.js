import React, { PureComponent } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import Lang from '../../Language';
import { pushDetailScreen } from '../../screens';
import { Navigation } from 'react-native-navigation';

class MangaItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item, componentId, elementId } = this.props;
    return (
      <TouchableOpacity
        onPress={e => {
          pushDetailScreen({ componentId, elementId, manga: item });
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 10,
          marginTop: 10,
          borderWidth: 0.5,
          borderRadius: 5,
          borderColor: '#ddd'
        }}>
        <Navigation.Element elementId={`manga_` + item._id} resizeMode="cover">
          <View>
            <FastImage
              source={{ uri: item.thumbnail }}
              style={{
                width: 100,
                height: 120,
                borderRadius: 5,
                borderWidth: 0.3
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </Navigation.Element>

        {/* <FastImage
          source={{ uri: item.thumbnail }}
          style={{ width: 100, height: 120, borderRadius: 5, borderWidth: 0.3 }}
          resizeMode={FastImage.resizeMode.cover}
        /> */}
        <View style={{ flex: 1, paddingTop: 5, paddingLeft: 10 }}>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              fontWeight: 'bold',
              paddingBottom: 5
            }}
            numberOfLines={1}>
            {item.name}
          </Text>
          <Text
            style={{ flex: 1, fontSize: 14, paddingBottom: 5 }}
            numberOfLines={1}>
            <Text style={{ fontWeight: '600' }}>
              {Lang.getByKey('manga_item_author')}
            </Text>
            {':  ' + item.author}
          </Text>
          <Text
            style={{ flex: 1, fontSize: 14, paddingBottom: 5 }}
            numberOfLines={1}>
            <Text style={{ fontWeight: '600' }}>
              {Lang.getByKey('manga_item_category')}
            </Text>
            {':  ' + item.category}
          </Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text style={{ fontSize: 14 }} numberOfLines={1}>
              <Text style={{ fontWeight: '600' }}>
                {Lang.getByKey('manga_item_latest_chapter')}
              </Text>
              {':  ' + item.latestChapter}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MangaItem;
