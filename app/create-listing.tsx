import BottomNavigation from "@/components/ui/BottomNavigation";
import ImageUploadComponent from "@/components/ui/ImageUploadComponent";
import DataService from "@/services/DataService";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function CreateListing() {
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [imageUri, setImageUri] = useState("");
	const [loading, setLoading] = useState(false);

	const handleBack = () => {
		router.back();
	};

	const handleTabPress = (tab: "home" | "favorites" | "profile") => {
		if (tab === "favorites") {
			router.push("/bookmark" as any);
		} else {
			router.push(`/${tab}` as any);
		}
	};

	const handleSubmit = async () => {
		if (!title.trim() || !price.trim() || !description.trim()) {
			Alert.alert("Error", "Please fill in all required fields");
			return;
		}

		try {
			setLoading(true);

			await DataService.addProduct({
				name: title.trim(),
				price: price.trim(),
				description: description.trim(),
				image: imageUri || "@/assets/images/splash.png",
			});

			Alert.alert("Success", "Listing created successfully!", [
				{ text: "OK", onPress: () => router.back() },
			]);
		} catch (error) {
			console.error("Error creating listing:", error);
			Alert.alert("Error", "Failed to create listing");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handleBack} style={styles.backButton}>
					<FontAwesome name='chevron-left' size={20} color='#007AFF' />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Create a new listing</Text>
				<View style={styles.placeholder} />
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Upload photos</Text>
					<ImageUploadComponent
						currentImage={imageUri}
						onImageUploaded={setImageUri}
					/>
				</View>

				<View style={styles.section}>
					<Text style={styles.label}>Title</Text>
					<TextInput
						style={styles.input}
						value={title}
						onChangeText={setTitle}
						placeholder='What are you selling?'
						placeholderTextColor='#999'
					/>
				</View>

				<View style={styles.section}>
					<Text style={styles.label}>Category</Text>
					<TextInput
						style={styles.input}
						value={category}
						onChangeText={setCategory}
						placeholder='Select category'
						placeholderTextColor='#999'
					/>
				</View>

				<View style={styles.section}>
					<Text style={styles.label}>Price</Text>
					<TextInput
						style={styles.input}
						value={price}
						onChangeText={setPrice}
						placeholder='Set a price'
						placeholderTextColor='#999'
						keyboardType='numeric'
					/>
				</View>

				<View style={styles.section}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={[styles.input, styles.textArea]}
						value={description}
						onChangeText={setDescription}
						placeholder='Tell us more...'
						placeholderTextColor='#999'
						multiline
						numberOfLines={4}
						textAlignVertical='top'
					/>
				</View>

				<TouchableOpacity
					style={[styles.submitButton, loading && styles.submitButtonDisabled]}
					onPress={handleSubmit}
					disabled={loading}
				>
					<Text style={styles.submitButtonText}>
						{loading ? "Creating..." : "Submit"}
					</Text>
				</TouchableOpacity>
			</ScrollView>

			<BottomNavigation activeTab='home' onTabPress={handleTabPress} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingTop: 50,
		paddingBottom: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5EA",
	},
	backButton: {
		width: 44,
		height: 44,
		justifyContent: "center",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#000",
	},
	placeholder: {
		width: 44,
	},
	content: {
		flex: 1,
		paddingBottom: 100,
	},
	section: {
		backgroundColor: "#fff",
		marginBottom: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#000",
		marginBottom: 12,
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		color: "#000",
		marginBottom: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: "#E5E5EA",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		backgroundColor: "#fff",
		color: "#000",
	},
	textArea: {
		height: 100,
		textAlignVertical: "top",
	},
	submitButton: {
		backgroundColor: "#007AFF",
		marginHorizontal: 16,
		marginTop: 20,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	submitButtonDisabled: {
		opacity: 0.6,
	},
	submitButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
