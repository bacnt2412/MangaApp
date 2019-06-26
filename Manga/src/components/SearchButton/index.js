import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import Const from '../../utils/const';

class SearchButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          Navigation.push(this.props.componentIdParent, {
            component: {
              name: Const.NAME_SCREEN.SEARCH_SCREEN
            }
          });
        }}>
        <FastImage
          source={images.search}
          style={{ width: 25, height: 25 }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    );
  }
}

export default SearchButton;
