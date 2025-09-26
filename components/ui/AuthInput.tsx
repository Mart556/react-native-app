import { StyleSheet, Text, TextInput, View } from "react-native";

const AuthInput = ({
	label,
	...props
}: {
	label: string;
	[key: string]: any;
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput style={styles.input} {...props} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 12,
	},
	label: {
		marginBottom: 6,
		fontWeight: "600",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 12,
		borderRadius: 6,
	},
});

export default AuthInput;
