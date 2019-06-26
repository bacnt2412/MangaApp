import React, { PureComponent } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Lang from '../../../Language';
import Icon from 'react-native-vector-icons/AntDesign';
import { ListManga } from '../../../components/ListManga';

class SearchScreen extends PureComponent {
  static options = {
    topBar: {
      visible: true,
      animate: true,
      testID: 'topBar',
      title: {
        text: 'Search',
        fontSize: 20
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      textSearch: '',
      listManga: []
    };
  }

  onChangeTextSearch = text => {
    this.setState({ textSearch: text });
  };

  onClearText = () => {
    this.setState({ textSearch: '' });
  };

  render() {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 40,
            paddingHorizontal: 15,
            paddingRight: 30,
            shadowOpacity: 0.7,
            shadowRadius: 5,
            shadowColor: '#b3b5b7',
            shadowOffset: { height: 2, width: 0 },
            flexDirection: 'row',
            elevation: 1
          }}>
          <TextInput
            placeholder={'Search'}
            style={{ fontSize: 15, flex: 1 }}
            onChangeText={this.onChangeTextSearch}
            value={this.state.textSearch}
          />
          {this.state.textSearch ? (
            <TouchableOpacity
              onPress={this.onClearText}
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                right: 10,
                top: 0,
                bottom: 0,
                padding: 5
              }}>
              <Icon name={'close'} size={20} color={'gray'} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View>
            {/* <ListManga /> */}
        </View>
      </View>
    );
  }
}

export default SearchScreen;
