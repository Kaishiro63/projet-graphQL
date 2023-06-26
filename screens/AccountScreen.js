import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useQuery } from '@apollo/client';
import { ME_QUERY } from '../lib/gql/index';
import { TOKEN_KEY } from '../lib/constants';
import * as SecureStore from 'expo-secure-store';
import { useUserStore } from '../lib/store/user';
import LogoutButton from '../components/LogoutButton';

function AccountScreen({ navigation }) {
  	const { data } = useQuery(ME_QUERY);
	console.log(data);

	  const { setConnected } = useUserStore();

	  async function handleLogout() {
		await SecureStore.deleteItemAsync(TOKEN_KEY);
		console.log(TOKEN_KEY);
		setConnected(false);
	  }

  return(
    <View style={styles.container}>
		<View style={styles.content}>
      		<Text style={styles.h1}>Bonjour {data && data.me.username} !</Text>
			<View style={styles.btn}>
				<CustomButton title="Places" onPress={() => navigation.navigate('Places')} />
				<LogoutButton title="Logout" onPress={handleLogout}/>
			</View>
		</View>
	</View>
  )
}

export default AccountScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
    	paddingTop: 120
	},
	h1: {
		fontSize: 24,
		fontWeight: 500,
    	marginBottom: 60,
		textAlign: 'center',
	},
	content: {
		flex: 0,
	},
	btn: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
});