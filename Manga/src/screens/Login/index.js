import React, { PureComponent } from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import images from '../../assets/images';
import { TextInput } from 'react-native-gesture-handler';
import Lang from '../../Language';
import Api from '../../services/api';
import AsynStorage from '@react-native-community/async-storage';
import { StartApplication } from '../index';
import Ultils from '../../utils/utils';
import { Navigation } from 'react-native-navigation';
import Const from '../../utils/const';

class LoginScreen extends PureComponent {
  static options = {
    topBar: {
      visible: false,
      drawBehind: true,
      title: {
        text: Lang.getByKey('login_title'),
        fontSize: 20
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    };
  }

  componentDidMount = async () => {
    console.log(
      ' ############################## userData',
      await AsynStorage.getItem('USERDATA')
    );
  };

  onChangeTextEmail = text => {
    this.setState({ email: text });
  };

  onChangeTextPassword = text => {
    this.setState({ password: text });
  };

  onLoginPress = async () => {
    try {
      this.setState({ isLoading: true });
      let { email, password } = this.state;
      email = email.toLocaleLowerCase();
      let res = await Api.login({ email, password });
      if (res && res.status === 200 && res.data.success) {
        let token = res.data.token;
        let userData = { token, email, password };
        await AsynStorage.setItem('USERDATA', JSON.stringify(userData));
        Ultils.userData = res.data.userData;
        Ultils.userData.listIdMangaFollow = Ultils.userData.listIdMangaFollow
          ? JSON.parse(Ultils.userData.listIdMangaFollow)
          : [];
        StartApplication();
      } else {
        let error = res.error.response.data.message;
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
    this.setState({ isLoading: false });
  };

  onRegisterPress = () => {
    Navigation.push(Const.ID_SCREEN.LOGIN_SCREEN, {
      component: {
        id: Const.ID_SCREEN.REGISTER_SCREEN,
        name: Const.NAME_SCREEN.REGISTER_SCREEN
      }
    });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <ImageBackground source={images.bg_login} style={styles.container}>
        <SafeAreaView style={styles.safe_area_view}>
          <View style={styles.content_container}>
            <TextInput
              style={styles.email_input_text}
              placeholder={Lang.getByKey('login_email_placeholder')}
              onChangeText={this.onChangeTextEmail}
            />
            <TextInput
              style={styles.password_input_text}
              placeholder={Lang.getByKey('login_password_placeholder')}
              secureTextEntry={true}
              onChangeText={this.onChangeTextPassword}
            />
            <TouchableOpacity
              disabled={isLoading}
              style={styles.btn_login}
              onPress={this.onLoginPress}>
              <Text style={styles.btn_login_text}>
                {Lang.getByKey('login_btn_login')}
              </Text>
              {isLoading && <ActivityIndicator size={'small'} color={'#fff'} />}
            </TouchableOpacity>
          </View>
          <View style={styles.container_register}>
            <Text style={styles.text_or}>---------- Hoặc ----------</Text>
            <TouchableOpacity
              disabled={isLoading}
              style={styles.btn_register}
              onPress={this.onRegisterPress}>
              <Text style={styles.btn_register_text}>
                {Lang.getByKey('login_btn_register')}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    opacity: 0.7
  },
  safe_area_view: {
    flex: 1
  },
  content_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120
  },
  email_input_text: {
    borderWidth: 1,
    borderColor: 'gray',
    width: (width * 2) / 3,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0
  },
  password_input_text: {
    borderWidth: 1,
    borderColor: 'gray',
    width: (width * 2) / 3,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  btn_login: {
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 255,0.9)',
    width: (width * 2) / 3,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row'
  },
  btn_login_text: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5
  },
  container_register: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btn_register: {
    marginTop: 10,
    backgroundColor: 'rgba(117, 186, 255,0.8)',
    width: (width * 2) / 3,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  btn_register_text: {
    color: '#00ff04',
    fontWeight: 'bold'
  },
  text_or: {
    color: '#fff'
  }
});

export default LoginScreen;
