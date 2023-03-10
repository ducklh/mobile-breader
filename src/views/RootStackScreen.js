import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './loginScreen';
// import SignUpScreen from './SignUpScreen';

const Stack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="LoginScreen" component={SignInScreen} />
    {/* <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Register" component={Register} /> */}
  </Stack.Navigator>
);

export default RootStackScreen;
