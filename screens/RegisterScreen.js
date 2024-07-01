import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../lib/gql/index'
import { TOKEN_KEY } from '../lib/constants/index';
import * as SecureStore from 'expo-secure-store';

function RegisterScreen ({ navigation }) {
  const [register] = useMutation(REGISTER);

  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
  });

  function onChangeText(name, value) {
    setForm({
      ...form,
      [name]: value,
    });
   }

  async function handleRegister() {
    const res = await register({
      variables: {
        input: {
          username: form.username,
          password: form.password,
          email: form.email,
        },
      },
    });

  await SecureStore.setItemAsync(TOKEN_KEY, res.data.register.jwt);
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Formulaire d'inscription</Text>
      <CustomTextInput
        placeholder="Username"
        value={form.identifier}
        type={"username"}
        handleTextChange={onChangeText}
      />
      <CustomTextInput
        placeholder="Email"
        value={form.email}
        type={"email"}
        handleTextChange={onChangeText}
      />
      <CustomTextInput
        placeholder="Password"
        value={form.password}
        type={"password"}
        handleTextChange={onChangeText}
        secureTextEntry={true}
      />
      <CustomButton title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titre: {
      marginVertical: 40,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
  }
});

export default RegisterScreen;
