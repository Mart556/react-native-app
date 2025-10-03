// Centralized image management for the app
// All images from assets/images folder

export const Images = {
	// Product Images
	splash: require("@/assets/images/splash.png"),
	coffeChair: require("@/assets/images/coffe-chair.png"),
	coffeTable: require("@/assets/images/coffe-table.png"),
	minimalDesk: require("@/assets/images/minimal-desk.png"),
	minimalTable: require("@/assets/images/minimal-tabel.png"),
};

// Image mapping by string key (for JSON data compatibility)
export const ImageMap: { [key: string]: any } = {
	"@/assets/images/splash.png": Images.splash,
	"@/assets/images/coffe-chair.png": Images.coffeChair,
	"@/assets/images/coffe-table.png": Images.coffeTable,
	"@/assets/images/minimal-desk.png": Images.minimalDesk,
	"@/assets/images/minimal-tabel.png": Images.minimalTable,

	// Alternative naming conventions
	"splash.png": Images.splash,
	"coffe-chair.png": Images.coffeChair,
	"coffe-table.png": Images.coffeTable,
	"minimal-desk.png": Images.minimalDesk,
	"minimal-tabel.png": Images.minimalTable,
};

// Helper function to get image by path or name
export const getImage = (imagePath: string) => {
	// Check if it's a web URL (uploaded images will be URLs)
	if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
		return { uri: imagePath };
	}

	// Check if it's a base64 data URI (camera/gallery images)
	if (imagePath.startsWith("data:image/")) {
		return { uri: imagePath };
	}

	// Check if it's a file:// URI (local device images)
	if (imagePath.startsWith("file://")) {
		return { uri: imagePath };
	}

	// Return mapped local image or fallback to splash
	return ImageMap[imagePath] || Images.splash;
};

// Image upload and management utilities
export const ImageUploadUtils = {
	// Validate image file type
	isValidImageType: (fileName: string): boolean => {
		const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
		const extension = fileName
			.toLowerCase()
			.substring(fileName.lastIndexOf("."));
		return validExtensions.includes(extension);
	},

	// Generate unique filename for uploads
	generateImageName: (originalName: string): string => {
		const timestamp = Date.now();
		const extension = originalName.substring(originalName.lastIndexOf("."));
		return `product_${timestamp}${extension}`;
	},

	// Convert local image to base64 (for temporary storage)
	convertToBase64: async (imageUri: string): Promise<string> => {
		try {
			// This would require expo-file-system
			// const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
			// return `data:image/jpeg;base64,${base64}`;

			// For now, return the URI as-is
			return imageUri;
		} catch (error) {
			console.error("Error converting image to base64:", error);
			return imageUri;
		}
	},

	// Get image source for React Native Image component
	getImageSource: (imagePath: string) => {
		return getImage(imagePath);
	},
};

// Get all available images as an array (useful for testing/debugging)
export const getAllImages = () => Object.values(Images);

// Get image names (useful for selection components)
export const getImageNames = () => Object.keys(Images);
