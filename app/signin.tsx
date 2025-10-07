import AuthHeader from "@/components/ui/AuthHeader";
import AuthInput from "@/components/ui/AuthInput";
import GitHubButton from "@/components/ui/GitHubButton";
import React, { useState } from "react";

import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = () => {
		if (!name || !password) {
			Alert.alert("Validation", "Please fill all fields");
			return;
		}
		// Replace with real submit logic
		Alert.alert("Success", `Account created for ${name}`);
	};

	return (
		<View style={styles.container}>
			<AuthHeader label='Sign In' />

			<View style={styles.form}>
				<AuthInput
					label='Name'
					value={name}
					onChangeText={setName}
					placeholder='Your name'
				/>

				<AuthInput
					label='Password'
					value={password}
					onChangeText={setPassword}
					placeholder='••••••••'
					secureTextEntry={true}
				/>

				<TouchableOpacity style={styles.button} onPress={onSubmit}>
					<Text style={styles.buttonText}>Sign In</Text>
				</TouchableOpacity>
			</View>

			<View style={{ flex: 1, alignItems: "center", marginBottom: 30 }}>
				<Text style={{ flex: 1 }}>Or sign in with</Text>

				<GitHubButton />

				<Text style={{ flex: 1 }}>Dont have an account? Sign up</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	form: { marginTop: 50, paddingHorizontal: 30, flex: 3 },
	label: { marginBottom: 6, fontWeight: "600" },
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 20,
		borderRadius: 6,
		marginBottom: 12,
	},
	button: {
		backgroundColor: "#0a84ff",
		padding: 20,
		borderRadius: 6,
		alignItems: "center",
		marginTop: 6,
	},
	buttonText: { color: "white", fontWeight: "700" },

	checkboxContainer: {
		flexDirection: "row",
		marginBottom: 30,
		alignItems: "center",
	},
});
