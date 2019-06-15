import React, { PureComponent } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import MangaItem from '../MangaItem';
const { width } = Dimensions.get('window');

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
      <View key={item._id}>
        <MangaItem
          componentId={this.props.componentId}
          index={index}
          item={item}
        />
      </View>
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
      <View style={{ flex: 1, width: width }}>
        <FlatList
          data={this.props.listManga ? this.props.listManga : []}
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
