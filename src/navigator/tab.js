import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../views/home';
import SVGHome from '../assets/svg/home.svg';
import SVGNews from '../assets/svg/news.svg';
import News from '../views/news';
import Register from '../views/register';
import NewsDetails from '../views/newsDetails';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
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
          tabBarLabel: 'Entities',
          tabBarIcon: ({color, size}) => <SVGNews fill={'#483420'} />,
        }}
      />
      {/* <Tab.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={{
          // tabBarStyle: {display: 'none'},
          tabBarLabel: 'NewsDetails',
          tabBarIcon: ({color, size}) => <SVGNews fill={'#483420'} />,
        }}
      /> */}
    </Tab.Navigator>
  );
}
