import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

class CountView extends PureComponent {
  render() {
    const { count, type } = this.props;
    return (
      <View style={[{ flexDirection: 'row' }, {...this.props.style}]}>
        <Text
          style={{
            fontWeight: '100',
            fontSize: 16,
            color: '#B5B5B5',
            paddingBottom: 4
          }}>
          {count ? count + '  ' : '0  '}
        </Text>
        {type && type === 'view' ? (
          <Icon name={'eye'} size={20} color={'white'} />
        ) : (
          <Icon name={'heart'} size={20} color={'red'} />
        )}
      </View>
    );
  }
}

export default CountView;
