import AsyncStorage from "@react-native-async-storage/async-storage";

// Initial data - you can keep your JSON files as default data
import categoriesData from "@/assets/categories.json";
import productsData from "@/assets/products.json";

export type Category = {
	id: number;
	name: string;
	icon: string;
};

export type Product = {
	id: number;
	name: string;
	price: string;
	image: any;
	isFavorite?: boolean;
};

class DataService {
	private static instance: DataService;
	private categoriesKey = "app_categories";
	private productsKey = "app_products";
	private favoritesKey = "app_favorites";

	static getInstance(): DataService {
		if (!DataService.instance) {
			DataService.instance = new DataService();
		}
		return DataService.instance;
	}

	// Initialize data on first app launch
	async initializeData(): Promise<void> {
		try {
			const existingProducts = await AsyncStorage.getItem(this.productsKey);
			const existingCategories = await AsyncStorage.getItem(this.categoriesKey);

			if (!existingProducts) {
				await AsyncStorage.setItem(
					this.productsKey,
					JSON.stringify(productsData)
				);
			}

			if (!existingCategories) {
				await AsyncStorage.setItem(
					this.categoriesKey,
					JSON.stringify(categoriesData)
				);
			}
		} catch (error) {
			console.error("Error initializing data:", error);
		}
	}

	// Get all categories
	async getCategories(): Promise<Category[]> {
		try {
			const data = await AsyncStorage.getItem(this.categoriesKey);
			return data ? JSON.parse(data) : categoriesData;
		} catch (error) {
			console.error("Error getting categories:", error);
			return categoriesData;
		}
	}

	// Get all products
	async getProducts(): Promise<Product[]> {
		try {
			const data = await AsyncStorage.getItem(this.productsKey);
			const favorites = await this.getFavorites();
			const products: Product[] = data ? JSON.parse(data) : productsData;

			// Mark favorites
			return products.map((product) => ({
				...product,
				isFavorite: favorites.includes(product.id),
			}));
		} catch (error) {
			console.error("Error getting products:", error);
			return productsData;
		}
	}

	// Get favorite product IDs
	async getFavorites(): Promise<number[]> {
		try {
			const data = await AsyncStorage.getItem(this.favoritesKey);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error getting favorites:", error);
			return [];
		}
	}

	// Add product to favorites
	async addToFavorites(productId: number): Promise<void> {
		try {
			const favorites = await this.getFavorites();
			if (!favorites.includes(productId)) {
				favorites.push(productId);
				await AsyncStorage.setItem(
					this.favoritesKey,
					JSON.stringify(favorites)
				);
			}
		} catch (error) {
			console.error("Error adding to favorites:", error);
		}
	}

	// Remove product from favorites
	async removeFromFavorites(productId: number): Promise<void> {
		try {
			const favorites = await this.getFavorites();
			const updatedFavorites = favorites.filter((id) => id !== productId);
			await AsyncStorage.setItem(
				this.favoritesKey,
				JSON.stringify(updatedFavorites)
			);
		} catch (error) {
			console.error("Error removing from favorites:", error);
		}
	}

	// Get favorite products
	async getFavoriteProducts(): Promise<Product[]> {
		try {
			const allProducts = await this.getProducts();
			return allProducts.filter((product) => product.isFavorite);
		} catch (error) {
			console.error("Error getting favorite products:", error);
			return [];
		}
	}

	// Search products
	async searchProducts(query: string): Promise<Product[]> {
		try {
			const allProducts = await this.getProducts();
			return allProducts.filter((product) =>
				product.name.toLowerCase().includes(query.toLowerCase())
			);
		} catch (error) {
			console.error("Error searching products:", error);
			return [];
		}
	}

	// Add new product (for admin features)
	async addProduct(product: Omit<Product, "id">): Promise<void> {
		try {
			const products = await this.getProducts();
			const newId = Math.max(...products.map((p) => p.id)) + 1;
			const newProduct = { ...product, id: newId };
			products.push(newProduct);
			await AsyncStorage.setItem(this.productsKey, JSON.stringify(products));
		} catch (error) {
			console.error("Error adding product:", error);
		}
	}

	async getProductById(productId: number): Promise<Product | null> {
		try {
			const products = await this.getProducts();
			const product = products.find((p) => p.id === productId);
			console.log("Fetched product by ID:", product);
			return product || null;
		} catch (error) {
			console.error("Error getting product by ID:", error);
			return null;
		}
	}
}

export default DataService.getInstance();
