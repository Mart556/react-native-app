import BottomNavigation from "@/components/ui/BottomNavigation";
import ListItem from "@/components/ui/ListItem";
import UserService, { User } from "@/services/UserService";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Settings() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		loadUser();
	}, []);

	const loadUser = async () => {
		try {
			const userData = await UserService.getUser();
			setUser(userData);
		} catch (error) {
			console.error("Error loading user:", error);
		}
	};

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

	const handleLogout = () => {
		Alert.alert("Logout", "Are you sure you want to logout?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Logout",
				style: "destructive",
				onPress: async () => {
					try {
						await UserService.logout();
						Alert.alert("Success", "You have been logged out");
						router.push("/signup");
					} catch (error) {
						console.error("Error logging out:", error);
						Alert.alert("Error", "Failed to logout");
					}
				},
			},
		]);
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
						{user?.avatar && (
							<Image source={{ uri: user.avatar }} style={styles.avatar} />
						)}
						<Text style={styles.profileName}>
							{user?.name || "Mart Haamer"}
						</Text>
						<Text style={styles.profileEmail}>
							{user?.email || "mart.haamer@voco.ee"}
						</Text>
						{user?.username && (
							<Text style={styles.username}>@{user.username}</Text>
						)}
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

				{user?.isAuthenticated && (
					<View style={styles.menuSection}>
						<TouchableOpacity
							style={styles.logoutButton}
							onPress={handleLogout}
						>
							<Text style={styles.logoutButtonText}>Logout</Text>
						</TouchableOpacity>
					</View>
				)}
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
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: 12,
		backgroundColor: "#e0e0e0",
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
	username: {
		fontSize: 14,
		color: "#007AFF",
		marginTop: 4,
		fontWeight: "500",
	},
	menuSection: {
		backgroundColor: "#fff",
		marginBottom: 20,
	},
	logoutButton: {
		backgroundColor: "#FF3B30",
		marginHorizontal: 16,
		marginVertical: 12,
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: "center",
	},
	logoutButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
