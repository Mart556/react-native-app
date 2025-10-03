import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import React from "react";

export const unstable_settings = {
	initialRouteName: "splashscreen",
};

export default function RootLayout() {
	//const colorScheme = useColorScheme();

	let colorScheme = "light";

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='splashscreen' options={{ headerShown: false }} />
				<Stack.Screen name='signup' options={{ headerShown: false }} />
				<Stack.Screen name='signin' options={{ headerShown: false }} />
				<Stack.Screen name='home' options={{ headerShown: false }} />
				<Stack.Screen name='product' options={{ headerShown: false }} />

				<Stack.Screen
					name='favorites'
					options={{
						headerShown: true,
						title: "Favorites",
						headerBackVisible: false,
						headerTitleAlign: "center",
					}}
				/>

				<Stack.Screen
					name='profile'
					options={{
						headerShown: true,
						title: "Profile",
						headerBackVisible: false,
						headerTitleAlign: "center",
					}}
				/>
				<Stack.Screen name='settings' options={{ headerShown: false }} />
				<Stack.Screen name='create-listing' options={{ headerShown: false }} />
				<Stack.Screen name='my-listings' options={{ headerShown: false }} />
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	);
}
