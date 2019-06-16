import React, { PureComponent } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import MangaItem from '../MangaItem';
export default class ListManga extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  keyExtractor = item => {
    return item._id && item._id.toString();
  };

  renderItem = ({ index, item }) => {
    if (!item._id) {
      return <View key={213} />;
    }
    return (
      <MangaItem
        componentId={this.props.componentId}
        elementId={`manga_` + item._id}
        index={index}
        item={item}
      />
    );
  };

  onMomentumScrollBegin = () => {
    this.onEndReachedCalledDuringMomentum = false;
  };

  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.props.getMoreData ? this.props.getMoreData() : null;
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.props.listManga}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
          scrollEventThrottle={160}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onEndReached={this.onEndReached}
        />
      </View>
    );
  }
}
