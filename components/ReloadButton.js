import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReloadButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.button]} onPress={onPress}>
            <Icon name="refresh" size={30} color="#000" />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        padding: 10,
        marginBottom: 20,
    },
});

export default ReloadButton;
