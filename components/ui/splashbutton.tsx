import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SplashButton({
	title,
	backgroundColor,
	onPress,
}: {
	title: string;
	backgroundColor?: string;
	onPress: () => void;
}) {
	return (
		<TouchableOpacity
			style={[styles.button, backgroundColor ? { backgroundColor } : {}]}
			onPress={onPress}
		>
			<Text
				style={[
					styles.buttonText,
					backgroundColor ? { color: "#4f63abff" } : {},
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#4f63abff",
		paddingVertical: 16,
		paddingHorizontal: 48,
		borderRadius: 6,
		alignItems: "center",
		marginVertical: 10,
		width: "80%",
		alignSelf: "center",
		marginTop: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});
