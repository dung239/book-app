import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Image,
  Platform,
  Button,
  ImagePickerIOS,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, icons} from '../../assets';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import auth, {firebase} from '@react-native-firebase/auth';
import db from '../firebase/firebase';
import {useNavigation} from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import SelectList from 'react-native-dropdown-select-list'


export default function AddBook() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [importprice, setImportprice] = useState('');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState();
  const [pages, setPages] = useState();
  const [categories, setCategories] = useState([]);
  const [categories1, setCategories1] = useState([]);

  const handleSubmit = async () => {
    const uid = auth().currentUser.uid;
    const imageUrl = await uploadImage();
    const time = firebase.firestore.FieldValue.serverTimestamp();
    db.collection('Book')
      .add({
        // id: db.collection('Book').doc().id,
        idStore: uid,
        bookname: name,
        author: author,
        categoryId: category,
        pages: pages,
        price: price,
        importprice: importprice,
        amount: amount,
        image: imageUrl,
        createAt: time,
      })
      .then(Alert.alert('Thông báo', 'Sách được thêm thành công'));
    setAmount(null);
    setName(null);
    setPrice(null);
    setImportprice(null);
    setAuthor(null);
    setCategory(null);
    setPages(null);
  };

  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 100,
      height: 150,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadImage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    // setUploading(true);
    // setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    // task.on('state_changed', taskSnapshot => {
    //   console.log(
    //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    //   );

    //   setTransferred(
    //     Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
    //       100,
    //   );
    // });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      // setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      // console.log(url);
      // console.log(storageRef);
      return url;
    } catch (e) {
      console.log(e);
      // return null;
    }
  };

  // const handleSubmit = () => {
  //   console.log(categories);
  //   console.log(categories1);
  //   console.log(categories1.value);
  //   console.log(category);
  // }


  useEffect(() => { 
    getCategory() 
    }, []);
  
  const  getCategory = async () => {
    await db.collection('Category')
      .where('idStore', '==', auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          categories.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });
      categories.forEach(item => {
        categories1.push({
          key: item.categoryId,
          value: item.category
        });
      });
      setCategories(categories);
      setCategories1(categories1)
  }

  return (
    // <KeyboardAvoidingView
    //   style={{
    //     flex: 1,
    //     padding: 20,
    //     backgroundColor: COLORS.white,
    //   }}>
    <SafeAreaView
    style={{
          flex: 1,
          padding: 20,
          backgroundColor: COLORS.white,
        }}>
      <ScrollView>
        {image != null ? (
          <Image
            source={{uri: image}}
            style={{width: 100, height: 150, alignSelf: 'center'}}></Image>
        ) : null}
        <Button
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: COLORS.black,
            alignSelf: 'center',
          }}
          onPress={choosePhotoFromLibrary}
          title="Chọn ảnh từ thư viện"
        />

        <FormInput
          labelText="Tên sách"
          placeholderText="Nhập tên sách"
          onChangeText={value => setName(value)}
          value={name}
        />

        <FormInput
          labelText="Tác giả"
          placeholderText="Nhập tên tác giả"
          onChangeText={value => setAuthor(value)}
          value={author}
        />

        <SelectList
          onSelect={() => console.log(category)}
          data={categories1}
          placeholder='Thể loại'
          setSelected={setCategory}        
        />

        <FormInput
          labelText="Số trang"
          placeholderText="Nhập số trang của sách"
          onChangeText={value => setPages(value)}
          value={pages}
        />
        <FormInput
          labelText="Số lượng"
          placeholderText="Số lượng nhập"
          onChangeText={value => setAmount(value)}
          value={amount}
        />
        <FormInput
          labelText="Giá nhập"
          placeholderText="Nhập giá nhập"
          onChangeText={value => setImportprice(value)}
          value={importprice}
        />
        <FormInput
          labelText="Giá bán"
          placeholderText="Nhập giá bán"
          onChangeText={value => setPrice(value)}
          value={price}
        />

        <FormButton
          labelText="Thêm sách"
          handleOnPress={handleSubmit}
          style={{width: '100%'}}
        />
      </ScrollView>
      {/* <View>
        <Text>Tổng tiền nhập sách:</Text>
      </View> */}
      
    {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
}
