import { Navigation } from 'react-native-navigation';

import Community from './Community/index';
import Home from './Home/index';
import MyProfile from './MyProfile/index';
import { ID_MAIN_SCREEN, NAME_MAIN_SCREEN } from '../utils/const';

export const Screens = new Map();
Screens.set(NAME_MAIN_SCREEN.HOME, Home);
Screens.set(NAME_MAIN_SCREEN.MYPROFILE, MyProfile);
Screens.set(NAME_MAIN_SCREEN.COMMUNITY, Community);

export const StartApplication = async () => {
  const HomeScreen = {
    stack: {
      id: ID_MAIN_SCREEN.HOME,
      children: [
        {
          component: {
            name: NAME_MAIN_SCREEN.HOME
          }
        }
      ],
      options: {
        bottomTab: {
          text: 'Tab 2',
          icon: require('../../one.png')
        }
      }
    }
  };

  const MyProFileScreen = {
    stack: {
      id: ID_MAIN_SCREEN.MYPROFILE,
      children: [
        {
          component: {
            name: NAME_MAIN_SCREEN.MYPROFILE
          }
        }
      ],
      options: {
        bottomTab: {
          text: 'Tab 2',
          icon: require('../../one.png')
        }
      }
    }
  };

  const CommunityScreen = {
    stack: {
      id: ID_MAIN_SCREEN.COMMUNITY,
      children: [
        {
          component: {
            name: NAME_MAIN_SCREEN.COMMUNITY
          }
        }
      ],
      options: {
        bottomTab: {
          text: 'Tab 2',
          icon: require('../../one.png')
        }
      }
    }
  };
  return Navigation.setRoot({
    root: {
      id: 'ROOT',
      bottomTabs: {
        id: 'BOTTOM_TABS',
        children: [HomeScreen, MyProFileScreen, CommunityScreen]
      }
    }
  });
};
