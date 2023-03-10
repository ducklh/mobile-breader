import React, {Component, useState, useEffect} from 'react';
import {DataTable} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import axios from 'axios';
import * as ApiEmployee from '../../constants/apiEmployee';
import SVGDel from '../../assets/svg/delete.svg';
import SVGEdit from '../../assets/svg/edit.svg';

export default function TableEx() {
  const [tableHead, setTableHead] = useState([
    'Head',
    'Head2',
    'Headdsdf3',
    'Head4',
  ]);
  useEffect(() => {
    axios
      .get(ApiEmployee.getAllEntities)
      .then(res => {
        const propertyNames = Object.keys(res.data.content[0]);
        setTableHead(propertyNames);
        const data = res.data.content;
        const tableData = [];
        for (let i = 0; i < data.length; i += 1) {
          const propertyValues = Object.values(data[i]);
          (propertyValues[6] = ''), propertyValues.splice(7);
          tableData.push(propertyValues);
        }
        console.log(tableData);
        setState(tableData);
      }, [])
      .catch(err => {
        console.log(err);
      });
  }, []);
  const [state, setState] = useState([
    ['1', '2', '3', '4'],
    ['a', 'b', 'c', 'd'],
    ['1', '2', 'd', '4'],
    ['a', 'b', 'c', 'd'],
  ]);
  const element = (data, index) => (
    <View style={styles.btnPa} onPress={() => Alert.alert(` ${data[0]}`)}>
      {/* <View style={styles.btn}>
        <Text style={styles.btnText}>Xoá</Text>
      </View>
      <View style={styles.btn}>
        <Text style={styles.btnText}>Sửa</Text>
      </View> */}
      <TouchableOpacity
        // style={styles.btnEdit}
        onPress={() => Alert.alert(` ${data[0]}`)}>
        <SVGEdit fill={'#000000'} />
      </TouchableOpacity>
      <TouchableOpacity
        // style={styles.btn}
        onPress={() => Alert.alert(` ${data[0]}`)}>
        <SVGDel fill={'#000000'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView horizontal style={styles.container}>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.tableHeaderTitle}>
            Mã lợn
          </DataTable.Title>
          <DataTable.Title style={styles.tableHeaderTitle}>
            Ngày nhập chuồng{' '}
          </DataTable.Title>
          <DataTable.Title style={styles.tableHeaderTitle}>
            Ngày xuất chuồng{' '}
          </DataTable.Title>
          <DataTable.Title style={styles.tableHeaderTitle}>
            Tình trạng{' '}
          </DataTable.Title>
          <DataTable.Title style={styles.tableHeaderTitle}>
            Cân nặng(kg)
          </DataTable.Title>
          <DataTable.Title style={styles.tableHeaderTitle}>
            Mã chuồng nuôi
          </DataTable.Title>
          <DataTable.Title style={styles.tableHeaderTitle}>Sửa</DataTable.Title>
          {/* <DataTable.Title style={styles.tableHeaderTitle}>
            Đã xóa
          </DataTable.Title> */}
          {/* <DataTable.Title style={styles.tableHeaderTitle}>Sửa</DataTable.Title>
          <DataTable.Title style={styles.tableHeaderTitle}>Xoá</DataTable.Title> */}
        </DataTable.Header>
        {state != null ? (
          <Table borderStyle={{borderColor: 'transparent'}}>
            {/* <Row data={tableHead} style={styles.head} textStyle={styles.text} /> */}
            {state.map((rowData, index) => (
              <DataTable.Row style={styles.tableRow}>
                {rowData.map((field, idx) =>
                  idx < 6 ? (
                    <DataTable.Cell style={styles.tableCell}>
                      {field}
                    </DataTable.Cell>
                  ) : (
                    <DataTable.Cell style={styles.tableCell}>
                      {element(rowData, idx)}
                    </DataTable.Cell>
                  ),
                )}
                {/* <DataTable.Cell>Pizza</DataTable.Cell>
                <DataTable.Cell>24</DataTable.Cell> */}
              </DataTable.Row>
            ))}
          </Table>
        ) : (
          <View />
        )}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    textAlign: 'center',
  },
  tableHeaderTitle: {
    width: 150,
  },
  tableRow: {
    alignItems: 'center',
  },
  tableCell: {
    width: 150,
    alignItems: 'center',
  },
  btnEdit: {
    borderRadius: 2,
    // marginRight: 5,
    marginRight: 20,
  },
  btn: {
    borderRadius: 2,
    // marginRight: 5,
    // marginHorizontal: 20,
  },
  btnPa: {
    flex: 1,
    flexDirection: 'row',
  },
  btnText: {textAlign: 'center', color: '#fff'},
});
