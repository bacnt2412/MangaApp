import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Community from './Community/index';
import Home from './Home/index';
import MyProfile from './MyProfile/index';
import MangaDetail from './ShareScreen/MangaDetail';
import ChapterDetail from './ShareScreen/ChapterDetail';
import Lang from '../Language';
import Const from '../utils/const';
import ListMangaScreen from './ShareScreen/ListMangaScreen';

export const Screens = new Map();
Screens.set(Const.NAME_SCREEN.HOME, Home);
Screens.set(Const.NAME_SCREEN.MYPROFILE, MyProfile);
Screens.set(Const.NAME_SCREEN.COMMUNITY, Community);
Screens.set(Const.NAME_SCREEN.MANGA_DETAIL, MangaDetail);
Screens.set(Const.NAME_SCREEN.CHAPTER_DETAIL, ChapterDetail);
Screens.set(Const.NAME_SCREEN.LIST_MANGA_SCREEN, ListMangaScreen);

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
          text: Lang.getByKey('home_title'),
          icon: require('../assets/icons/home.png')
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
          text: Lang.getByKey('profile_title'),
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
          text: Lang.getByKey('community_title'),
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
        children: [HomeScreen, MyProFileScreen, CommunityScreen]
      }
    }
  });
};

export const pushDetailScreen = ({ componentId, movieId, elementId, selectedTab, manga }) => {
  Navigation.push(componentId, {
    component: {
      name: Const.NAME_SCREEN.MANGA_DETAIL,
      passProps: {
        manga,
        componentId
      },
      options: {
        // animations: {
        //   push: {
        //     waitForRender: true,
        //     enabled: true,
        //     content: {
        //       alpha: {
        //         from: 0,
        //         to: 1,
        //         duration: 250
        //       }
        //     }
        //   }
        // }

        // customTransition: {
        //   animations: [
        //     {
        //       type: 'sharedElement',
        //       fromId: elementId,
        //       toId: 'MANGA_DETAIL_AVATAR',
        //       startDelay: 0,
        //       springVelocity: 0.9,
        //       springDamping: 0.9,
        //       duration: 500 * Platform.select({ ios: 0.001, android: 1 }),
        //       interactivePop: true
        //     }
        //   ]
        // }
      }
    }
  });
};
