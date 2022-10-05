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
import ItemBook from '../../components/ItemBook';
  
  export default function HomeUser({navigation}) {
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
            //   console.log(listBook);
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
  
    const contain = ({categoryId}) => {
      if(categoryId = filter(categoryBook.map((item)=>{return(item.categoryId)})) ){
        return true;
      }
      return false;
    }
  
    // const handleReload = () => {
    //   setBook(null)
    //   setCategories([])
    //   getCategory()
    //   getBook()
    // }
  
    useEffect(() => {
      getBook();
    }, []);
  
    return (
      <SafeAreaView 
    //   style={{backgroundColor: COLORS.black}}
      >
        <View 
        style={{backgroundColor: COLORS.blue}}
        >
            <View style={{flexDirection: 'row', marginHorizontal: 10, marginVertical: 10}}>
            <Text style={{flex: 1, ...FONTS.h1, color: COLORS.white}}>BOOK STORE</Text>
            <TouchableOpacity
            onPress={()=>
                navigation.navigate('Danh mục')
            }>

            <Image
                    source={icons.search_icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        marginHorizontal: 5
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>
                navigation.navigate('Giỏ hàng')
            }>
            <Image
                    source={icons.cart_icon}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                />

            </TouchableOpacity>
            </View>
        </View>
        <View>

        <FlatList
            showsVerticalScrollIndicator={false}
          style={{height: '92 %', marginHorizontal: 10}}
          data={book}
          keyExtractor={item => item.key}
          numColumns={2}
          renderItem={({item}) => (
            <ItemBook
              id={item.key}
              image={item.image}
              name={item.bookname}
              author={item.author}
              content={item.content}
              amount={item.amount}
              price={item.price}
              pages={item.pages}
              category={item.categoryId}
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
        </View>
      </SafeAreaView>
    );
  }
  