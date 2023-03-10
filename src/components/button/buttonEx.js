import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  appButtonContainer: {
    marginTop: 10,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    // paddingLeft: 50,
    // paddingRight: 50,
    // shadowColor: 'rgba(46, 229, 157, 0.4)',
    // shadowOpacity: 1.5,
    // elevation: 8,
    // shadowRadius: 20,
    // shadowOffset: {width: 1, height: 13},
    backgroundColor: '#F2B366',
    height: 45,
    justifyContent: 'center',
  },
  appButtonText: {
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#FFFFFF',
  },
});
export default function ButtonEx({onPress, title, backgroundCl, width}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.appButtonContainer,
        backgroundColor: backgroundCl,
        width: width,
      }}
      onPress={onPress}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}
