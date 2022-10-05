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
import {COLORS, FONTS, icons, SIZES} from '../../../assets';
import BookItem from '../../components/BookItem';
import db from '../../firebase/firebase';
import {SearchBar} from 'react-native-elements';
import filter from 'lodash.filter';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import CategoryItem from '../../components/CategoryItem';

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
        .get()
        .then(querySnapshot => {
          const listBook = []
          querySnapshot.forEach(documentSnapshot => {
            listBook.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              category: category,
            });
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

  const handleCategory = (categoryId) => {
    const categoryData = filter(categoryBook, book => {
      return contain(book, categoryId)
    })
    setBook(categoryData)
  };

  const contain = ({categoryId}) => {
    if(categoryId = filter(categoryBook.map((item)=>{return(item.categoryId)})) ){
      return true;
    }
    return false;
  }

  useEffect(() => {
    getCategory();
    getBook();
  }, []);

  return (
    <SafeAreaView>
      <View 
      style={{backgroundColor: COLORS.blue}}
      >
        <TextInput
          placeholder="Tìm kiếm"
          style={{
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 40,
            margin: 10,
            padding: 5,
            paddingLeft: 10,
            // width: '85%',
            backgroundColor: COLORS.white
          }}
          value={search}
          onChangeText={text => handleSearch(text)}
          autoCorrect={false}></TextInput>
        {/* <TouchableOpacity style={{marginTop: 10, marginBottom: 10, }} onPress={handleReload}><Image source={icons.reload_icon}/></TouchableOpacity> */}
      </View>
      <FlatList
      showsVerticalScrollIndicator={false}
        style={{height: '91 %'}}
        data={book}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <BookItem
            id={item.key}
            image={item.image}
            name={item.bookname}
            author={item.author}
            category={item.categoryId}
            content={item.content}
            amount={item.amount}
            price={item.price}
            pages={item.pages}
            importprice={item.importprice}
            createAt={item.createAt}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getBook}>
            </RefreshControl>
        }
      />
    </SafeAreaView>
  );
}
