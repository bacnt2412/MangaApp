import { Navigation } from 'react-native-navigation';

import Community from './Community/index';
import Home from './Home/index';
import MyProfile from './MyProfile/index';
import Library from './Library/index';

import { ID_SCREEN, NAME_SCREEN } from '../utils/const';

export const Screens = new Map();
Screens.set(NAME_SCREEN.HOME, Home);
Screens.set(NAME_SCREEN.LIBRARY, Library);
Screens.set(NAME_SCREEN.MYPROFILE, MyProfile);
Screens.set(NAME_SCREEN.COMMUNITY, Community);

export const StartApplication = async () => {
  const HomeScreen = {
    stack: {
      id: ID_SCREEN.HOME,
      children: [
        {
          component: {
            name: NAME_SCREEN.HOME
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
      id: ID_SCREEN.LIBRARY,
      children: [
        {
          component: {
            name: NAME_SCREEN.LIBRARY
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
      id: ID_SCREEN.MYPROFILE,
      children: [
        {
          component: {
            name: NAME_SCREEN.MYPROFILE
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
      id: ID_SCREEN.COMMUNITY,
      children: [
        {
          component: {
            name: NAME_SCREEN.COMMUNITY
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
        id: ID_SCREEN.BOTTOM_TAB,
        children: [HomeScreen, LibraryScreen, MyProFileScreen, CommunityScreen]
      }
    }
  });
};
