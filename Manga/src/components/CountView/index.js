import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles';

class CountView extends PureComponent {
  render() {
    const { count, type } = this.props;
    return (
      <View style={[styles.container, { ...this.props.style }]}>
        <Text style={styles.title}>{count ? count + '  ' : '0  '}</Text>
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
