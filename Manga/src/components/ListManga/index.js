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
    return item._id.toString();
  };

  renderItem = ({ index, item }) => {
    return <MangaItem componentId={this.props.componentId} index={index} item={item} />;
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
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onEndReached={this.onEndReached}
        />
      </View>
    );
  }
}
