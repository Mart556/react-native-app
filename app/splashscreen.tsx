import SplashButton from "@/components/ui/SplashButton";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
	return (
		<View style={styles.container}>
			<Image
				source={require("@/assets/images/splash.png")}
				style={styles.image}
			/>

			<Text style={styles.title}>You`ll Find</Text>
			<Text style={styles.subtitle}>All you need</Text>
			<Text style={styles.title}>Here!</Text>

			<SplashButton title='Sign Up' onPress={() => router.push("/signup")} />
			<SplashButton
				title='Log In'
				backgroundColor='#fff'
				onPress={() => router.push("/signin")}
			></SplashButton>
		</View>
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
