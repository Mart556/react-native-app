import { ImageUploadUtils } from "@/constants/Images";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import DataService from "./DataService";

export type ImageSource = "camera" | "gallery";

export interface ImageUploadResult {
	success: boolean;
	imageUri?: string;
	error?: string;
}

class ImageUploadService {
	private static instance: ImageUploadService;

	static getInstance(): ImageUploadService {
		if (!ImageUploadService.instance) {
			ImageUploadService.instance = new ImageUploadService();
		}
		return ImageUploadService.instance;
	}

	// Request permissions for camera and media library
	async requestPermissions(): Promise<boolean> {
		try {
			// Request camera permissions
			const cameraPermission =
				await ImagePicker.requestCameraPermissionsAsync();

			// Request media library permissions
			const mediaPermission =
				await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (
				cameraPermission.status !== "granted" ||
				mediaPermission.status !== "granted"
			) {
				Alert.alert(
					"Permissions Required",
					"Camera and photo library permissions are required to upload images."
				);
				return false;
			}

			return true;
		} catch (error) {
			console.error("Error requesting permissions:", error);
			return false;
		}
	}

	// Pick image from camera
	async pickFromCamera(): Promise<ImageUploadResult> {
		try {
			const hasPermission = await this.requestPermissions();
			if (!hasPermission) {
				return { success: false, error: "Permissions not granted" };
			}

			const result = await ImagePicker.launchCameraAsync({
				mediaTypes: "images",
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
			});

			if (result.canceled) {
				return { success: false, error: "User canceled" };
			}

			const imageUri = result.assets[0].uri;
			return { success: true, imageUri };
		} catch (error) {
			console.error("Error picking from camera:", error);
			return { success: false, error: "Failed to capture image" };
		}
	}

	// Pick image from gallery
	async pickFromGallery(): Promise<ImageUploadResult> {
		try {
			const hasPermission = await this.requestPermissions();
			if (!hasPermission) {
				return { success: false, error: "Permissions not granted" };
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
			});

			if (result.canceled) {
				return { success: false, error: "User canceled" };
			}

			const imageUri = result.assets[0].uri;
			return { success: true, imageUri };
		} catch (error) {
			console.error("Error picking from gallery:", error);
			return { success: false, error: "Failed to select image" };
		}
	}

	// Show action sheet for image selection
	async showImagePicker(): Promise<ImageUploadResult> {
		return new Promise((resolve) => {
			Alert.alert("Select Image", "Choose how you want to add an image", [
				{
					text: "Camera",
					onPress: async () => {
						const result = await this.pickFromCamera();
						resolve(result);
					},
				},
				{
					text: "Gallery",
					onPress: async () => {
						const result = await this.pickFromGallery();
						resolve(result);
					},
				},
				{
					text: "Cancel",
					style: "cancel",
					onPress: () => resolve({ success: false, error: "User canceled" }),
				},
			]);
		});
	}

	// Upload image and update product
	async uploadProductImage(productId: number): Promise<ImageUploadResult> {
		try {
			const pickResult = await this.showImagePicker();

			if (!pickResult.success || !pickResult.imageUri) {
				return pickResult;
			}

			// In a real app, you would upload to a cloud service here
			// For now, we'll store the local URI
			const imageUri = pickResult.imageUri;

			// Generate unique image ID for reference
			const imageId = ImageUploadUtils.generateImageName(
				`product_${productId}.jpg`
			);

			// Store image reference
			await DataService.storeImageReference(imageId, imageUri);

			// Update product with new image
			await DataService.updateProductImage(productId, imageUri);

			return { success: true, imageUri };
		} catch (error) {
			console.error("Error uploading product image:", error);
			return { success: false, error: "Failed to upload image" };
		}
	}

	// Add new product with image
	async addProductWithImage(productData: {
		name: string;
		price: string;
		description: string;
	}): Promise<{ success: boolean; product?: any; error?: string }> {
		try {
			const pickResult = await this.showImagePicker();

			if (!pickResult.success || !pickResult.imageUri) {
				return { success: false, error: pickResult.error };
			}

			const product = await DataService.addProduct({
				...productData,
				image: pickResult.imageUri,
			});

			return { success: true, product };
		} catch (error) {
			console.error("Error adding product with image:", error);
			return { success: false, error: "Failed to add product" };
		}
	}

	// Future: Upload to cloud storage (placeholder)
	async uploadToCloud(imageUri: string): Promise<string> {
		// This would integrate with services like:
		// - AWS S3
		// - Google Cloud Storage
		// - Cloudinary
		// - Firebase Storage

		// For now, return the local URI
		return imageUri;
	}
}

export default ImageUploadService.getInstance();
