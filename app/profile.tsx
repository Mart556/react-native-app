import BottomNavigation from "@/components/ui/BottomNavigation";
import ListItem from "@/components/ui/ListItem";
import SplashButton from "@/components/ui/SplashButton";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Profile() {
	const handleMyListings = () => {
		router.push("/my-listings");
	};

	const handleSettings = () => {
		router.push("/settings");
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text style={styles.name}>Mart Haamer</Text>
					<Text style={styles.email}>mart.haamer@voco.ee</Text>
				</View>

				<View style={styles.listContainer}>
					<ListItem
						title='My Listings'
						subtitle='Access your 15 listings'
						onPress={handleMyListings}
					/>
					<ListItem
						title='Settings'
						subtitle='Notifications, Dark mode'
						onPress={handleSettings}
					/>
				</View>
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
	listContainer: {
		backgroundColor: "#fff",
		marginHorizontal: 0,
	},
});
