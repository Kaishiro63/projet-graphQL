import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useMutation } from '@apollo/client';
import { UPDATE_PLACE, PLACES } from '../lib/gql/index';
import CustomButton from '../components/CustomButton';

function UpdatePlaceScreen({ navigation, route }) {
  const place = route.params.item;

  const [updatePlace, { loading, error }] = useMutation(UPDATE_PLACE, {
    refetchQueries: [{ query: PLACES }],
  });

  const [form, setForm] = useState({
    title: place.attributes.title,
    address: place.attributes.address,
    latitude: place.attributes.latitude.toString(),
    longitude: place.attributes.longitude.toString(),
  });

  function onChangeText(name, value) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit() {
    await updatePlace({
      variables: {
        id: place.id, updatePlace: {
          title: form.title,
          address: form.address,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
        },
      },
    });
    navigation.navigate('Places');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier cette place :</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Titre"
          onChangeText={ value => onChangeText('title', value)}
          value={form.title}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse"
          onChangeText={ value => onChangeText('address', value)}
          value={form.address}
        />
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          onChangeText={ value => onChangeText('latitude', value)}
          value={form.latitude}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          onChangeText={ value => onChangeText('longitude', value)}
          value={form.longitude}
          keyboardType="numeric"
        />
        <CustomButton title="Modifier" style={styles.button} onPress={handleSubmit}/>
        {loading && <Text style={styles.loading}>En cours...</Text>}
        {error && <Text style={styles.error}>{error.message}</Text>}
      </View>
    </View>
  );
}

export default UpdatePlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  loading: {
    marginTop: 10,
    color: 'blue',
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});
