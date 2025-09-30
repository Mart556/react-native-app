import DataService, { Category, Product } from "@/services/DataService";
import { useEffect, useState } from "react";

export function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	const loadProducts = async () => {
		setLoading(true);
		const data = await DataService.getProducts();
		setProducts(data);
		setLoading(false);
	};

	const toggleFavorite = async (productId: number) => {
		const product = products.find((p) => p.id === productId);
		if (!product) return;

		if (product.isFavorite) {
			await DataService.removeFromFavorites(productId);
		} else {
			await DataService.addToFavorites(productId);
		}

		// Reload products to update favorite status
		await loadProducts();
	};

	const searchProducts = async (query: string) => {
		if (query.trim() === "") {
			await loadProducts();
		} else {
			setLoading(true);
			const data = await DataService.searchProducts(query);
			setProducts(data);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProducts();
	}, []);

	return {
		products,
		loading,
		toggleFavorite,
		searchProducts,
		refreshProducts: loadProducts,
	};
}

export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);

	const loadCategories = async () => {
		setLoading(true);
		const data = await DataService.getCategories();
		setCategories(data);
		setLoading(false);
	};

	useEffect(() => {
		loadCategories();
	}, []);

	return {
		categories,
		loading,
		refreshCategories: loadCategories,
	};
}

export function useFavorites() {
	const [favorites, setFavorites] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	const loadFavorites = async () => {
		setLoading(true);
		const data = await DataService.getFavoriteProducts();
		setFavorites(data);
		setLoading(false);
	};

	useEffect(() => {
		loadFavorites();
	}, []);

	return {
		favorites,
		loading,
		refreshFavorites: loadFavorites,
	};
}
