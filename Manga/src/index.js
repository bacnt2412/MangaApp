import { Navigation } from 'react-native-navigation';
import { Screens, StartApplication, startLogin } from './screens';
import AsynStorage from '@react-native-community/async-storage';
import Api from './services/api';
import Ultils from './utils/utils';

registerAppLaunchedListener = async () => {
  try {
    let userData = await AsynStorage.getItem('USERDATA');
    userData = JSON.parse(userData);

    console.log(' ## userData', userData);

    let res = await Api.login({
      email: userData.email,
      password: userData.password
    });
    console.log(' ## Auto Login', res);

    if (res && res.status === 200 && res.data.success) {
      userData.token = res.data.token;
      await AsynStorage.setItem('USERDATA', JSON.stringify( userData ));
      Ultils.userData = res.data.userData;
      StartApplication();
    } else {
      startLogin();
    }
  } catch (error) {
    console.log(' ## eror ', error);
    startLogin();
  }
};

Screens.forEach((ScreenComponent, key) => {
  Navigation.registerComponent(key, () => ScreenComponent);
});

Navigation.events().registerAppLaunchedListener(registerAppLaunchedListener);
