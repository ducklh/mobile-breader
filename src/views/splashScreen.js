import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, View, Button} from 'react-native';
const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 93,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 150,
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
});

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(function () {
      navigation.navigate('LoginScreen');
    }, 2000);
  });
  return (
    <ImageBackground
      style={styles.parentView}
      source={require('../images/background.jpg')}>
      <View>
        <Image
          style={styles.tinyLogo}
          source={require('../images/logob.png')}
        />
        {/* <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Home')}
        /> */}
      </View>
    </ImageBackground>
  );
}

// export default Login = () => {
//   return (
//     // <ImageBackground
//     //   style={styles.parentView}
//     //   source={require('../images/background.jpg')}>

//     // </ImageBackground>
//   );
// };
