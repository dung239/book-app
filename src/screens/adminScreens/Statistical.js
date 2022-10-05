import {
  View,
  Text,
  ScrollView,
  Button,
  SectionList,
  SafeAreaView,
  Image,
  Alert,
  RefreshControl,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import db from '../../firebase/firebase';

import {TouchableOpacity} from 'react-native';
import {COLORS, FONTS, icons} from '../../../assets';
import {FlatList} from 'react-native';
import SelectList from 'react-native-dropdown-select-list';
import filter from 'lodash.filter';

export default function Statistical({navigation}) {
  const [myInvoice, setMyInvoice] = useState([]);
  const [myInvoiceBook, setInvoiceBook] = useState([]);
  const [importMoney, setImportMoney] = useState([]);
  const [loading, setLoading] = useState(true);
  const [choice, setChoice] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [categories, setCategories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [sumInvoice, setSumInvoice] = useState('');
  const [sumImportMoney, setSumImportMoney] = useState('');
  const [search, setSearch] = useState('');
  const [fillterInvoice, setFillterInvoice] = useState([]);

  const selectData = [
    {key: 'Đặt hàng', value: 'Xem đơn đặt hàng'},
    {key: 'Đã hủy', value: 'Xem đơn đã hủy'},
    {key: 'Đã nhận', value: 'Xem đơn thành công'},
    {key: '4', value: 'Xem lich sử nhập hàng'},
    {key: '5', value: 'Các thể loại sách'},
  ];

  // tìm kiếm hóa đơn
  const handleSearch = text => {
    const formattedSearch = text.toUpperCase();
    const filteredData = filter(fillterInvoice, dateTime => {
      return contains(dateTime, formattedSearch);
    });
    setMyInvoice(filteredData);
    setSearch(text);
  };

  const contains = ({date}, search) => {
    if (date.toUpperCase().includes(search.toUpperCase())) {
      return true;
    }
    return false;
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = async output => {
    setShowDatePicker(false);
    const {startDate, startDateString, endDate, endDateString} = output;
    await setDateEnd(endDateString);
    await setDateStart(startDateString);
    console.log(dateStart);
    console.log(dateEnd);
    console.log(startDateString);
    console.log(endDateString);
  };

  //lấy ra danh sách hóa đơn theo tình trạng
  const getInvoice = async () => {
    await db
      .collection('Invoice')
      .where('status', '==', choice)
      .get()
      .then(querySnapshot => {
        const listInvoice = [];
        querySnapshot.forEach(documentSnapshot => {
          listInvoice.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setMyInvoice(listInvoice);
        setFillterInvoice(listInvoice);
      });
    setLoading(false);
  };

  const getImportMoney = async () => {
    await db
      .collection('Statistical')
      .get()
      .then(querySnapshot => {
        const listImportMoney = [];
        querySnapshot.forEach(documentSnapshot => {
          listImportMoney.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setImportMoney(listImportMoney);
        let b = 0;
        listImportMoney.forEach(item => {
          b += item.inputMoney;
          return b;
        });
        setSumImportMoney(b);
      });
    setLoading(false);
  };

  // lấy về danh sách hóa đơn
  const getCategory = async () => {
    setRefreshing(true);
    try {
      await db
        .collection('Category')
        .get()
        .then(querySnapshot => {
          const category1 = [];
          querySnapshot.forEach(documentSnapshot => {
            category1.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setCategories(category1);
          setRefreshing(false);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let a = Number(0);
    myInvoice.forEach(item => {
      a += Number(item.total);
      return a;
    });
    setSumInvoice(Number(a));
  }, [myInvoice]);

  useEffect(() => {
    getInvoice();
  }, [choice]);

  useEffect(() => {
    getImportMoney();
    getCategory();
  }, []);

  return (
    <SafeAreaView>
      <View style={{backgroundColor: COLORS.blue}}>

      <View style={{margin: 10}}>
        <SelectList
          onSelect={() => console.log(choice)}
          data={selectData}
          placeholder="Chọn thông tin muốn xem"
          setSelected={setChoice}
          ></SelectList>
      </View>
      </View>
      {(() => {
        switch (choice) {
          case 'Đặt hàng':
            return (
              <View>
                <View style={{ backgroundColor: COLORS.blue}}>
                  <View>
                    <TextInput
                      placeholder="Tìm kiếm"
                      style={{
                        borderColor: COLORS.black1,
                        borderWidth: 1,
                        borderRadius: 40,
                        marginRight: 10,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        padding: 5,
                        paddingLeft: 10,
                        backgroundColor: COLORS.white,
                        height: 40,
                      }}
                      value={search}
                      onChangeText={text => handleSearch(text)}
                      autoCorrect={false}></TextInput>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
                    <Text style={{...FONTS.body2, width: '40%', color: COLORS.white}}>
                      Số hóa đơn: {myInvoice.length}
                    </Text>
                    <Text style={{...FONTS.body2, width: '60%', color: COLORS.white}}>
                      Tổng tiền:{' '}
                      {sumInvoice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      đ
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={myInvoice}
                  style={{height: '77%'}}
                  showsVerticalScrollIndicator={false}
                  // keyExtractor={item => {
                  //   item.key;
                  // }}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        key={item.key}
                        style={{
                          borderWidth: 1,
                          borderColor: COLORS.black,
                          marginLeft: 10,
                          marginRight: 10,
                          marginBottom: 5,
                          marginTop: 5,
                          borderRadius: 10,
                        }}
                        onPress={() =>
                          navigation.navigate('Invoice Detail', {
                            customer: item.customer,
                            phone: item.phone,
                            time: item.dateTime,
                            total: item.total,
                            invoice: item.invoice,
                          })
                        }>
                        <View style={{margin: 10}} key={item.key}>
                          <View>
                            <Text>Thời gian: {item.dateTime}</Text>
                          </View>
                          <View>
                            <Text>
                              Tổng tiền:{' '}
                              {item.total
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                              đ
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}></FlatList>
              </View>
            );
          case 'Đã hủy':
            return (
              <View>
                <View style={{ backgroundColor: COLORS.blue}}>
                  <View>
                    <TextInput
                      placeholder="Tìm kiếm"
                      style={{
                        borderColor: COLORS.black1,
                        borderWidth: 1,
                        borderRadius: 40,
                        marginRight: 10,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        padding: 5,
                        paddingLeft: 10,
                        backgroundColor: COLORS.white,
                        height: 40,
                      }}
                      value={search}
                      onChangeText={text => handleSearch(text)}
                      autoCorrect={false}></TextInput>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
                    <Text style={{...FONTS.body2, width: '40%', color: COLORS.white}}>
                      Số hóa đơn: {myInvoice.length}
                    </Text>
                    <Text style={{...FONTS.body2, width: '60%', color: COLORS.white}}>
                      Tổng tiền:{' '}
                      {sumInvoice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      đ
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={myInvoice}
                  style={{height: '77%'}}
                  showsVerticalScrollIndicator={false}
                  // keyExtractor={item => {
                  //   item.key;
                  // }}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        key={item.key}
                        style={{
                          borderWidth: 1,
                          borderColor: COLORS.black,
                          marginLeft: 10,
                          marginRight: 10,
                          marginBottom: 5,
                          marginTop: 5,
                          borderRadius: 10,
                        }}
                        onPress={() =>
                          navigation.navigate('Invoice Detail', {
                            customer: item.customer,
                            phone: item.phone,
                            time: item.dateTime,
                            total: item.total,
                            invoice: item.invoice,
                          })
                        }>
                        <View style={{margin: 10}} key={item.key}>
                          <View>
                            <Text>Thời gian: {item.dateTime}</Text>
                          </View>
                          <View>
                            <Text>
                              Tổng tiền:{' '}
                              {item.total
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                              đ
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}></FlatList>
              </View>
            );
          case 'Đã nhận':
            return (
              <View>
                <View style={{ backgroundColor: COLORS.blue}}>
                  <View>
                    <TextInput
                      placeholder="Tìm kiếm"
                      style={{
                        borderColor: COLORS.black1,
                        borderWidth: 1,
                        borderRadius: 40,
                        marginRight: 10,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        padding: 5,
                        paddingLeft: 10,
                        backgroundColor: COLORS.white,
                        height: 40,
                      }}
                      value={search}
                      onChangeText={text => handleSearch(text)}
                      autoCorrect={false}></TextInput>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
                    <Text style={{...FONTS.body2, width: '40%', color: COLORS.white}}>
                      Số hóa đơn: {myInvoice.length}
                    </Text>
                    <Text style={{...FONTS.body2, width: '60%', color: COLORS.white}}>
                      Tổng tiền:{' '}
                      {sumInvoice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      đ
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={myInvoice}
                  style={{height: '77%'}}
                  showsVerticalScrollIndicator={false}
                  // keyExtractor={item => {
                  //   item.key;
                  // }}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        key={item.key}
                        style={{
                          borderWidth: 1,
                          borderColor: COLORS.black,
                          marginLeft: 10,
                          marginRight: 10,
                          marginBottom: 5,
                          marginTop: 5,
                          borderRadius: 10,
                        }}
                        onPress={() =>
                          navigation.navigate('Invoice Detail', {
                            customer: item.customer,
                            phone: item.phone,
                            time: item.dateTime,
                            total: item.total,
                            invoice: item.invoice,
                          })
                        }>
                        <View style={{margin: 10}} key={item.key}>
                          <View>
                            <Text>Thời gian: {item.dateTime}</Text>
                          </View>
                          <View>
                            <Text>
                              Tổng tiền:{' '}
                              {item.total
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                              đ
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}></FlatList>
              </View>
            );
          case '4':
            return (
              <View>
                <View style={{ backgroundColor: COLORS.blue}}>
                <View>
                    <TextInput
                      placeholder="Tìm kiếm"
                      style={{
                        borderColor: COLORS.black1,
                        borderWidth: 1,
                        borderRadius: 40,
                        marginRight: 10,
                        marginHorizontal: 5,
                        marginVertical: 5,
                        padding: 5,
                        paddingLeft: 10,
                        backgroundColor: COLORS.white,
                        height: 40,
                      }}
                      value={search}
                      onChangeText={text => handleSearch(text)}
                      autoCorrect={false}></TextInput>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 5}}>
                    <Text style={{...FONTS.body2, width: '40%', color: COLORS.white}}>
                      Số lần nhập: {importMoney.length}
                    </Text>
                    <Text style={{...FONTS.body2, width: '60%', color: COLORS.white}}>
                      Tổng tiền:{' '}
                      {sumImportMoney
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      đ
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={importMoney}
                  style={{height: '80%'}}
                  showsVerticalScrollIndicator={false}
                  // keyExtractor={item => {
                  //   item.key;
                  // }}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: COLORS.black,
                          marginLeft: 10,
                          marginRight: 10,
                          marginBottom: 5,
                          marginTop: 5,
                          borderRadius: 10,
                        }}
                        // key={item.key}
                      >
                        <View style={{margin: 10}}>
                          <View>
                            <Text>
                              Tiền nhập:{' '}
                              {item.inputMoney
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                              đ
                            </Text>
                          </View>
                          <View>
                            <Text>
                              ThờI gian nhập: {item.date + '  ' + item.time}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            );
          case '5':
            return (
              <View>
                <FlatList
                  data={categories}
                  style={{height: '90%'}}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={getCategory}></RefreshControl>
                  }
                  renderItem={({item}) => {
                    return (
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: COLORS.black,
                          marginLeft: 10,
                          marginRight: 10,
                          marginBottom: 5,
                          marginTop: 5,
                          borderRadius: 10,
                        }}
                        // key={item.key}
                      >
                        <View style={{margin: 10}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{...FONTS.body3, flex: 1}}>
                              {item.category}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                console.log(item.key);
                                db.collection('Category')
                                  .doc(item.key)
                                  .delete()
                                  .then(
                                    Alert.alert(
                                      'Thông báo',
                                      'Xóa thể loại thành công',
                                    ),
                                  );
                              }}>
                              <Image
                                source={icons.delete_icon}
                                style={{
                                  height: 16,
                                  width: 16,
                                  marginTop: 4,
                                }}></Image>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            );
          default:
            return null;
        }
      })()}
    </SafeAreaView>
  );
}
