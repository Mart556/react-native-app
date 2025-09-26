import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as AuthSession from "expo-auth-session";

import * as Google from "expo-auth-session/providers/google";

export default function GoogleButton() {
	const [loading, setLoading] = useState(false);

	/* useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				"909358664769-6mbgvjpsvf7dhgjhfq7boj3pg3fm7evh.apps.googleusercontent.com",
			offlineAccess: true,
			scopes: ["profile", "email"],
		});
	}, []); */
	const redirectUri = AuthSession.makeRedirectUri({
		useProxy: true, // Use Expo proxy for development
	});
	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId:
			"909358664769-6mbgvjpsvf7dhgjhfq7boj3pg3fm7evh.apps.googleusercontent.com",
		scopes: ["profile", "email"],
		redirectUri,
	});

	console.log("Response:", request, response, promptAsync);

	const authWithGoogle = () => {
		promptAsync();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, loading && styles.buttonDisabled]}
				onPress={() => {
					authWithGoogle();
				}}
				disabled={loading}
			>
				<FontAwesomeIcon icon={faGoogle} size={28} color='#fff' />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 3,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		backgroundColor: "#374151",
		paddingVertical: 20,
		paddingHorizontal: 36,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonDisabled: {
		opacity: 0.6,
	},
});
