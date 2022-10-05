import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import db from '../../firebase/firebase';
import { FONTS } from '../../../assets';
import LineDivider from '../../components/LineDivider';

export default function StoreInfo() {
  const [info, setInfo] = useState([]);

  const getInfo = async () => {
    await db
      .collection('User')
      .where('idUser', '==', 'NEcVfoPRqTcqwuQAtfloEKK3dnh1')
      .get()
      .then(querySnapshot => {
        const infos = [];
        querySnapshot.forEach(documentSnapshot => {
          infos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setInfo(infos);
      });
  };

  useEffect(()=>{
    getInfo()
  }, [])

  return (
    <View style={{margin: 10, flex: 1}}>
      <View>
        <View>
          <Text style={{margin: 20, ...FONTS.body2}}>Thông tin cửa hàng</Text>
          <LineDivider/>
        </View>
        <View>
          {info.map(item => {
            return (
              <View key={item.key}>
                <Text style={{margin: 20, ...FONTS.body2}}>
                  Tên cửa hàng: {item.name}
                </Text>
                <LineDivider/>
                {/* <Text style={{margin: 20, ...FONTS.body2}}>
                  Email: {item.email}
                </Text> */}
                <Text style={{margin: 20, ...FONTS.body2}}>
                  Địa chỉ: {item.address}
                </Text>
                <LineDivider/>
                <Text style={{margin: 20, ...FONTS.body2}}>
                  Số điện thoại: {item.phone}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  )
}