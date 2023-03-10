import React, {useEffect, useState} from 'react';
import * as Api from '../constants/api';
import {View, StyleSheet, Text, TextInput, Image} from 'react-native';
import axios from 'axios';
import ButtonEx from '../components/button/buttonEx';
import SVGImg from '../assets/svg/user.svg';
import SVGUnlock from '../assets/svg/unlock.svg';
import Users from '../model/users';
import {AuthContext} from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {addEditDeleteTodo} from '../store/todos';

export default function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    username: 'duck',
    password: 'Abcd@1234',
    device_id: 'window',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = React.useContext(AuthContext);

  function handleSubmit() {
    console.log('login');
    console.log(product);

    axios
      .get(Api.inforUser + username)
      .then(res => {
        console.log('Res user infor :', res.data);
        signIn(res.data);
        dispatch(addEditDeleteTodo(res.data));
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .post(Api.login, {
        accountName: username,
        password: password,
      })
      .then(res => {
        console.log('Res login :', res.data.userName);
        signIn(res.data);
        // dispatch(addEditDeleteTodo(res.data.userName));
        navigation.navigate('Home');
        if (res.data.token != null) {
          navigation.push('Tab');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const onchangeUsername = value => {
    setUsername(value);
  };

  const onchangePassword = value => {
    setPassword(value);
  };
  return (
    <>
      <View style={styles.parentView}>
        <Image
          style={styles.tinyLogoLogin}
          source={require('../images/logob.png')}
        />
        <View style={styles.formInput}>
          <Text style={styles.textLabel}>Tên người dùng hoặc email</Text>
          <View style={styles.sectionStyle}>
            <SVGImg style={styles.imageStyle} fill={'#483420'} />
            <TextInput
              style={{flex: 1}}
              placeholder="Tên người dùng hoặc email"
              underlineColorAndroid="transparent"
              value={username}
              onChangeText={onchangeUsername}
            />
          </View>
          <Text style={styles.textLabel}>Mật khẩu</Text>
          <View style={styles.sectionStyle}>
            <SVGUnlock style={styles.imageStyle} fill={'#483420'} />
            <TextInput
              secureTextEntry={true}
              style={{flex: 1}}
              placeholder="Mật khẩu"
              underlineColorAndroid="transparent"
              value={password}
              onChangeText={onchangePassword}
            />
          </View>
        </View>
        {/* <View style={styles.tinyLogo}>
          <ButtonEx
            title="Lever 1"
            backgroundCl="#592E42"
            onPress={() => navigation.goBack()}
          />
        </View> */}
        {/* <View style={styles.tinyLogo}>{buttonFirst}</View> */}
        <View style={styles.tinyLogo}>
          <ButtonEx
            title="Đăng Nhập"
            width="100%"
            backgroundCl="#ddab46"
            // onPress={() => navigation.navigate('Register')}
            onPress={() => handleSubmit()}
          />
        </View>
        {/* <View style={styles.tinyLogo}>
          <ButtonEx
            title="Lever 4"
            backgroundCl="#BF665E"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  tinyLogoLogin: {
    width: 150,
    height: 83,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
  tinyLogo: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',
    margin: 10,
    // backgroundColor: '#fff',
    // borderWidth: 0.5,
    // borderColor: '#000',
    // height: 40,
    // borderRadius: 5,
    // margin: 10,
  },
  logo: {
    width: 66,
    height: 58,
  },
  parentView: {
    backgroundColor: 'black',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  buttonBack: {
    width: 150,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginTop: 50,
    backgroundColor: '#732751',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    justifyContent: 'center',
    elevation: 5,
  },
  cutomText: {
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'white',
    fontWeights: '900',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#192E42',
    // borderBottomColor: '#000000',
    // borderBottomWidth: 1,
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   margin: 10,
  // },
  sectionStyle: {
    // width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 45,
    borderRadius: 5,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  formInput: {
    marginTop: 100,
  },
  textLabel: {
    color: '#F2E4D8',
    marginLeft: 10,
  },
});
