import {View, Text} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../assets';

export default function CategoryItem({categoryId, category, handleCategory, color=true}) {
  return (
    <View>
      <TouchableOpacity >
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
          onPress={() => handleCategory(categoryId)}
          >
          {category}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
