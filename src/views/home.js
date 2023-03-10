import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import ButtonEx from '../components/button/buttonEx';
import ChartView from '../components/charts/chartVIew';
import {useState} from 'react';
import axios from 'axios';
import * as Api from '../constants/api';
import Weather from '../components/weather/weather';
import AuthContext from '../components/context';

export default function Home({navigation}) {
  const [product, setProduct] = useState({
    username: 'duck',
    password: 'Abcd@1234',
    device_id: 'window',
  });
  const [news, setNews] = useState([]);
  const newsStatical = [];

  useEffect(() => {
    axios
      .get(Api.apiNewsStatical)
      .then(res => {
        console.log('res', res.data.content);
        setNews([news, ...res.data.content]);
        // newsStatical = res.data.content;
        console.log(news);
        for (let index = 0; index < news.length; index++) {
          const element = news[index];
          newsStatical.push(element.totalViews);
        }
        console.log(newsStatical);
      }, [])
      .catch(err => {
        console.log(Api.apiNews);
        console.log(err);
      });
  }, []);
  function handleSubmit() {
    alert('hehe');
  }
  // const {userLogin} = React.useContext(AuthContext);
  // console.log('userLogin: ', userLogin);
  return (
    <>
      <View style={styles.parentView}>
        {/* <Image
          style={styles.tinyLogoLogin}
          source={require('../images/logo.png')}
        /> */}
        <View style={styles.tinyLogo}>
          {/* <ButtonEx
            title="Nhấn vào đây"
            width="100%"
            backgroundCl="#ddab46"
            // onPress={() => navigation.navigate('Register')}
            onPress={() => handleSubmit()}
          /> */}
          <Weather
            title="Nhấn vào đây"
            width="100%"
            backgroundCl="#ddab46"
            dataChart={newsStatical}
            // onPress={() => navigation.navigate('Register')}
            onPress={() => handleSubmit()}
          />
          <ChartView
            title="Nhấn vào đây"
            width="100%"
            backgroundCl="#ddab46"
            dataChart={newsStatical}
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
    height: 63,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
  tinyLogo: {
    margin: 10,
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
  },
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
