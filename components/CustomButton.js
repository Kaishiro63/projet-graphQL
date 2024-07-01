import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CustomButton = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity
        style={[styles.button]}
        onPress={onPress}
        >
        <Text style={styles.text}>{title}</Text>
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
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#00CED1',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00CED1',
    },
});

export default CustomButton;
