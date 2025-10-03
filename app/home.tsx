import BottomNavigation from "@/components/ui/BottomNavigation";
import {
	faBed,
	faChair,
	faCouch,
	faSearch,
	faStar,
	faTable,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { getImage } from "@/constants/Images";
import { useCategories, useProducts } from "@/hooks/useData";
import DataService, { Category, Product } from "@/services/DataService";

// Icon mapping function
const getIconFromName = (iconName: string) => {
	// Extract the actual icon name from FontAwesome class (e.g., "fa-solid fa-bed" -> "bed")
	const actualIconName = iconName.split(" ").pop()?.replace("fa-", "") || "";

	const iconMap: { [key: string]: any } = {
		star: faStar,
		chair: faChair,
		table: faTable,
		bed: faBed,
		couch: faCouch,
	};
	return iconMap[actualIconName.toLowerCase()] || faStar; // Default to star if not found
};

export default function Home() {
	const { products } = useProducts();
	const { categories } = useCategories();
	const [filteredProducts, setFilteredProducts] = useState(products);

	// Initialize data on first load
	useEffect(() => {
		DataService.initializeData();
	}, []);

	// Update filtered products when products change
	useEffect(() => {
		setFilteredProducts(products);
	}, [products]);

	const filterProductsBySearch = (inputVal: string) => {
		if (inputVal.trim() === "") {
			setFilteredProducts(products);
		} else {
			const filtered = products.filter((product) =>
				product.name.toLowerCase().includes(inputVal.toLowerCase())
			);
			setFilteredProducts(filtered);
		}
	};

	const openProductDetails = (productId: number) => {
		router.push({
			pathname: "/product",
			params: {
				productId: productId.toString(),
			},
		} as any);
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
					{categories.map((category: Category) => (
						<TouchableOpacity key={category.id} style={styles.categoryItem}>
							<View style={styles.categoryIcon}>
								<FontAwesomeIcon
									icon={getIconFromName(category.icon)}
									size={24}
									color='#333'
								/>
							</View>
							<Text style={styles.categoryText}>{category.name}</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.productsGrid}>
					{filteredProducts.map((product: Product, index: number) => (
						<TouchableOpacity
							key={product.id}
							style={styles.productCard}
							onPress={() => openProductDetails(product.id)}
						>
							<View style={styles.productImageContainer}>
								<Image
									source={getImage(product.image)}
									style={styles.productImage}
								/>
							</View>
							<Text style={styles.productName}>{product.name}</Text>
							<Text style={styles.productPrice}>{product.price}</Text>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			<BottomNavigation activeTab='home' />
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
		resizeMode: "cover",
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
