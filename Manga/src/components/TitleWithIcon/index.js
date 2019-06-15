import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class TitleWithIcon extends PureComponent {
  render() {
    const { title, type, size } = this.props;
    return (
      <View
        style={[
          { flexDirection: 'row', alignItems: 'center' },
          { ...this.props.style }
        ]}>
        {type && type === 'author' ? (
          <Icon
            name={'user'}
            size={20}
            color={'white'}
            size={size ? size : 20}
          />
        ) : (
          <Icon
            name={'tag'}
            size={20}
            color={'#B5B5B5'}
            size={size ? size : 20}
          />
        )}
        <Text
          style={{
            flex: 1,
            fontWeight: '100',
            fontSize: 17,
            color: '#B5B5B5',
            paddingBottom: 5,
            marginTop: 5
          }}
          numberOfLines={1}>
          {title ? '  ' + title : ''}
        </Text>
      </View>
    );
  }
}

export default TitleWithIcon;
