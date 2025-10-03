import BottomNavigation from "@/components/ui/BottomNavigation";
import { getImage } from "@/constants/Images";
import DataService from "@/services/DataService";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Favorites() {
	const [savedItems, setSavedItems] = useState<any[]>([]);

	useEffect(() => {
		const loadFavorites = async () => {
			const favorites = await DataService.getFavoriteProducts();
			setSavedItems(favorites);
		};
		loadFavorites();
	}, []);

	const handleTabPress = (tab: "home" | "favorites" | "profile") => {
		if (tab === "favorites") return;
		if (tab === "profile") {
			router.push("/profile");
		} else {
			router.push(`/${tab}` as any);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Favorites</Text>
			</View>
			<FlatList
				data={savedItems}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View
						style={{
							padding: 10,
							borderBottomWidth: 1,
							borderColor: "#ccc",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Image
							source={getImage(item.image)}
							style={{
								width: 100,
								height: 100,
								marginRight: 10,
								borderRadius: 10,
							}}
							resizeMode='contain'
						/>

						<View style={{ flexDirection: "column", marginLeft: 10 }}>
							<Text style={{ fontSize: 18 }}>{item.name}</Text>
							<Text style={{ color: "#000", fontWeight: "bold" }}>
								${item.price}
							</Text>
						</View>

						<TouchableOpacity
							onPress={async () => {
								setSavedItems((prev) => prev.filter((p) => p.id !== item.id));
								try {
									await DataService.removeFromFavorites(item.id);
								} catch (err) {
									console.error("Failed to remove favorite:", err);
								}
							}}
							style={{
								marginLeft: "auto",
								padding: 8,
								backgroundColor: "#f5f5f5",
								borderRadius: 16,
							}}
							accessibilityLabel={`Remove ${item.name} from favorites`}
						>
							<Text style={{ fontSize: 18, fontWeight: "600", color: "#333" }}>
								✕
							</Text>
						</TouchableOpacity>
					</View>
				)}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<FontAwesome name='star' size={50} color='#ccc' />
						<Text style={styles.emptyTitle}>No favorites yet</Text>
						<Text style={styles.emptySubtitle}>
							Save items you like by tapping the bookmark icon
						</Text>
					</View>
				}
			/>

			<BottomNavigation activeTab='favorites' onTabPress={handleTabPress} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 16,
		paddingTop: 50,
		paddingBottom: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5EA",
	},

	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
	},

	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 100,
	},
	emptyTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#333",
		marginTop: 16,
		marginBottom: 8,
	},
	emptySubtitle: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		paddingHorizontal: 40,
	},
});
