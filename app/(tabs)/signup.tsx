import { useNavigation } from "@react-navigation/native";

import {
	Alert,
	CheckBox,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { useState } from "react";

export default function SignupScreen() {
	const navigation = useNavigation();

	navigation.setOptions({
		title: "Sign Up",
		tabBarLabel: "Sign Up",
	});

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = () => {
		if (!name || !email || !password) {
			Alert.alert("Validation", "Please fill all fields");
			return;
		}
		// Replace with real submit logic
		Alert.alert("Success", `Account created for ${name}`);
	};

	const [isSelected, setSelection] = useState(false);

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>⬅️ Sign Up</Text>
			</View>

			<View style={styles.form}>
				<Text style={styles.label}>Name</Text>
				<TextInput
					value={name}
					onChangeText={setName}
					placeholder='Your name'
					style={styles.input}
				/>

				<Text style={styles.label}>Email</Text>
				<TextInput
					value={email}
					onChangeText={setEmail}
					placeholder='you@example.com'
					keyboardType='email-address'
					autoCapitalize='none'
					style={styles.input}
				/>

				<Text style={styles.label}>Password</Text>
				<TextInput
					value={password}
					onChangeText={setPassword}
					placeholder='••••••••'
					secureTextEntry
					style={styles.input}
				/>
				<CheckBox
					value={isSelected}
					onValueChange={setSelection}
					style={styles.checkbox}
				/>

				<TouchableOpacity style={styles.button} onPress={onSubmit}>
					<Text style={styles.buttonText}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		marginTop: 60,
		marginLeft: 30,
		fontSize: 32,
		fontWeight: "bold",
	},

	form: { marginTop: 50, paddingHorizontal: 30 },
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

	checkbox: { alignSelf: "center" },
});
