import BottomNavigation from "@/components/ui/BottomNavigation";
import {
	faBed,
	faChair,
	faSearch,
	faStar,
	faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { useState } from "react";

const categories = [
	{ id: 1, name: "Popular", icon: faStar },
	{ id: 2, name: "Chair", icon: faChair },
	{ id: 3, name: "Table", icon: faTable },
	{ id: 4, name: "Armchair", icon: faChair },
	{ id: 5, name: "Bed", icon: faBed },
];

const products = [
	{
		id: 1,
		name: "Black Simple Lamp",
		price: "$12.00",
		image: require("@/assets/images/splash.png"), // Replace with actual product images
	},
	{
		id: 2,
		name: "Minimal Stand",
		price: "$25.00",
		image: require("@/assets/images/splash.png"),
	},
	{
		id: 3,
		name: "Coffee Chair",
		price: "$20.00",
		image: require("@/assets/images/splash.png"),
	},
	{
		id: 4,
		name: "Simple Desk",
		price: "$50.00",
		image: require("@/assets/images/splash.png"),
	},
];

export default function Home() {
	const handleTabPress = (tab: "home" | "bookmark" | "user") => {
		if (tab === "home") return;
		router.push(`/${tab}` as any);
	};

	const [filteredProducts, setFilteredProducts] = useState(products);

	const filterProductsBySearch = (inputVal: string) => {
		const filteredProducts = products.filter((product) =>
			product.name.toLowerCase().includes(inputVal.toLowerCase())
		);

		setFilteredProducts(filteredProducts);
	};

	return (
		<View style={styles.container}>
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.searchContainer}>
					<FontAwesomeIcon
						icon={faSearch}
						size={20}
						color='#999'
						style={styles.searchIcon}
					/>
					<TextInput
						style={styles.searchInput}
						placeholder='Find All You Need'
						placeholderTextColor='#999'
						onChangeText={filterProductsBySearch}
					/>
				</View>

				<View style={styles.categoriesContainer}>
					{categories.map((category) => (
						<TouchableOpacity key={category.id} style={styles.categoryItem}>
							<View style={styles.categoryIcon}>
								<FontAwesomeIcon icon={category.icon} size={24} color='#333' />
							</View>
							<Text style={styles.categoryText}>{category.name}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.productsGrid}>
					{filteredProducts.map((product, index) => (
						<TouchableOpacity key={product.id} style={styles.productCard}>
							<View style={styles.productImageContainer}>
								<Image source={product.image} style={styles.productImage} />
							</View>
							<Text style={styles.productName}>{product.name}</Text>
							<Text style={styles.productPrice}>{product.price}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			<BottomNavigation activeTab='home' onTabPress={handleTabPress} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},

	content: {
		flex: 1,
		paddingHorizontal: 20,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f8f8f8",
		borderRadius: 12,
		paddingHorizontal: 15,
		paddingVertical: 12,
		marginTop: 60,
		marginBottom: 30,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: "#333",
	},
	categoriesContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	categoryItem: {
		alignItems: "center",
		flex: 1,
	},
	categoryIcon: {
		width: 50,
		height: 50,
		backgroundColor: "#f8f8f8",
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	categoryText: {
		fontSize: 12,
		color: "#666",
		textAlign: "center",
	},
	productsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		paddingBottom: 100,
	},
	productCard: {
		width: "48%",
		backgroundColor: "#f8f8f8",
		borderRadius: 12,
		padding: 15,
		marginBottom: 15,
	},
	productImageContainer: {
		width: "100%",
		height: 120,
		backgroundColor: "#fff",
		borderRadius: 8,
		marginBottom: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	productImage: {
		width: 80,
		height: 80,
		resizeMode: "contain",
	},
	productName: {
		fontSize: 14,
		fontWeight: "500",
		color: "#333",
		marginBottom: 4,
	},
	productPrice: {
		fontSize: 16,
		fontWeight: "600",
		color: "#000",
	},
});
