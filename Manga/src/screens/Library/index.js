import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import BaseScreen from '../../components/BaseScreen';
import Api from '../../services/api';
import { Navigation } from 'react-native-navigation';
import Const from '../../utils/const';

export class Library extends BaseScreen {
  static options = {
    topBar: {
      title: {
        text: 'Thể Loại'
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      listCategory: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ isLoading: true });
    let res = await Api.getListCategory();

    if (res && res.status === 200) {
      let data = res.data.data;
      let listData = [];
      let listItem = [];
      data.map((item, index) => {
        if (item.name != 'Tất cả thể loại') {
          if (index % 2 == 0) {
            listItem.push(item);
            if (index === data.length - 1) {
              listData.push(listItem);
            }
          } else {
            listItem.push(item);
            listData.push(listItem);
            listItem = [];
          }
        }
      });
      this.setState({ listCategory: listData, isLoading: false });
      return;
    }
    this.setState({ isLoading: false });
  };

  keyExtractor = (item, index) => {
    return index.toString();
  };

  renderItem = ({ index, item }) => {
    return <CategoryItem item={item} />;
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

  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.listCategory}
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

const colors = [
  '#4286f4',
  '#41caf4',
  '#41f48e',
  '#41f45b',
  '#91f441',
  '#f4c741',
  '#f4b541',
  '#f49d41',
  '#f47c41',
  '#f46441',
  '#f44141',
  '#f44182',
  '#f4419d',
  '#f441c7',
  '#eb41f4',
  '#425cf4',
  '#5041f4',
  '#6141f4',
  '#7041f4',
  '#8841f4',
  '#ac41f4',
  '#c441f4',
  '#41f4e2'
];

class CategoryItem extends React.PureComponent {
  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  onItemPress = item => {
    Navigation.push(Const.ID_SCREEN.LIBRARY, {
      component: {
        name: Const.NAME_SCREEN.LIST_MANGA_SCREEN,
        passProps: {
          idCategory: item._id
        },
        options: {
          topBar: {
            title: {
              text: item.name
            }
          }
        }
      }
    });
  };

  render() {
    const { item } = this.props;
    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {item.map(items => {
          let color = colors[this.getRndInteger(0, colors.length - 1)];
          return (
            <TouchableOpacity
              key={items._id}
              style={{
                flex: 1,
                padding: 10,
                backgroundColor: color,
                borderRadius: 5,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => this.onItemPress(items)}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                {items.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default Library;
