import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import ButtonEx from '../components/button/buttonEx';
import TableEx from '../components/table/table';
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
  },
  tinyLogo: {
    width: 150,
    height: 63,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  parentView: {
    backgroundColor: 'white',
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
});

var payments = [];

for (let i = 0; i < payments.length; i++) {
  payments.push(
    <View key={i}>
      <View>
        <TextInput />
      </View>
      <View>
        <TextInput />
      </View>
      <View>
        <TextInput />
      </View>
    </View>,
  );
}

export default function Register({navigation}) {
  return (
    <ScrollView style={styles.parentView}>
      {/* <ImageBackground
        style={styles.parentView}
        source={require('../assets/images/background.jpg')}> */}
      {/* <View style={styles.tinyLogo}>
          <ButtonEx
            title="Back"
            backgroundCl="#592E42"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.tinyLogo}>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder="Tên Đăng Nhập"
            keyboardType="ascii-capable"
          />
          <ButtonEx title="Lever 2" backgroundCl="#D98841" />
        </View> */}
      <TableEx></TableEx>
      {/* <View style={styles.tinyLogo}>{buttonFirst}</View> */}
      {/* </ImageBackground> */}
    </ScrollView>
  );
}
