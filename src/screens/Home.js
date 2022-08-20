import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
  Modal,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {setUserId} from '@firebase/analytics';
import {COLORS, FONTS, icons, SIZES} from '../../assets';
import BookItem from '../components/BookItem';
import db from '../firebase/firebase';
import {SearchBar} from 'react-native-elements';
import filter from 'lodash.filter';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Invoice from './Invoice';

export default function Home({navigation}) {
  const [book, setBook] = useState([]);
  const [search, setSearch] = useState('');
  const [fillterBook, setFillterBook] = useState([]);
  const [categoryBook, setCategoryBook] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState(true);
  const [category, setCategory] = useState('');
  const [refreshing, setRefreshing] = useState(false)

  const getBook = async () => {
    setRefreshing(true)
    try{
      await db
        .collection('Book')
        .where('idStore', '==', auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          const listBook = []
          querySnapshot.forEach(documentSnapshot => {
            // if(documentSnapshot.data().categoryId === categories.map((item)=>{item.categoryId})){
            const a = categories.filter(
              item => documentSnapshot.data().categoryId == item.categoryId,
            );
            console.log(a);
            a.forEach(item => {
              setCategory(item.category);
              console.log(item.category);
            });
            // setCategory(a.category)
            // }
            listBook.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              category: category,
            });
            console.log(listBook);
          });
          setBook(listBook);
          setFillterBook(listBook);
          setCategoryBook(listBook);
          setRefreshing(false)
        });
    }catch(error) {
      console.error(error);
    }
  };

  const handleSearch = text => {
    const formattedSearch = text.toUpperCase();
    const filteredData = filter(fillterBook, book => {
      return contains(book, formattedSearch);
    });
    setBook(filteredData);
    setSearch(text);
  };

  const contains = ({bookname, author, category}, search) => {
    if (
      bookname.toUpperCase().includes(search.toUpperCase()) ||
      author.toUpperCase().includes(search.toUpperCase()) ||
      category.toUpperCase().includes(search.toUpperCase())
    ) {
      return true;
    }
    return false;
  };

  const getCategory = async () => {
    try{
      await db
        .collection('Category')
        .where('idStore', '==', auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          const listCategory = []
          querySnapshot.forEach(documentSnapshot => {
            listCategory.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setCategories(listCategory);
        });
    }catch(error){
      console.error(error);
    }
  };

  const handleCategory = () => {
    console.log(categories);
    // setColor(!color);
  };

  // const handleReload = () => {
  //   setBook(null)
  //   setCategories([])
  //   getCategory()
  //   getBook()
  // }

  useEffect(() => {
    getCategory();
    getBook();
  }, []);

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          placeholder="Tìm kiếm"
          style={{
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 40,
            margin: 10,
            padding: 5,
            paddingLeft: 10,
            width: '85%',
          }}
          value={search}
          onChangeText={text => handleSearch(text)}
          autoCorrect={false}></TextInput>
        {/* <TouchableOpacity style={{marginTop: 10, marginBottom: 10, }} onPress={handleReload}><Image source={icons.reload_icon}/></TouchableOpacity> */}
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map(item => {
            return (
              <TouchableOpacity key={item.key}>
                <Text
                  style={{
                    padding: 5,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    marginHorizontal: 5,
                    borderRadius: 50,
                    marginVertical: 3,
                    backgroundColor: color ? COLORS.white : COLORS.blue,
                  }}
                  onPress={handleCategory}>
                  {item.category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <FlatList
        style={{height: '86 %'}}
        data={book}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <BookItem
            id={item.key}
            image={item.image}
            name={item.bookname}
            author={item.author}
            category={item.category}
            content={item.content}
            amount={item.amount}
            price={item.price}
            pages={item.pages}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getBook}>

            </RefreshControl>
        }
      />
      {/* <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}>
          <View
            style={{
              margin: 50,
              flex: 1,
              justifyContent: 'center',   
              alignItems: 'center',
              // width: '80%',
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 20,
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <FormInput
              labelText="Số lượng"
              placeholderText="Số lượng nhập"
              onChangeText={value => setAmount(value)}
              value={amount}
              keyboardType={'numeric'}
            />
            <FormButton
              labelText="Cập nhật"
              handleOnPress={handleUpdate}
              style={{width: '100%'}}
            />
          </View>
        </Modal> */}
    </SafeAreaView>
  );
}
