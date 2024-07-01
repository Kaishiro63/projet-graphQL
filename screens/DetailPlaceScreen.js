import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { PLACE } from '../lib/gql/index';

function PlaceScreen({ route }) {
  const place = route.params.item;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.block}>
          <Text style={styles.title}>Detail de la place : {place.attributes.title}</Text>
        </View>
        <View key={place.id} style={styles.place}>
          <View style={styles.infoPlace}>
            <Text style={styles.placeTitle}>{place.attributes.title}</Text>
            <Text style={styles.placeAddress}>{place.attributes.address}</Text>
            <Text style={styles.placeLongitude}>{place.attributes.longitude}</Text>
            <Text style={styles.placeLatitude}>{place.attributes.latitude}</Text>
          </View>
        </View>
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

export default PlaceScreen;
