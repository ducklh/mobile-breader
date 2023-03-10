import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ButtonEx from '../components/button/buttonEx';
import * as Api from '../constants/api';
import axios from 'axios';

var payments = [];

for (let i = 0; i < payments.length; i++) {
  payments.push(
    <View key={i}>
      <ButtonEx
        title="Back"
        backgroundCl="#592E42"
        // onPress={() => navigation.goBack()}
      />
    </View>,
  );
}
export default function News({navigation}) {
  const [news, setNews] = useState([]);
  const renderItem = ({item}) => {
    // return <Item item={item} />;
    return (
      <TouchableOpacity
        style={styles.newsLabel}
        onPress={() => goToNewsDetail(item)}>
        <Text style={styles.newsName}>{item.newsName}</Text>
        <Image source={{uri: item.image}} style={styles.newsImage} />
        <Text>{item.content}</Text>
        <Text style={styles.newInfor}>
          {item.type +
            '   ' +
            item.createdDate +
            '   ' +
            item.employee.employeeName}{' '}
        </Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    axios
      .get(Api.apiNews)
      .then(res => {
        console.log('res', res.data.content);
        setNews([...news, ...res.data.content]);
      }, [])
      .catch(err => {
        console.log(Api.apiNews);
        console.log(err);
      });
  }, []);

  const goToNewsDetail = item => {
    navigation.navigate('NewsDetails', item);
  };

  return (
    <ScrollView>
      <ImageBackground style={styles.parentView}>
        <View style={styles.tinyLogo}>
          {/* <ButtonEx
            title="Back"
            backgroundCl="#592E42"
            onPress={() => navigation.goBack()}
          /> */}
          {payments}
          {console.log({news})}
          <FlatList
            scrollEnabled
            data={news}
            enableEmptySections={true}
            keyExtractor={item => item.commentId}
            renderItem={renderItem}
          />
          {/* {news.map((item, index) => {
            // changed to the state variable
            return (
              <TouchableOpacity
                style={styles.newsLabel}
                key={index}
                onPress={() => goToNewsDetail(item)}>
                <Text style={styles.newsName}>{item.newsName}</Text>
                <Image source={{uri: item.image}} style={styles.newsImage} />
                <Text>{item.content}</Text>
                <Text style={styles.newInfor}>
                  {item.type +
                    '   ' +
                    item.createdDate +
                    '   ' +
                    item.employee.employeeName}{' '}
                </Text>
              </TouchableOpacity>
            );
          })} */}
        </View>
      </ImageBackground>
    </ScrollView>
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
  },
  tinyLogo: {
    width: '90%',
    // height: 63,
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginTop: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  parentView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  buttonBack: {
    width: 150,
    height: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
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
  newsLabel: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    // marginBottom: 10,
  },
  newsName: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginLeft: 0,
    marginTop: 5,
    marginBottom: 5,
  },
  newsImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  newInfor: {
    marginTop: 5,
    marginBottom: 5,
  },
});
