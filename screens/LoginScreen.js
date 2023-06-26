import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../lib/gql/index';
import { TOKEN_KEY } from '../lib/constants/index';
import * as SecureStore from 'expo-secure-store';
import { useUserStore } from '../lib/store/user';

function LoginScreen({ navigation }) {
    const [login] = useMutation(LOGIN);
    const { setConnected } = useUserStore();

    const [form, setForm] = useState({
      identifier: '',
      password: '',
    });

    function onChangeText(name, value) {
      setForm({
        ...form,
        [name]: value,
      });
    }

    async function handleLogin() {
      const res = await login({
        variables: {
          input: {
            identifier: form.identifier,
            password: form.password,
          },
        },
      });

      await SecureStore.setItemAsync(TOKEN_KEY, res.data.login.jwt);
      setConnected(true);
    }

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Formulaire de connexion</Text>
      <CustomTextInput
        placeholder="Username"
        value={form.identifier}
        type={"identifier"}
        handleTextChange={onChangeText}
        secureTextEntry={false}
      />
      <CustomTextInput
        placeholder="Password"
        value={form.password}
        type={"password"}
        handleTextChange={onChangeText}
        secureTextEntry={true}
      />
      <View style={styles.btn}>
        <CustomButton title="Login" onPress={handleLogin} />
        <CustomButton title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

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
    },
    btn: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }
});

export default LoginScreen;