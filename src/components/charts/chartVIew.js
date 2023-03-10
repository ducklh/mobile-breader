import {View, Dimensions, Text, StyleSheet} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import React, {useState, useEffect} from 'react';

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
export default function ChartView({
  onPress,
  title,
  backgroundCl,
  dataChart,
  width,
}) {
  const [news, setNews] = useState([]);
  const newsStatical = [];

  useEffect(() => {
    axios
      .get(Api.apiNewsStatical)
      .then(res => {}, [])
      .catch(err => {
        console.log(err);
      });
  }, []);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Rainy Days'], // optional
  };
  return (
    <View style={styles.chartParent}>
      <Text>View</Text>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartParent: {
    width: 500,
  },
});
