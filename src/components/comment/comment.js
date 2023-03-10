/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {AsyncStorage, FlatList} from 'react-native';
import {AuthContext, UserConsumer} from '../../components/context';
import {useSelector, useDispatch} from 'react-redux';
import * as Api from '../../constants/api';
import SVGDel from '../../assets/svg/delete.svg';
import SVGUnlock from '../../assets/svg/unlock.svg';
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
import ButtonEx from '../../components/button/buttonEx';

const Item = ({item}) => (
  <View style={[styles.flexComment]}>
    <Image source={{uri: item.avatar}} style={styles.newsImage} />
    <View style={styles.tinyLogo}>
      <Text style={styles.employeeName}>{item.employeeName}</Text>
      <Text style={styles.newInfor}>{item.content}</Text>
    </View>
  </View>
);

export default function Comment({data}) {
  const {todos} = useSelector(state => state.todos);
  const dispatch = useDispatch();
  console.log('username' + todos.employeeName);
  const [newCommnent, setNewComment] = useState('');
  const [newsComment, setNewsComment] = useState([]);
  const [upComment, setUpComment] = useState(true);
  const [clearInput, setClearInput] = useState(false);
  useEffect(() => {
    console.log(data);
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const fetchData = async () => {
    axios
      .get(Api.apiComment + data)
      .then(res => {
        console.log(Api.apiComment + data);
        setNewsComment(res.data.content.reverse());
        console.log(res.data.content);
      }, [])
      .catch(err => {
        console.log(err);
      });
  };
  const comments = data;
  const onchangeComment = value => {
    setNewComment(value);
  };
  function handleSubmit() {
    axios
      .post(Api.apiCreateComment, {
        content: newCommnent,
        newsId: data,
        employeeId: todos.employeeId,
        isDelete: false,
      })
      .then(res => {
        setUpComment(!upComment);
        setNewComment('');
        fetchData();
        console.log(res);
        // navigation.navigate('Home');
        // if (res.data.token != null) {
        //   navigation.push('Tab');
        // }
      })
      .catch(err => {
        // console.log(Api.apiNews);
        console.log(err);
      });
  }
  // const [loginState, dispatch] = React.useReducer(
  //   loginReducer,
  //   initialLoginState,
  // );
  console.log('data comment', newsComment);
  // const {userLogin} = React.useContext(AuthContext);
  // console.log('userLogincomment: ', userLogin);
  const renderItem = ({item}) => {
    // return <Item item={item} />;
    return (
      <View style={[styles.flexComment]}>
        <Image source={{uri: item.avatar}} style={styles.newsImage} />
        <View style={styles.tinyLogo}>
          <Text style={styles.employeeName}>{item.employeeName}</Text>
          <Text style={styles.newInfor}>{item.content}</Text>
        </View>
        {item.employeeId == todos.employeeId ? (
          <TouchableOpacity>
            <SVGDel fill={'#FF0000'} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  };
  return (
    <>
      <View style={[styles.flexComment]}>
        <Image
          source={{
            uri: todos.avatar,
          }}
          style={styles.newsImage}
        />
        <View style={styles.viewsAdd}>
          <Text style={{fontWeight: 'bold', marginBottom: 5}}>
            {todos.employeeName}
          </Text>
          <TextInput
            style={{flex: 1, backgroundColor: 'silver', borderRadius: 5}}
            placeholder="Viết bình luận..."
            underlineColorAndroid="transparent"
            value={newCommnent}
            onChangeText={onchangeComment}
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
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        {/* <ButtonEx
          title="Hủy"
          width="40%"
          backgroundCl="#ddab46"
          // onPress={() => navigation.navigate('Register')}
          // onPress={() => handleSubmit()}
        /> */}
        <View style={{width: '20%'}}>
          <ButtonEx
            title="Hủy"
            width="100%"
            backgroundCl="#929292"
            // onPress={() => navigation.navigate('Register')}
            // onPress={() => handleSubmit()}
          />
        </View>
        <ButtonEx
          title="Gửi"
          width="20%"
          backgroundCl="#46D6DD"
          // onPress={() => navigation.navigate('Register')}
          onPress={() => handleSubmit()}
        />
      </View>
      <FlatList
        scrollEnabled
        data={newsComment}
        enableEmptySections={true}
        keyExtractor={item => item.commentId}
        renderItem={renderItem}
      />
      {/* {newsComment != null ? (
        newsComment.map((item, index) => {
          // changed to the state variable
          return (
            <View style={[styles.flexComment]}>
              <Image source={{uri: item.avatar}} style={styles.newsImage} />
              <View style={styles.tinyLogo}>
                <Text style={styles.employeeName}>{item.employeeName}</Text>
                <Text style={styles.newInfor}>{item.content}</Text>
              </View>
            </View>
          );
        })
      ) : (
        <View>
          <Text>Không có comment nào cho bài viết này</Text>
        </View>
      )} */}
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
  },
  tinyLogo: {
    marginLeft: 10,
    width: '64%',
    // backgroundColor: 'silver',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
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
    // borderBottomWidth: StyleSheet.hairlineWidth,
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
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  newInfor: {
    // marginTop: 5,
    // marginBottom: 5,
    // width: '100%',
  },
  flexComment: {
    flexDirection: 'row',
    paddingVertical: 10,
    // backgroundColor: 'red',
  },
  employeeName: {
    // marginTop: 2,
    fontWeight: 'bold',
  },
  viewsAdd: {
    marginLeft: 10,
    width: '84%',
    // backgroundColor: 'silver',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    color: 'white',
  },
});
