import React, {useEffect, useLayoutEffect, useState} from 'react';
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
} from 'react-native';
import ButtonEx from '../components/button/buttonEx';
import * as Api from '../constants/api';
import axios from 'axios';
import Comment from '../components/comment/comment';

export default function NewsDetails({route, navigation}) {
  const data = route.params;
  console.log(data);
  const [newsComment, setNewsComment] = useState([]);
  const [newsId, setNewsId] = useState();
  useEffect(() => {
    console.log(data);
    setNewsId(data);
    const fetchData = async () => {
      axios
        .get(Api.apiComment + data.newsId)
        .then(res => {
          console.log(Api.apiComment + data.newsId);
          setNewsComment(res.data.content);
        }, [])
        .catch(err => {
          console.log(err);
        });
    };
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const goToNewsDetail = () => {
    alert('hehe');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    });
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <ImageBackground style={styles.parentView}>
        <View style={styles.tinyLogo}>
          {/* <ButtonEx
            title="Back"
            backgroundCl="#592E42"
            onPress={() => navigation.goBack()}
          /> */}
          <View style={styles.newsLabel}>
            <Text style={styles.newsName}>{data.newsName}</Text>
            <Image source={{uri: data.image}} style={styles.newsImage} />
            <Text style={styles.newsContent}>{data.content}</Text>
            <Text style={styles.newInfor}>
              {data.type +
                ' | ' +
                data.createdDate +
                ' | ' +
                data.employee.employeeName}{' '}
            </Text>
          </View>
          {/* <Comment></Comment> */}
          <Comment data={data.newsId} />
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
    // borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    marginBottom: 10,
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
    height: 250,
    borderRadius: 5,
  },
  newInfor: {
    // marginTop: 10,
    marginBottom: 10,
  },
  newsContent: {
    marginTop: 10,
    marginBottom: 10,
  },
});
