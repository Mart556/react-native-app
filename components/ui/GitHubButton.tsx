import UserService from "@/services/UserService";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

const discovery = {
	authorizationEndpoint: "https://github.com/login/oauth/authorize",
	tokenEndpoint: "https://github.com/login/oauth/access_token",
	revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
};

export default function GitHubButton() {
	const [loading, setLoading] = useState(false);

	// Use Expo's auth session for GitHub authentication
	const redirectUri = AuthSession.makeRedirectUri();

	const [request, response, promptAsync] = AuthSession.useAuthRequest(
		{
			clientId:
				process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID || "YOUR_GITHUB_CLIENT_ID",
			scopes: ["user", "user:email"],
			redirectUri,
			usePKCE: false, // Disable PKCE since we're using client secret
		},
		discovery
	);

	// Handle authentication response
	useEffect(() => {
		// Exchange authorization code for access token
		const exchangeCodeForToken = async (code: string) => {
			try {
				if (!request) {
					throw new Error("Request not initialized");
				}

				// Since we disabled PKCE, we can use exchangeCodeAsync without code_verifier
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

		// Fetch user data and save to local storage
		const authenticateUser = async (code: string) => {
			try {
				setLoading(true);

				// Step 1: Exchange code for access token
				const accessToken = await exchangeCodeForToken(code);

				// Step 2: Fetch GitHub user data
				const githubUser = await UserService.fetchGitHubUser(accessToken);

				// Step 3: Convert and save user data
				const user = UserService.convertGitHubUser(githubUser);
				await UserService.saveUser(user);

				// Step 4: Navigate to home
				Alert.alert("Success", `Welcome ${user.name}!`);
				router.push("/home");
			} catch (error) {
				console.error("Authentication error:", error);
				Alert.alert(
					"Error",
					"Failed to authenticate. Please try again or contact support."
				);
			} finally {
				setLoading(false);
			}
		};

		if (response?.type === "success") {
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
