import BottomNavigation from "@/components/ui/BottomNavigation";
import { getImage } from "@/constants/Images";
import DataService, { Product } from "@/services/DataService";
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

export default function MyListings() {
	const [listings, setListings] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadListings();
	}, []);

	const loadListings = async () => {
		try {
			const products = await DataService.getProducts();
			setListings(products);
		} catch (error) {
			console.error("Error loading listings:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleBack = () => {
		router.back();
	};

	const handleTabPress = (tab: "home" | "favorites" | "profile") => {
		if (tab === "favorites") {
			router.push("/bookmark" as any);
		} else {
			router.push(`/${tab}` as any);
		}
	};

	const handleEditListing = (productId: number) => {
		// Navigate to edit listing page
		console.log("Edit listing:", productId);
	};

	const handleDeleteListing = (productId: number) => {
		Alert.alert(
			"Delete Listing",
			"Are you sure you want to delete this listing?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						try {
							await DataService.deleteProduct(productId);
							await loadListings(); // Refresh the list
							Alert.alert("Success", "Listing deleted successfully");
						} catch (error) {
							console.error("Error deleting listing:", error);
							Alert.alert("Error", "Failed to delete listing");
						}
					},
				},
			]
		);
	};

	const handleProductPress = (productId: number) => {
		router.push({
			pathname: "/product",
			params: { productId: productId.toString() },
		} as any);
	};

	const renderListingItem = (item: Product) => (
		<View key={item.id} style={styles.listingItem}>
			<TouchableOpacity
				style={styles.listingContent}
				onPress={() => handleProductPress(item.id)}
			>
				<Image
					source={getImage(item.image)}
					style={styles.listingImage}
					resizeMode='cover'
				/>
				<View style={styles.listingInfo}>
					<Text style={styles.listingTitle}>{item.name}</Text>
					<Text style={styles.listingPrice}>{item.price}</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.editButton}
				onPress={() => handleEditListing(item.id)}
			>
				<FontAwesome name='edit' size={20} color='#666' />
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.deleteButton}
				onPress={() => handleDeleteListing(item.id)}
			>
				<FontAwesome name='trash' size={20} color='#ff3b30' />
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleBack} style={styles.backButton}>
					<FontAwesome name='chevron-left' size={20} color='#007AFF' />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>My Listings</Text>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => router.push("/create-listing")}
				>
					<FontAwesome name='plus' size={20} color='#007AFF' />
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.statsSection}>
					<Text style={styles.statsText}>
						{listings.length} {listings.length === 1 ? "listing" : "listings"}
					</Text>
				</View>

				<View style={styles.listingsContainer}>
					{loading ? (
						<View style={styles.loadingContainer}>
							<Text style={styles.loadingText}>Loading listings...</Text>
						</View>
					) : listings.length === 0 ? (
						<View style={styles.emptyContainer}>
							<FontAwesome name='plus-circle' size={50} color='#ccc' />
							<Text style={styles.emptyTitle}>No listings yet</Text>
							<Text style={styles.emptySubtitle}>
								Tap the + button to create your first listing
							</Text>
						</View>
					) : (
						listings.map(renderListingItem)
					)}
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
	addButton: {
		width: 44,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		flex: 1,
	},
	statsSection: {
		backgroundColor: "#fff",
		padding: 16,
		marginBottom: 1,
	},
	statsText: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
	},
	listingsContainer: {
		backgroundColor: "#fff",
	},
	listingItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5EA",
	},
	listingContent: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	listingImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 12,
		backgroundColor: "#f0f0f0",
	},
	listingInfo: {
		flex: 1,
	},
	listingTitle: {
		fontSize: 16,
		fontWeight: "500",
		color: "#000",
		marginBottom: 4,
	},
	listingPrice: {
		fontSize: 14,
		color: "#666",
	},
	editButton: {
		padding: 8,
		marginLeft: 8,
	},
	deleteButton: {
		padding: 8,
		marginLeft: 4,
	},
	loadingContainer: {
		padding: 40,
		alignItems: "center",
	},
	loadingText: {
		fontSize: 16,
		color: "#666",
	},
	emptyContainer: {
		padding: 40,
		alignItems: "center",
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
	},
});
