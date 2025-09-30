import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export default function GoogleButton() {
	const [loading, setLoading] = useState(false);

	// Use Expo's auth session for Google authentication
	const redirectUri = AuthSession.makeRedirectUri();

	const [, response, promptAsync] = Google.useAuthRequest({
		clientId:
			"909358664769-6mbgvjpsvf7dhgjhfq7boj3pg3fm7evh.apps.googleusercontent.com",
		scopes: ["profile", "email"],
		redirectUri,
	});

	// Handle authentication response
	useEffect(() => {
		if (response?.type === "success") {
			const { authentication } = response;
			console.log("Google Auth Success:", authentication);

			// You can use the access token to get user info
			// fetchUserInfo(authentication.accessToken);

			Alert.alert("Success", "Signed in with Google!");
			setLoading(false);

			// You can add navigation logic here, e.g.:
			// router.push('/home');
		} else if (response?.type === "error") {
			console.log("Google Auth Error:", response.error);
			Alert.alert("Error", "Failed to sign in with Google");
			setLoading(false);
		} else if (response?.type === "dismiss") {
			console.log("Google Auth Dismissed");
			setLoading(false);
		}
	}, [response]);

	const authWithGoogle = async () => {
		setLoading(true);
		try {
			await promptAsync();
		} catch (error) {
			console.log("Auth Error:", error);
			Alert.alert("Error", "Failed to authenticate with Google");
			setLoading(false);
		}
	};

	console.log("Redirect URI:", redirectUri);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, loading && styles.buttonDisabled]}
				onPress={authWithGoogle}
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
