import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

export default class Const {
  static DOCUMENT = {
    FOLDER_APP: RNFS.DocumentDirectoryPath + '/MangaApp'
  };
  static APP = {
    NAME: 'Songoku'
  };

  static NAME_SCREEN = {
    HOME: 'bacnt.Home',
    MYPROFILE: 'bacnt.MyProfile',
    COMMUNITY: 'bacnt.Comunity',
    FOLLOW: 'bacnt.Follow',
    MANGA_DETAIL: 'bacnt.MangaDetail',
    CHAPTER_DETAIL: 'bacnt.ChapterDetail',
    LIST_MANGA_SCREEN: 'bacnt.ListMangaScreen',
    DOWNLOAD_BUTTON: 'bacnt.DownloadButton',
    HEART_BUTTON: 'bacnt.HeartButton',
    SEARCH_BUTTON: 'bacnt.SearchButton',
    SEARCH_SCREEN: 'bacnt.SearchScreen',
    LOGIN_SCREEN: 'bacnt.LoginScreen',
    REGISTER_SCREEN: 'bacnt.RegisterScreen',

  };

  static ID_SCREEN = {
    BOTTOM_TAB: 'BOTTOM_TAB',
    HOME: 'HOME_SCREEN',
    MYPROFILE: 'MYPROFILE_SCREEN',
    COMMUNITY: 'COMMUNITY_SCREEN',
    FOLLOW: 'FOLLOW_SCREEN',
    MANGA_DETAIL: 'MANGA_DETAIL_SCREEN',
    CHAPTER_DETAIL: 'CHAPTER_DETAIL_SCREEN',
    LIST_MANGA_SCREEN: 'LIST_MANGA_SCREEN',
    DOWNLOAD_BUTTON: 'DOWNLOAD_BUTTON',
    HEART_BUTTON: 'HEART_BUTTON',
    SEARCH_BUTTON: 'SEARCH_BUTTON',
    SEARCH_SCREEN: 'SEARCH_SCREEN',
    LOGIN_SCREEN: 'LOGIN_SCREEN',
    REGISTERSCREEN: 'REGISTERSCREEN'
  };

  static COLOR = {
    LOADDING: '#4286f4'
  };
  static PAGE_LIMIT = 10;
}
