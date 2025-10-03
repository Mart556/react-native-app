import BottomNavigation from "@/components/ui/BottomNavigation";
import ListItem from "@/components/ui/ListItem";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Settings() {
	const handleBack = () => {
		router.back();
	};

	const handleTabPress = (tab: "home" | "favorites" | "profile") => {
		if (tab === "favorites") {
			router.push("/favorites" as any);
		} else {
			router.push(`/${tab}` as any);
		}
	};

	const handlePersonalInformation = () => {
		console.log("Navigate to Personal Information");
	};

	const handleFavorites = () => {
		router.push("/favorites" as any);
	};

	const handleNotifications = () => {
		console.log("Navigate to Notifications");
	};

	const handleHelp = () => {
		console.log("Navigate to Help Center");
	};

	const handleFAQ = () => {
		console.log("Navigate to FAQ");
	};

	const handleContact = () => {
		console.log("Navigate to Contact Us");
	};

	const handlePrivacy = () => {
		console.log("Navigate to Privacy & Terms");
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleBack} style={styles.backButton}>
					<FontAwesome name='chevron-left' size={20} color='#007AFF' />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Settings</Text>
				<View style={styles.placeholder} />
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.profileSection}>
					<View style={styles.profileInfo}>
						<Text style={styles.profileName}>Mart Haamer</Text>
						<Text style={styles.profileEmail}>mart.haamer@voco.ee</Text>
					</View>
				</View>

				<View style={styles.menuSection}>
					<ListItem
						title='Personal Information'
						onPress={handlePersonalInformation}
					/>
					<ListItem title='Favorites' onPress={handleFavorites} />
					<ListItem title='Notifications' onPress={handleNotifications} />
				</View>

				<View style={styles.menuSection}>
					<ListItem title='Help Center' onPress={handleHelp} />
					<ListItem title='FAQ' onPress={handleFAQ} />
					<ListItem title='Contact Us' onPress={handleContact} />
					<ListItem title='Privacy & Terms' onPress={handlePrivacy} />
				</View>
			</ScrollView>

			<BottomNavigation activeTab='profile' onTabPress={handleTabPress} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingTop: 50,
		paddingBottom: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5EA",
	},
	backButton: {
		width: 44,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
	},
	placeholder: {
		width: 44,
	},
	content: {
		flex: 1,
	},
	profileSection: {
		backgroundColor: "#fff",
		marginBottom: 20,
	},
	profileInfo: {
		padding: 20,
		alignItems: "center",
	},
	profileName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 4,
	},
	profileEmail: {
		fontSize: 16,
		color: "#666",
	},
	menuSection: {
		backgroundColor: "#fff",
		marginBottom: 20,
	},
});
