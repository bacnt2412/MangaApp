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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

var radio_props = [
  { label: Lang.getByKey('register_gender_male'), value: 0 },
  { label: Lang.getByKey('register_gender_female'), value: 1 }
];

class Register extends PureComponent {
  static options = {
    topBar: {
      visible: true,
      drawBehind: true,
      title: {
        text: Lang.getByKey('register_title'),
        fontSize: 20
      },
      background: {
        color: 'rgba(0,0,0,0)'
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      name: '',
      gender: 0
    };
  }

  onChangeTextEmail = text => {
    this.setState({ email: text });
  };

  onChangeTextPassword = text => {
    this.setState({ password: text });
  };

  onChangeTextName = text => {
    this.setState({ name: text });
  };

  onChangeGender = index => {
    this.setState({ gender: index });
  };

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onRegisterPress = async () => {
    try {
      let { email, password, name, gender } = this.state;
      if (!email.trim() || !password.trim() || !name.trim()) {
        alert(Lang.getByKey('register_error_message'));
        return;
      }
      if(!this.validateEmail(email)){
        alert(Lang.getByKey('register_email_error_message'));
        return;
      }
      this.setState({ isLoading: true });
      email = email.toLocaleLowerCase();
      let data = {
        email,
        password,
        name,
        gender
      };

      let res = await Api.register(data);
      if (res && res.status === 200 && res.data.success) {
        console.log(' #### Register response ', res);
        Navigation.pop(Const.ID_SCREEN.REGISTER_SCREEN);
      } else {
        let error = res.error.response.data.message;
        alert(error);
      }
    } catch (error) {
      alert(error);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <ImageBackground source={images.bg_login} style={styles.container}>
        <SafeAreaView style={styles.safe_area_view}>
          <View style={styles.content_container}>
            <View style={styles.email_input_text}>
              <Text>{Lang.getByKey('register_email') + ' : '}</Text>
              <TextInput
                style={styles.input}
                placeholder={Lang.getByKey('login_email_placeholder')}
                onChangeText={this.onChangeTextEmail}
              />
            </View>
            <View style={styles.input_text}>
              <Text>{Lang.getByKey('register_password') + ' : '}</Text>
              <TextInput
                style={styles.input}
                placeholder={Lang.getByKey('login_password_placeholder')}
                secureTextEntry={true}
                onChangeText={this.onChangeTextPassword}
              />
            </View>
            <View style={styles.input_text}>
              <Text>{Lang.getByKey('register_name') + ' : '}</Text>
              <TextInput
                style={styles.input}
                placeholder={Lang.getByKey('login_password_name')}
                onChangeText={this.onChangeTextName}
              />
            </View>
            <View style={styles.password_input_text}>
              <Text>{Lang.getByKey('register_gender') + ' : '}</Text>
              <RadioForm
                formHorizontal={true}
                animation={true}
                style={styles.radio_form}>
                {/* To create radio buttons, loop through your array of options */}
                {radio_props.map((obj, i) => {
                  return (
                    <RadioButton labelHorizontal={true} key={i}>
                      {/*  You can set RadioButtonLabel before RadioButtonInput */}
                      <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.gender === i}
                        onPress={this.onChangeGender}
                        borderWidth={1}
                        buttonInnerColor={'#2196f3'}
                        buttonOuterColor={
                          this.state.gender === i ? '#2196f3' : '#000'
                        }
                        buttonSize={16}
                        buttonOuterSize={20}
                        buttonStyle={{}}
                        buttonWrapStyle={styles.radioButton}
                      />
                      <RadioButtonLabel
                        obj={obj}
                        index={i}
                        labelHorizontal={true}
                        onPress={this.onChangeGender}
                        labelStyle={styles.radio_button_text}
                      />
                    </RadioButton>
                  );
                })}
              </RadioForm>
            </View>

            <TouchableOpacity
              disabled={isLoading}
              style={styles.btn_register}
              onPress={this.onRegisterPress}>
              <Text style={styles.btn_register_text}>
                {Lang.getByKey('register_title')}
              </Text>
              {isLoading && <ActivityIndicator size={'small'} color={'#fff'} />}
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
    paddingTop: 100
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
    borderBottomWidth: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input_text: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'gray',
    width: (width * 2) / 3,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  password_input_text: {
    borderWidth: 1,
    borderColor: 'gray',
    width: (width * 2) / 3,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
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
    alignItems: 'center'
  },
  btn_register: {
    marginTop: 10,
    backgroundColor: 'rgba(117, 186, 255,0.8)',
    width: (width * 2) / 3,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
    flexDirection: 'row'
  },
  btn_register_text: {
    color: '#00ff04',
    fontWeight: 'bold',
    marginRight: 5
  },
  text_or: {
    color: '#fff'
  },
  input: {
    flex: 1,
    height: 40
  },
  radio_form: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioButton: {
    marginLeft: 10
  },
  radio_button_text: {
    fontSize: 14
  }
});

export default Register;
