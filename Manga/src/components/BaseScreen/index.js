import React, { PureComponent } from 'react';
import { BackHandler, Keyboard, StatusBar, View, SafeAreaView } from 'react-native';
import { SafeView } from '../SafeView';

export default class BaseScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {
    this.mounted = true;
    BackHandler.addEventListener('hardwareBackPress', this.onBack);
  }

  componentWillUnmount() {
    this.mounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.onBack);
  }

  onBack = () => {
    if (this.props.navigation) {
      const { goBack } = this.props.navigation;
      goBack();
      return true;
    }
  };

  showStatusBar() {
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content', true);
  }

  renderStatusBar() {
    return <StatusBar backgroundColor={'white'} barStyle={'dark-content'} animated={true} />;
  }

  renderContent() {
    return null;
  }

  render() {
    return (
      <SafeView style={{ flex: 1 }}>
        {this.renderStatusBar()}
        {this.renderContent()}
      </SafeView>
    );
  }

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };
}
