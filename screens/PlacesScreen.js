import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { PLACES, DELETE_PLACE } from '../lib/gql/index';
import CustomButton from '../components/CustomButton';
import DeleteButton from '../components/DeleteButton';
import ReloadButton from '../components/ReloadButton';
import EditButton from '../components/EditButton';

function PlacesScreen({ navigation }) {
  const { loading, error, data, refetch } = useQuery(PLACES);
  const [deletePlace] = useMutation(DELETE_PLACE, {
    refetchQueries: [{ query: PLACES }]
  });

  async function handleDeletePlace(placeId) {
    await deletePlace({
      variables: { id: placeId },
    })
  }

    function handlePlacePress(place) {
      navigation.navigate('UpdatePlace', { item:place });
    }

    function handlePlaceDetail(place) {
      navigation.navigate('DetailPlace', { item:place });
    }

  if (loading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Error :</Text>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.block}>
          <Text style={styles.title}>Liste des places :</Text>
          <ReloadButton onPress={() => refetch()}/>
        </View>
        <CustomButton title="Créer une nouvelle place" style={styles.button} onPress={() => navigation.navigate('CreatePlace')}/>
        {data.places.data.map(place => (
          <View key={place.id} style={styles.place}>
            <TouchableOpacity key={place.id} onPress={() => handlePlaceDetail(place)}>
              <View style={styles.infoPlace}>
                  <Text style={styles.placeTitle}>{place.attributes.title}</Text>
                  <Text style={styles.placeAddress}>{place.attributes.address}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.block}>
              <EditButton key={place.id} onPress={() => handlePlacePress(place)}/>
              <DeleteButton title="Supprimer" onPress={() => handleDeletePlace(place.id)} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  block: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  place: {
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoPlace: {
    maxWidth: 250,
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeAddress: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  loading: {
    fontSize: 18,
    fontStyle: 'italic',
    alignSelf: 'center',
    marginTop: 32,
  },
  error: {
    fontSize: 18,
    fontStyle: 'italic',
    color: 'red',
    alignSelf: 'center',
    marginTop: 32,
  },
});

export default PlacesScreen;
