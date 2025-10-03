import { faBookmark, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { getImage } from "@/constants/Images";
import DataService, { Product } from "@/services/DataService";

export default function ProductPage() {
	const { productId } = useLocalSearchParams();
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [productData, setProductData] = useState<Product | null>(null);

	const handleBack = () => {
		router.back();
	};

	const handleBookmark = () => {
		setIsBookmarked(!isBookmarked);

		if (isBookmarked) {
			DataService.removeFromFavorites(Number(productId) as number);
		} else {
			DataService.addToFavorites(Number(productId) as number);
		}
	};

	const handleContactSeller = () => {
		console.log("Contact seller pressed");
	};

	useEffect(() => {
		const fetchData = async () => {
			const product = await DataService.getProductById(
				Number(productId) as number
			);

			setProductData(product);
		};

		fetchData();
	}, [productId]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={handleBack}>
					<FontAwesomeIcon icon={faChevronLeft} size={24} color='#333' />
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.imageContainer}>
					<Image
						source={getImage(productData?.image || "")}
						style={styles.productImage}
						resizeMode='cover'
					/>
				</View>

				<View style={styles.detailsCard}>
					<View style={styles.titleRow}>
						<Text style={styles.productName}>{productData?.name}</Text>
					</View>

					<Text style={styles.price}>{productData?.price}</Text>

					<Text style={styles.description}>{productData?.description}</Text>
				</View>
			</ScrollView>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: "auto",
					marginBottom: 16,
					paddingHorizontal: 20,
				}}
			>
				<TouchableOpacity
					style={styles.bookmarkButton}
					onPress={handleBookmark}
				>
					<FontAwesomeIcon
						icon={faBookmark}
						size={24}
						color={isBookmarked ? "#007AFF" : "#999"}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.contactButton}
					onPress={handleContactSeller}
				>
					<Text style={styles.contactButtonText}>Contact Seller</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f8f8",
	},
	header: {
		paddingTop: 50,
		paddingHorizontal: 20,
		paddingBottom: 10,
		backgroundColor: "#f8f8f8",
	},
	backButton: {
		width: 40,
		height: 40,
		backgroundColor: "#fff",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	content: {
		flex: 1,
	},
	imageContainer: {
		height: 300,
		backgroundColor: "#f8f8f8",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 40,
	},
	productImage: {
		width: "100%",
		height: "100%",
	},
	detailsCard: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingHorizontal: 30,
		paddingTop: 30,
		paddingBottom: 40,
		minHeight: 400,
	},
	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	productName: {
		fontSize: 24,
		fontWeight: "700",
		color: "#333",
		flex: 1,
	},
	price: {
		fontSize: 32,
		fontWeight: "700",
		color: "#000",
		marginBottom: 25,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		color: "#666",
		marginBottom: 40,
	},

	bookmarkButton: {
		padding: 10,
		paddingHorizontal: 12,
		backgroundColor: "#ccc",
		justifyContent: "center",
		borderRadius: 8,
	},
	contactButton: {
		backgroundColor: "#007AFF",
		paddingVertical: 18,
		borderRadius: 12,
		alignItems: "center",
		width: "80%",
	},
	contactButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
	},
});
