import {View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import React, { useEffect, useState } from 'react';
import {COLORS, icons} from '../../../assets';
import FormInput from '../../components/FormInput';
import db from '../../firebase/firebase';
import SelectList from 'react-native-dropdown-select-list'
import ItemBook from '../../components/ItemBook';
import filter from 'lodash.filter'

export default function Category({navigation}) {
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
  const [categories1, setCategories1] = useState([]);

  const getBook = async () => {
    setRefreshing(true)
    try{
      await db
        .collection('Book')
        .where('categoryId','==', category)
        .get()
        .then(querySnapshot => {
          const listBook = []
          querySnapshot.forEach(documentSnapshot => {
            listBook.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
              category: category,
            });
            // console.log(listBook);
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

  const getAllBook = async () => {
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
            // console.log(listBook);
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

  const contains = ({bookname, author}, search) => {
    if (
      bookname.toUpperCase().includes(search.toUpperCase())
    ) {
      return true;
    }
    return false;
  };

  const getCategory = async () => {
    try{
      await db.collection('Category')
      .get()
      .then(querySnapshot => {
        const category = []  
        querySnapshot.forEach(documentSnapshot => {
          category.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        const category1 = [{key: "all", value: "T???t c???"}]
        category.forEach(item => {
          category1.push({
            key: item.categoryId,
            value: item.category
          });
        });
        setCategories1(category1);
        setCategories(category);
      });
    }catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
    getCategory();
    getBook();
  }, [category]);

  useEffect(() => {
    getAllBook();
  }, [category == "all"]);

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'row', backgroundColor: COLORS.blue}}>
        <TouchableOpacity
        onPress={()=> navigation.navigate('Trang ch???')}
        >

        <Image
          source={icons.arrow_icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            marginLeft: 5,
            marginRight: 5,
            margin: 20,
          }}
        />
        </TouchableOpacity>
        <TextInput placeholder="T??m ki???m"
        style={{borderColor: COLORS.black1,
          borderWidth: 1,
          borderRadius: 40,
          margin: 10,
          marginLeft: 5,
          padding: 5,
          paddingLeft: 10,
        flex: 1,
        backgroundColor: COLORS.white
      }}
      value={search}
          onChangeText={text => handleSearch(text)}
          autoCorrect={false}
        ></TextInput>
         <TouchableOpacity
         onPress={()=> navigation.navigate('Gi??? h??ng')}
         >
          
        <Image
          source={icons.cart_icon}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
            marginHorizontal: 4,
            margin: 15,
          }}
        />
          </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 10, margin: 10}}>
      <SelectList
          onSelect={() => console.log(category)}
          data={categories1}
          placeholder='Th??? lo???i'
          setSelected={setCategory}
          height={8}
        />
      </View>
      <FlatList
      showsVerticalScrollIndicator={false}
        style={{height: '82 %'}}
        data={book}
        keyExtractor={item => item.key}
        numColumns={2}
        renderItem={({item}) => (
          <ItemBook
            id={item.key}
            image={item.image}
            name={item.bookname}
            author={item.author}
            category={item.category}
            content={item.content}
            amount={item.amount}
            price={item.price}
            pages={item.pages}
            iprice={item.importprice}
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
