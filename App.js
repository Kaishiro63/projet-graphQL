import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import AccountScreen from './screens/AccountScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import PlacesScreen from './screens/PlacesScreen'
import CreatePlaceScreen from './screens/CreatePlaceScreen'
import UpdatePlaceScreen from './screens/UpdatePlaceScreen';
import DetailPlaceScreen from './screens/DetailPlaceScreen';
import { TOKEN_KEY } from './lib/constants/index';
import { useUserStore } from './lib/store/user';

const httpLink = createHttpLink({
	uri: 'https://digitalcampus.nerdy-bear.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
	const token = await SecureStore.getItemAsync(TOKEN_KEY);
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

const Loader = () => <Text>Loading...</Text>;

function App() {
	const [connected, setConnected] = useState(undefined);
	const { connected: connectedStore } = useUserStore();

	useEffect(() => {
		async function checkToken() {
			const token = await SecureStore.getItemAsync(TOKEN_KEY);
			if (!token) return setConnected(false);

			return setConnected(true);
		}

		checkToken();
	}, [connectedStore]);

	return (
		<ApolloProvider client={client}>
			<NavigationContainer>
				<Stack.Navigator>
					{connected === undefined && <Stack.Screen name="Loader" component={Loader} />}
					{connected && (
						<>
							<Stack.Screen name="Account" component={AccountScreen} />
						</>
					)}
					{connected === false && (
						<>
							<Stack.Screen name="Login" component={LoginScreen} />
						</>
					)}
					<Stack.Screen name="Register" component={RegisterScreen} />
					<Stack.Screen name="Places" component={PlacesScreen} />
					<Stack.Screen name="CreatePlace" component={CreatePlaceScreen} />
					<Stack.Screen name="UpdatePlace" component={UpdatePlaceScreen} />
					<Stack.Screen name="DetailPlace" component={DetailPlaceScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</ApolloProvider>
	);
}

export default App;
