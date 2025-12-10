import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotFound() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View style={styles.container}>
				<Text style={styles.heading}>Page not found</Text>
				<Text style={styles.text}>
					We couldn't find the page you're looking for.
				</Text>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	text: {
		fontSize: 16,
		color: "#666",
	},
});
