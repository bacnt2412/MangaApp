import { Platform } from 'react-native';
import Funcs from './funcs';

export default class Const {
  static NAME_SCREEN = {
    HOME: 'bacnt.Home',
    MYPROFILE: 'bacnt.MyProfile',
    COMMUNITY: 'bacnt.Comunity',
    LIBRARY: 'bacnt.Library',
    MANGA_DETAIL: 'bacnt.MangaDetail',
    CHAPTER_DETAIL: 'bacnt.ChapterDetail'
  };

  static ID_SCREEN = {
    BOTTOM_TAB: 'BOTTOM_TAB',
    HOME: 'HOME_SCREEN',
    MYPROFILE: 'MYPROFILE_SCREEN',
    COMMUNITY: 'COMMUNITY_SCREEN',
    LIBRARY: 'LIBRARY_SCREEN',
    MANGA_DETAIL: 'MANGA_DETAIL_SCREEN',
    CHAPTER_DETAIL: 'CHAPTER_DETAIL_SCREEN'
  };

  static UI = {
    PADDING_TOP: Funcs.isIphoneX() ? 50 : Platform.OS === 'android' ? 0 : 20,
    BORDER_WIDTH_ICON_FLAG: Platform.OS === 'android' ? 0.4 : 0.5
  };
  static COLOR = {
    LOADDING: '#4286f4'
  };
  static PAGE_LIMIT = 10;
}
