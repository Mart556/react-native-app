import BottomNavigation from "@/components/ui/BottomNavigation";
import ListItem from "@/components/ui/ListItem";
import SplashButton from "@/components/ui/SplashButton";
import UserService, { User } from "@/services/UserService";
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

export default function Profile() {
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

	const handleMyListings = () => {
		router.push("/my-listings");
	};

	const handleSettings = () => {
		router.push("/settings");
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
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					{user?.avatar && (
						<Image source={{ uri: user.avatar }} style={styles.avatar} />
					)}
					<Text style={styles.name}>{user?.name || "Mart Haamer"}</Text>
					<Text style={styles.email}>
						{user?.email || "mart.haamer@voco.ee"}
					</Text>
					{user?.username && (
						<Text style={styles.username}>@{user.username}</Text>
					)}
				</View>

				<View style={styles.listContainer}>
					<ListItem
						title='My Listings'
						subtitle='Access your listings'
						onPress={handleMyListings}
					/>
					<ListItem
						title='Settings'
						subtitle='Notifications, Dark mode'
						onPress={handleSettings}
					/>
				</View>

				{user?.isAuthenticated && (
					<View style={styles.logoutContainer}>
						<TouchableOpacity
							style={styles.logoutButton}
							onPress={handleLogout}
						>
							<Text style={styles.logoutButtonText}>Logout</Text>
						</TouchableOpacity>
					</View>
				)}
			</ScrollView>

			<View style={{ flex: 1 }}>
				<View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
					<BottomNavigation activeTab='profile' />
				</View>

				<View
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						bottom: 100,
						alignItems: "center",
					}}
				>
					<SplashButton
						title='Create New Listing'
						onPress={() => router.push("/create-listing")}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	content: {
		flex: 1,
	},
	header: {
		backgroundColor: "#fff",
		padding: 20,
		paddingTop: 60,
		marginBottom: 20,
		alignItems: "center",
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 16,
		backgroundColor: "#e0e0e0",
	},
	name: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#000",
	},
	email: {
		fontSize: 15,
		marginTop: 8,
		color: "#666",
	},
	username: {
		fontSize: 16,
		marginTop: 4,
		color: "#007AFF",
		fontWeight: "500",
	},
	listContainer: {
		backgroundColor: "#fff",
		marginHorizontal: 0,
	},
	logoutContainer: {
		backgroundColor: "#fff",
		marginTop: 20,
		marginBottom: 120,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	logoutButton: {
		backgroundColor: "#FF3B30",
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
