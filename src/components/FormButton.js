import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../assets/theme';

const FormButton = ({
  labelText = '',
  handleOnPress = null,
  style,
  isPrimary = true,
  ...more
}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        backgroundColor: isPrimary ? COLORS.blue : COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.blue,
        borderRadius: 50,
        ...style,
      }}
      activeOpacity={0.9}
      onPress={handleOnPress}
      {...more}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          color: isPrimary ? COLORS.white : COLORS.blue,
        }}>
        {labelText}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;
