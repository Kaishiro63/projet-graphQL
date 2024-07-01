import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DeleteButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.button]} onPress={onPress}>
            <Icon name="trash-o" size={30} color="#FF0000" />
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
    },
});

export default DeleteButton;
