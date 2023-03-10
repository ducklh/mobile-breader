/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, StyleSheet} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AsyncStorage} from 'react-native';
import Splash from './src/views/splashScreen';
import Home from './src/views/home';
import LoginScreen from './src/views/loginScreen';
import Register from './src/views/register';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext, UserConsumer} from './src/components/context';
import SVGImg from './src/assets/svg/user.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SVGUnlock from './src/assets/svg/unlock.svg';
import SVGHome from './src/assets/svg/home.svg';
import SVGNews from './src/assets/svg/news.svg';
import News from './src/views/news';
import NewsDetails from './src/views/newsDetails';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabNavigator from './src/navigator/tab';
import store from './src/store';
import {Provider} from 'react-redux';

const Stack = createNativeStackNavigator();

// const [token, settoken] = useState('');
const isLogin = true;

const Tab = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();
const App = () => {
  useEffect(() => {
    // Update the document title using the browser API
    console.log(loginState);
  });
  const initialLoginState = {
    isLoading: true,
    userName: null,
    token: null,
  };

  const loginReducer = (prevState, action) => {
    console.log(loginState);
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          token: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          token: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          token: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        console.log(loginState);
        console.log('da vao singin');
        console.log(foundUser);
        // settoken('fgkj');
        // setIsLoading(false);
        const token = String(foundUser.token);
        const userName = foundUser.name;

        try {
          await AsyncStorage.setItem('token', token);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', token);
        dispatch({type: 'LOGIN', userName: userName, token: token});
      },
      signOut: async () => {
        // settoken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('token');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // settoken('fgkj');
        // setIsLoading(false);
      },
      // toggleTheme: () => {
      //   setIsDarkTheme(isDarkTheme => !isDarkTheme);
      // },
    }),
    [],
  );

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {/* {loginState.token == null ? ( */}
          <Stack.Navigator
            initialRouteName={loginState.token != null ? 'Tab' : 'Splash'}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen
              name="NewsDetails"
              component={NewsDetails}
              screenOptions={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                title: 'My home',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </Stack.Navigator>
          {/* ) : (
          <> */}
          {/* <TabTop.Navigator>
              <TabTop.Screen name="Home" component={Home} />
              <TabTop.Screen name="Settings" component={Register} />
            </TabTop.Navigator> */}

          {/* <Tab.Navigator
              screenOptions={{
                // headerShown: false,
                title: 'BREEDER',
                headerStyle: {
                  backgroundColor: 'white',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
              }}>
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarLabel: 'Home',
                  tabBarIcon: ({color, size}) => <SVGHome fill={'#483420'} />,
                }}
              />
              <Tab.Screen
                name="BREEDER"
                component={News}
                options={{
                  tabBarLabel: 'News',
                  tabBarIcon: ({color, size}) => <SVGNews fill={'#483420'} />,
                }}
              />
              <Tab.Screen
                name="Register"
                component={Register}
                options={{
                  tabBarLabel: 'Register',
                  tabBarIcon: ({color, size}) => <SVGNews fill={'#483420'} />,
                }}
              />
              <Tab.Screen
                name="NewsDetails"
                component={NewsDetails}
                options={{
                  tabBarStyle: {display: 'none'},
                  tabBarLabel: 'NewsDetails',
                  tabBarIcon: ({color, size}) => <SVGNews fill={'#483420'} />,
                }}
              />
            </Tab.Navigator>
          </>
        )} */}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
};
export default App;
