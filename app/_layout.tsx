import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import React from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

import SplashButton from "@/components/ui/splashbutton";
import { Image, StyleSheet, Text, View } from "react-native";

export default function RootLayout() {
	const colorScheme = useColorScheme();
	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<View style={styles.container}>
				<Image
					source={require("@/assets/images/splash.png")}
					style={styles.image}
				/>

				<Text style={styles.title}>You`ll Find</Text>
				<Text style={styles.subtitle}>All you need</Text>
				<Text style={styles.title}>Here!</Text>

				<SplashButton title='Sign Up' onPress={() => {}}></SplashButton>
				<SplashButton
					title='Log In'
					backgroundColor='#fff'
					onPress={() => {}}
				></SplashButton>
			</View>
		</ThemeProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	image: {
		width: 300,
		height: 300,
		resizeMode: "contain",
	},

	title: {
		fontSize: 48,
		fontWeight: "bold",
		color: "black",
	},

	subtitle: {
		fontSize: 48,
		color: "orange",
		textDecorationLine: "underline",
	},
});
