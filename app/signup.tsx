import AuthHeader from "@/components/ui/AuthHeader";
import AuthInput from "@/components/ui/AuthInput";
import GoogleButton from "@/components/ui/GoogleButton";
import { Checkbox } from "expo-checkbox";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { router } from "expo-router";
import { useState } from "react";

export default function SignupScreen() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = () => {
		/* if (!name || !email || !password) {
			Alert.alert("Validation", "Please fill all fields");
			return;
		} */

		router.push("/home");
	};

	const [isSelected, setSelection] = useState(false);

	return (
		<View style={styles.container}>
			<AuthHeader label='Sign Up' />

			<View style={styles.form}>
				<AuthInput
					label='Name'
					value={name}
					onChangeText={setName}
					placeholder='Your name'
				/>

				<AuthInput
					label='Email'
					value={email}
					onChangeText={setEmail}
					placeholder='you@example.com'
					keyboardType='email-address'
					autoCapitalize='none'
				/>

				<AuthInput
					label='Password'
					value={password}
					onChangeText={setPassword}
					placeholder='••••••••'
					secureTextEntry={true}
				/>

				<View style={styles.checkboxContainer}>
					<Checkbox
						value={isSelected}
						style={{ marginRight: 8 }}
						onValueChange={setSelection}
					/>

					<Text style={styles.label}>I agree to the terms and conditions</Text>
				</View>

				<TouchableOpacity style={styles.button} onPress={onSubmit}>
					<Text style={styles.buttonText}>Sign Up</Text>
				</TouchableOpacity>
			</View>

			<View style={{ flex: 1, alignItems: "center", marginBottom: 30 }}>
				<Text style={{ flex: 1 }}>Or sign up with</Text>

				<GoogleButton />

				<Text style={{ flex: 1 }}>Already have an account? Sign in</Text>
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
