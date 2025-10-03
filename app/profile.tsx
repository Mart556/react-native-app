import BottomNavigation from "@/components/ui/BottomNavigation";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Profile() {
	return (
		<View style={styles.container}>
			<BottomNavigation activeTab='profile' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
