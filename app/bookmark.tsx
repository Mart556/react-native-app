import BottomNavigation from "@/components/ui/BottomNavigation";
import { getImage } from "@/constants/Images";
import DataService, { Product } from "@/services/DataService";
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

export default function Bookmark() {
	const [favorites, setFavorites] = useState<Product[]>([]);

	useEffect(() => {
		loadFavorites();
	}, []);

	const loadFavorites = async () => {
		try {
			const favoriteProducts = await DataService.getFavoriteProducts();
			setFavorites(favoriteProducts);
		} catch (error) {
			console.error("Error loading favorites:", error);
		}
	};

	const handleTabPress = (tab: "home" | "favorites" | "profile") => {
		if (tab === "favorites") return;
		if (tab === "profile") {
			router.push("/profile");
		} else {
			router.push(`/${tab}` as any);
		}
	};

	const handleProductPress = (productId: number) => {
		router.push({
			pathname: "/product",
			params: { productId: productId.toString() },
		} as any);
	};

	const handleRemoveFavorite = async (productId: number) => {
		try {
			await DataService.removeFromFavorites(productId);
			setFavorites((prev) => prev.filter((item) => item.id !== productId));
		} catch (error) {
			console.error("Error removing favorite:", error);
		}
	};

	const renderFavoriteItem = ({ item }: { item: Product }) => (
		<View style={styles.favoriteItem}>
			<TouchableOpacity
				style={styles.itemContent}
				onPress={() => handleProductPress(item.id)}
			>
				<Image
					source={getImage(item.image)}
					style={styles.itemImage}
					resizeMode='cover'
				/>
				<View style={styles.itemInfo}>
					<Text style={styles.itemName}>{item.name}</Text>
					<Text style={styles.itemPrice}>{item.price}</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.removeButton}
				onPress={() => handleRemoveFavorite(item.id)}
			>
				<FontAwesome name='times' size={16} color='#666' />
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Bookmarks</Text>
			</View>

			<FlatList
				data={favorites}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderFavoriteItem}
				style={styles.list}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<FontAwesome name='bookmark-o' size={50} color='#ccc' />
						<Text style={styles.emptyTitle}>No bookmarks yet</Text>
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
		backgroundColor: "#f5f5f5",
	},
	header: {
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingTop: 50,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5EA",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
		textAlign: "center",
	},
	list: {
		flex: 1,
		backgroundColor: "#fff",
	},
	favoriteItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5EA",
	},
	itemContent: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	itemImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
		marginRight: 12,
		backgroundColor: "#f0f0f0",
	},
	itemInfo: {
		flex: 1,
	},
	itemName: {
		fontSize: 16,
		fontWeight: "500",
		color: "#000",
		marginBottom: 4,
	},
	itemPrice: {
		fontSize: 14,
		color: "#666",
	},
	removeButton: {
		padding: 8,
		marginLeft: 8,
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
