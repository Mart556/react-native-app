import { faBookmark, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface BottomNavigationProps {
	activeTab?: "home" | "favorites" | "profile";
	onTabPress?: (tab: "home" | "favorites" | "profile") => void;
}

export default function BottomNavigation({
	activeTab = "home",
}: BottomNavigationProps) {
	const handleTabPress = (tab: "home" | "favorites" | "profile") => {
		if (tab === activeTab) return;
		router.push(`/${tab}` as any);
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
				onPress={() => handleTabPress("favorites")}
			>
				<FontAwesomeIcon
					icon={faBookmark}
					size={24}
					color={activeTab === "favorites" ? "#007AFF" : "#999"}
				/>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.navItem}
				onPress={() => handleTabPress("profile")}
			>
				<FontAwesomeIcon
					icon={faUser}
					size={24}
					color={activeTab === "profile" ? "#007AFF" : "#999"}
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
