import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ListItemProps {
	title: string;
	subtitle?: string;
	onPress?: () => void;
	showChevron?: boolean;
	icon?: keyof typeof FontAwesome.glyphMap;
	iconColor?: string;
	backgroundColor?: string;
}

export default function ListItem({
	title,
	subtitle,
	onPress,
	showChevron = true,
	icon,
	iconColor = "#666",
	backgroundColor = "#fff",
}: ListItemProps) {
	const content = (
		<View style={[styles.container, { backgroundColor }]}>
			<View style={styles.content}>
				{icon && (
					<View style={styles.iconContainer}>
						<FontAwesome name={icon} size={20} color={iconColor} />
					</View>
				)}

				<View style={styles.textContainer}>
					<Text style={styles.title}>{title}</Text>
					{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
				</View>
			</View>

			{showChevron && (
				<FontAwesome name='chevron-right' size={16} color='#C7C7CC' />
			)}
		</View>
	);

	if (onPress) {
		return (
			<TouchableOpacity
				onPress={onPress}
				style={styles.touchable}
				activeOpacity={0.7}
			>
				{content}
			</TouchableOpacity>
		);
	}

	return <View style={styles.touchable}>{content}</View>;
}

const styles = StyleSheet.create({
	touchable: {
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5EA",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 14,
		paddingHorizontal: 16,
		minHeight: 60,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	iconContainer: {
		marginRight: 12,
		width: 24,
		alignItems: "center",
	},
	textContainer: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		color: "#000",
		fontWeight: "500",
	},
	subtitle: {
		fontSize: 13,
		color: "#8E8E93",
		marginTop: 2,
		lineHeight: 16,
	},
});
