import UserService from "@/services/UserService";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

const discovery = {
	authorizationEndpoint: "https://github.com/login/oauth/authorize",
	tokenEndpoint: "https://github.com/login/oauth/access_token",
	revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
};

export default function GitHubButton() {
	const [loading, setLoading] = useState(false);
	const isAuthenticating = useRef(false);

	const redirectUri = AuthSession.makeRedirectUri({
		scheme: "reactnativeapp",
	});

	const [request, response, promptAsync] = AuthSession.useAuthRequest(
		{
			clientId:
				process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID || "YOUR_GITHUB_CLIENT_ID",
			scopes: ["user", "user:email"],
			redirectUri,
			usePKCE: false,
		},
		discovery
	);

	useEffect(() => {
		const exchangeCodeForToken = async (code: string) => {
			try {
				if (!request) {
					throw new Error("Request not initialized");
				}

				const tokenResponse = await AuthSession.exchangeCodeAsync(
					{
						clientId:
							process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID ||
							"YOUR_GITHUB_CLIENT_ID",
						clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET,
						code: code,
						redirectUri: redirectUri,
					},
					discovery
				);

				return tokenResponse.accessToken;
			} catch (error) {
				console.error("Error exchanging code for token:", error);
				throw error;
			}
		};

		const authenticateUser = async (code: string) => {
			try {
				setLoading(true);

				const accessToken = await exchangeCodeForToken(code);

				const githubUser = await UserService.fetchGitHubUser(accessToken);

				const user = UserService.convertGitHubUser(githubUser);
				await UserService.saveUser(user);

				// Wait a bit to ensure AsyncStorage has persisted
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Verify the data was saved
				const savedUser = await UserService.getUser();
				console.log("Verification - User retrieved after save:", savedUser);

				if (!savedUser) {
					throw new Error("Failed to save user data");
				}

				Alert.alert("Success", `Welcome ${user.name}!`);

				// Additional delay before navigation
				await new Promise((resolve) => setTimeout(resolve, 200));

				router.replace("/home");
			} catch (error) {
				console.error("Authentication error:", error);
				Alert.alert(
					"Error",
					"Failed to authenticate. Please try again or contact support."
				);
				isAuthenticating.current = false;
			} finally {
				setLoading(false);
			}
		};

		if (response?.type === "success" && !isAuthenticating.current) {
			isAuthenticating.current = true;
			const { code } = response.params;
			console.log("GitHub Auth Success - Authorization Code received");
			authenticateUser(code);
		} else if (response?.type === "error") {
			console.log("GitHub Auth Error:", response.error);
			Alert.alert("Error", "Failed to sign in with GitHub");
			setLoading(false);
		} else if (response?.type === "dismiss") {
			console.log("GitHub Auth Dismissed");
			setLoading(false);
		}
	}, [response, redirectUri, request]);

	const authWithGitHub = async () => {
		setLoading(true);
		try {
			await promptAsync();
		} catch (error) {
			console.log("Auth Error:", error);
			Alert.alert("Error", "Failed to authenticate with GitHub");
			setLoading(false);
		}
	};

	console.log("Redirect URI:", redirectUri);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, loading && styles.buttonDisabled]}
				onPress={authWithGitHub}
				disabled={loading}
			>
				<FontAwesomeIcon icon={faGithub} size={28} color='#fff' />
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
