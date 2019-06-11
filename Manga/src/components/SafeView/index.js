import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Const from '../../utils/const';

export default class SafeView extends PureComponent {
  render() {
    var { children, style } = this.props;
    return (
      <View {...this.props} style={[{ flex: 1, paddingTop: Const.UI.PADDING_TOP }, style]}>
        {children}
      </View>
    );
  }
}
