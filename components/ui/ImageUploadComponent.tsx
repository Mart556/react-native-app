import { getImage } from "@/constants/Images";
import ImageUploadService from "@/services/ImageUploadService";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface ImageUploadComponentProps {
	productId?: number;
	currentImage?: string;
	onImageUploaded?: (imageUri: string) => void;
}

export default function ImageUploadComponent({
	productId,
	currentImage,
	onImageUploaded,
}: ImageUploadComponentProps) {
	const [imageUri, setImageUri] = useState<string | undefined>(currentImage);
	const [uploading, setUploading] = useState(false);

	const handleImageUpload = async () => {
		try {
			setUploading(true);

			if (productId) {
				// Update existing product image
				const result = await ImageUploadService.uploadProductImage(productId);

				if (result.success && result.imageUri) {
					setImageUri(result.imageUri);
					onImageUploaded?.(result.imageUri);
					Alert.alert("Success", "Image uploaded successfully!");
				} else {
					Alert.alert("Error", result.error || "Failed to upload image");
				}
			} else {
				// Just pick an image without saving to product
				const result = await ImageUploadService.showImagePicker();

				if (result.success && result.imageUri) {
					setImageUri(result.imageUri);
					onImageUploaded?.(result.imageUri);
				}
			}
		} catch (error) {
			console.error("Error uploading image:", error);
			Alert.alert("Error", "Failed to upload image");
		} finally {
			setUploading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				{imageUri ? (
					<Image
						source={getImage(imageUri)}
						style={styles.image}
						resizeMode='cover'
					/>
				) : (
					<View style={styles.placeholder}>
						<Text style={styles.placeholderText}>No Image</Text>
					</View>
				)}

				{uploading && (
					<View style={styles.loadingOverlay}>
						<ActivityIndicator size='large' color='#0a84ff' />
					</View>
				)}
			</View>

			<TouchableOpacity
				style={styles.uploadButton}
				onPress={handleImageUpload}
				disabled={uploading}
			>
				<Text style={styles.uploadButtonText}>
					{uploading
						? "Uploading..."
						: imageUri
						? "Change Image"
						: "Upload Image"}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginVertical: 16,
	},
	imageContainer: {
		width: 200,
		height: 200,
		borderRadius: 12,
		overflow: "hidden",
		backgroundColor: "#f5f5f5",
		marginBottom: 16,
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	placeholder: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#e0e0e0",
	},
	placeholderText: {
		color: "#999",
		fontSize: 16,
	},
	loadingOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	uploadButton: {
		backgroundColor: "#0a84ff",
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
	},
	uploadButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});
