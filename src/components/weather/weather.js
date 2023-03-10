import {View, Dimensions, Text, StyleSheet} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import SVGSun from '../../assets/svg/sun.svg';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;

import axios from 'axios';
import * as Api from '../../constants/api';

const screenWidth = Dimensions.get('window').width - 20;
const chartConfig = {
  backgroundColor: 'black',
  backgroundGradientFrom: 'black',
  backgroundGradientTo: 'black',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};
export default function Weather({
  onPress,
  title,
  backgroundCl,
  dataChart,
  width,
}) {
  const [weather, setWeather] = useState();
  const newsStatical = [];

  useEffect(() => {
    console.log('hêhe');
    axios
      .get(Api.apiWeather)
      .then(res => {
        setWeather(res.data);
        console.log(res);
      }, [])
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.chartParent}>
      {weather != null ? (
        <View style={styles.weather}>
          <SVGSun style={styles.sun} fill={'#483420'} />
          <Text
            style={
              (styles.weatherInfor,
              {fontSize: 32, color: 'white', marginTop: 5})
            }>
            {(weather.main.temp - 273.15).toFixed(0)}°
          </Text>
          <Text style={{fontSize: 12, color: 'white'}}>
            {(weather.main.temp_min - 273.15).toFixed(0)}° /{' '}
            {(weather.main.temp_max - 273.15).toFixed(0)}°
          </Text>
          <Text style={{fontSize: 12, color: 'white'}}>
            Cảm Giác Như: {(weather.main.feels_like - 273.15).toFixed(0)}°
          </Text>
          {/* <Text >{{today| date: 'EEEE d/M/y H:mm:ss'}}</Text> */}
          <Text style={{fontSize: 25, color: 'white', marginTop: 10}}>
            Đà Nẵng
          </Text>
          <Text style={{fontSize: 12, color: 'white'}}>
            Độ Ẩm: {weather.main.humidity}%
          </Text>
        </View>
      ) : (
        <View>
          <Text>Không có data</Text>
        </View>
      )}
      {/* <Text>{weather.main.temp - 273.15}°</Text>
      <Text>
        {weather.temp_min}° / {weather.temp_max}°
      </Text> */}
      {/* <div class="weatherWidgetRow" style="font-size: 12px;">Cảm Giác Như: {{WeatherData.temp_feels_like}}°</div>
    <div class="weatherWidgetRow" style="font-size: 15px;">{{today| date: 'EEEE d/M/y H:mm:ss'}}</div>
    <div class="weatherWidgetRow" style="font-size: 25px;margin-top: 10px;">Đà Nẵng</div>
    <div class="weatherWidgetRow" style="font-size: 12px;">Độ Ẩm: {{WeatherData.main.humidity}}%</div> */}
    </View>
  );
}

const styles = StyleSheet.create({
  chartParent: {
    // width: 500,
  },
  weather: {
    // display: 'block',
    /* border-radius: 10px; */
    // width: '100%',
    height: 250,
    backgroundColor: 'black',

    alignItems: 'center',
    // background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(8,7,42,1) 75%, rgb(8, 10, 63) 100%),
    // color: white,
    // fonT: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif,
  },
  weatherInfor: {
    color: 'white',
  },
  sun: {
    marginTop: 10,
  },
});
