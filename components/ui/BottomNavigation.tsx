import { faBookmark, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface BottomNavigationProps {
	activeTab?: "home" | "bookmark" | "user";
	onTabPress?: (tab: "home" | "bookmark" | "user") => void;
}

export default function BottomNavigation({
	activeTab = "home",
	onTabPress,
}: BottomNavigationProps) {
	const handleTabPress = (tab: "home" | "bookmark" | "user") => {
		onTabPress?.(tab);
	};

	return (
		<View style={styles.bottomNav}>
			<TouchableOpacity
				style={styles.navItem}
				onPress={() => handleTabPress("home")}
			>
				<FontAwesomeIcon
					icon={faHome}
					size={24}
					color={activeTab === "home" ? "#007AFF" : "#999"}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.navItem}
				onPress={() => handleTabPress("bookmark")}
			>
				<FontAwesomeIcon
					icon={faBookmark}
					size={24}
					color={activeTab === "bookmark" ? "#007AFF" : "#999"}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.navItem}
				onPress={() => handleTabPress("user")}
			>
				<FontAwesomeIcon
					icon={faUser}
					size={24}
					color={activeTab === "user" ? "#007AFF" : "#999"}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	bottomNav: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#fff",
		paddingVertical: 20,
		borderTopWidth: 1,
		borderTopColor: "#f0f0f0",
		paddingBottom: 30, // Extra padding for safe area
	},
	navItem: {
		padding: 10,
	},
});
