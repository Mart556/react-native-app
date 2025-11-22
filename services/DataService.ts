import AsyncStorage from "@react-native-async-storage/async-storage";

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
	description: string;
	category?: string;
	image: string;
	isFavorite?: boolean;
};

export type Favorite = {
	productId: number;
	name: string;
	image: string;
	price: string;
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

	async initializeData(): Promise<void> {
		try {
			fetch("https://fakestoreapi.com/products")
				.then((response) => response.json())
				.then((data) => {
					data = data.map((item: any) => ({
						id: item.id,
						name: item.title,
						price: item.price,
						description: item.description,
						category: item.category,
						image: item.image,
					}));

					AsyncStorage.setItem(this.productsKey, JSON.stringify(data));
				});

			const existingCategories = await AsyncStorage.getItem(this.categoriesKey);

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

	async getCategories(): Promise<Category[]> {
		try {
			const data = await AsyncStorage.getItem(this.categoriesKey);
			return data ? JSON.parse(data) : categoriesData;
		} catch (error) {
			console.error("Error getting categories:", error);
			return categoriesData;
		}
	}

	async getProducts(): Promise<Product[]> {
		try {
			const data = await AsyncStorage.getItem(this.productsKey);
			const favorites = await this.getFavorites();
			const allProducts = data ? JSON.parse(data) : productsData;

			return allProducts.map((product: Product) => ({
				...product,
				isFavorite: favorites.some((fav) => fav.productId === product.id),
			}));
		} catch (error) {
			console.error("Error getting products:", error);
			return productsData;
		}
	}

	async getFavorites(): Promise<Favorite[]> {
		try {
			const data = await AsyncStorage.getItem(this.favoritesKey);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error("Error getting favorites:", error);
			return [];
		}
	}

	async addToFavorites(productId: number): Promise<void> {
		try {
			const favorites = await this.getFavorites();
			if (!favorites.find((fav) => fav.productId === productId)) {
				const product = await this.getProductById(productId);
				if (product) {
					favorites.push({
						productId: product.id,
						name: product.name,
						image: product.image,
						price: product.price,
					});
					await AsyncStorage.setItem(
						this.favoritesKey,
						JSON.stringify(favorites)
					);
				}
			}
		} catch (error) {
			console.error("Error adding to favorites:", error);
		}
	}

	async removeFromFavorites(productId: number): Promise<void> {
		try {
			const favorites = await this.getFavorites();
			const updatedFavorites = favorites.filter(
				(fav) => fav.productId !== productId
			);
			await AsyncStorage.setItem(
				this.favoritesKey,
				JSON.stringify(updatedFavorites)
			);
		} catch (error) {
			console.error("Error removing from favorites:", error);
		}
	}

	async getFavoriteProducts(): Promise<Product[]> {
		try {
			const allProducts = await this.getProducts();
			return allProducts.filter((product) => product.isFavorite);
		} catch (error) {
			console.error("Error getting favorite products:", error);
			return [];
		}
	}

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

	async addProduct(product: Omit<Product, "id">): Promise<Product> {
		try {
			const products = await this.getProducts();
			const newId = Math.max(...products.map((p) => p.id)) + 1;
			const newProduct = { ...product, id: newId };
			products.push(newProduct);
			await AsyncStorage.setItem(this.productsKey, JSON.stringify(products));
			return newProduct;
		} catch (error) {
			console.error("Error adding product:", error);
			throw error;
		}
	}

	async updateProduct(
		productId: number,
		updates: Partial<Product>
	): Promise<void> {
		try {
			const products = await this.getProducts();
			const index = products.findIndex((p) => p.id === productId);
			if (index !== -1) {
				products[index] = { ...products[index], ...updates };
				await AsyncStorage.setItem(this.productsKey, JSON.stringify(products));
			}
		} catch (error) {
			console.error("Error updating product:", error);
			throw error;
		}
	}

	async deleteProduct(productId: number): Promise<void> {
		try {
			const products = await this.getProducts();
			const filteredProducts = products.filter((p) => p.id !== productId);

			await AsyncStorage.setItem(
				this.productsKey,
				JSON.stringify(filteredProducts)
			);

			await this.removeFromFavorites(productId);
		} catch (error) {
			console.error("Error deleting product:", error);
			throw error;
		}
	}

	async updateProductImage(productId: number, imageUri: string): Promise<void> {
		try {
			await this.updateProduct(productId, { image: imageUri });
		} catch (error) {
			console.error("Error updating product image:", error);
			throw error;
		}
	}

	async storeImageReference(imageId: string, imageUri: string): Promise<void> {
		try {
			const imageRefsKey = "app_image_references";
			const existingRefs = await AsyncStorage.getItem(imageRefsKey);
			const refs = existingRefs ? JSON.parse(existingRefs) : {};
			refs[imageId] = imageUri;
			await AsyncStorage.setItem(imageRefsKey, JSON.stringify(refs));
		} catch (error) {
			console.error("Error storing image reference:", error);
		}
	}

	async getImageReference(imageId: string): Promise<string | null> {
		try {
			const imageRefsKey = "app_image_references";
			const refs = await AsyncStorage.getItem(imageRefsKey);
			if (refs) {
				const parsedRefs = JSON.parse(refs);
				return parsedRefs[imageId] || null;
			}
			return null;
		} catch (error) {
			console.error("Error getting image reference:", error);
			return null;
		}
	}

	async getProductById(productId: number): Promise<Product | null> {
		try {
			const products = await this.getProducts();
			const product = products.find((p) => p.id === productId);

			return product || null;
		} catch (error) {
			console.error("Error getting product by ID:", error);
			return null;
		}
	}
}

export default DataService.getInstance();
