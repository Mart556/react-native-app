import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AuthHeader = ({ label }: { label: string }) => {
	const navigation = useNavigation<any>();

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigation.goBack()}
		>
			<FontAwesomeIcon
				style={{ marginLeft: 30 }}
				icon={faArrowLeft}
				size={24}
				color='#000'
			/>
			<Text style={styles.title}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},

	title: {
		marginLeft: 30,
		fontSize: 32,
		fontWeight: "bold",
	},
});

export default AuthHeader;
