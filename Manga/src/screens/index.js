import { Navigation } from 'react-native-navigation';

import Community from './Community/index';
import Home from './Home/index';
import MyProfile from './MyProfile/index';
import Library from './Library/index';

import Const from '../utils/const';

export const Screens = new Map();
Screens.set(Const.NAME_SCREEN.HOME, Home);
Screens.set(Const.NAME_SCREEN.LIBRARY, Library);
Screens.set(Const.NAME_SCREEN.MYPROFILE, MyProfile);
Screens.set(Const.NAME_SCREEN.COMMUNITY, Community);

export const StartApplication = async () => {
  const HomeScreen = {
    stack: {
      id: Const.ID_SCREEN.HOME,
      children: [
        {
          component: {
            name: Const.NAME_SCREEN.HOME
          }
        }
      ],
      options: {
        bottomTab: {
          text: 'Tab 2',
          icon: require('../assets/icons/home.png')
        }
      }
    }
  };

  const LibraryScreen = {
    stack: {
      id: Const.ID_SCREEN.LIBRARY,
      children: [
        {
          component: {
            name: Const.NAME_SCREEN.LIBRARY
          }
        }
      ],
      options: {
        bottomTab: {
          text: 'Tab 2',
          icon: require('../assets/icons/library.png')
        }
      }
    }
  };

  const MyProFileScreen = {
    stack: {
      id: Const.ID_SCREEN.MYPROFILE,
      children: [
        {
          component: {
            name: Const.NAME_SCREEN.MYPROFILE
          }
        }
      ],
      options: {
        bottomTab: {
          text: 'Tab 2',
          icon: require('../assets/icons/my_profile.png')
        }
      }
    }
  };

  const CommunityScreen = {
    stack: {
      id: Const.ID_SCREEN.COMMUNITY,
      children: [
        {
          component: {
            name: Const.NAME_SCREEN.COMMUNITY
          }
        }
      ],
      options: {
        bottomTab: {
          text: 'Tab 2',
          icon: require('../assets/icons/community.png')
        }
      }
    }
  };
  return Navigation.setRoot({
    root: {
      id: 'ROOT',
      bottomTabs: {
        id: Const.ID_SCREEN.BOTTOM_TAB,
        children: [HomeScreen, LibraryScreen, MyProFileScreen, CommunityScreen]
      }
    }
  });
};
