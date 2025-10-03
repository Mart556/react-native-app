import BottomNavigation from "@/components/ui/BottomNavigation";
import { getImage } from "@/constants/Images";
import DataService from "@/services/DataService";
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

	return (
		<View style={styles.container}>
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
					<Text style={{ padding: 20, textAlign: "center" }}>
						No favorites saved.
					</Text>
				}
			/>

			<BottomNavigation activeTab='favorites' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
