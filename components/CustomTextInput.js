import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, handleTextChange, secureTextEntry=false, type }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(value) => handleTextChange(type, value)}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  form: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
    color: '#000',
  },
});

export default CustomTextInput;
