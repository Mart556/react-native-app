# ListItem Component Usage Examples

The ListItem component is a flexible, reusable component that can be used throughout your app. Here are various usage examples:

## Basic Usage

```tsx
import ListItem from "@/components/ui/ListItem";

// Simple list item with title only
<ListItem title="Basic Item" />

// With subtitle
<ListItem
  title="My Listings"
  subtitle="Access your 15 listings"
/>

// With press handler
<ListItem
  title="Settings"
  subtitle="Notifications, Dark mode"
  onPress={() => navigation.navigate('Settings')}
/>
```

## Advanced Usage

```tsx
// With icon
<ListItem
  title="Notifications"
  subtitle="Push notifications enabled"
  icon="bell"
  iconColor="#007AFF"
  onPress={handleNotifications}
/>

// Without chevron
<ListItem
  title="App Version"
  subtitle="1.0.0"
  showChevron={false}
/>

// Custom background color
<ListItem
  title="Important Setting"
  backgroundColor="#FFE6E6"
  onPress={handleImportant}
/>
```

## Real-world Examples

### Profile Screen

```tsx
<ListItem title="My Listings" subtitle="Access your 15 listings" onPress={handleMyListings} />
<ListItem title="Settings" subtitle="Notifications, Dark mode" onPress={handleSettings} />
<ListItem title="Help & Support" icon="question-circle" onPress={handleHelp} />
<ListItem title="Sign Out" icon="sign-out" iconColor="#FF3B30" onPress={handleSignOut} />
```

### Settings Screen

```tsx
<ListItem title="Push Notifications" subtitle="Enabled" icon="bell" />
<ListItem title="Dark Mode" subtitle="System default" icon="moon" />
<ListItem title="Language" subtitle="English" icon="globe" />
<ListItem title="Privacy Policy" icon="shield" onPress={handlePrivacy} />
```

### Admin Panel

```tsx
<ListItem title="Add Product" icon="plus" iconColor="#34C759" onPress={handleAddProduct} />
<ListItem title="Manage Categories" icon="list" onPress={handleCategories} />
<ListItem title="View Analytics" icon="chart-bar" onPress={handleAnalytics} />
```

## Props Reference

| Prop              | Type                    | Default  | Description                  |
| ----------------- | ----------------------- | -------- | ---------------------------- |
| `title`           | `string`                | Required | Main text displayed          |
| `subtitle`        | `string`                | Optional | Secondary text below title   |
| `onPress`         | `() => void`            | Optional | Function called when pressed |
| `showChevron`     | `boolean`               | `true`   | Show right arrow indicator   |
| `icon`            | `FontAwesome icon name` | Optional | Left side icon               |
| `iconColor`       | `string`                | `'#666'` | Color of the icon            |
| `backgroundColor` | `string`                | `'#fff'` | Background color of item     |

## Design Guidelines

- **Consistent Heights**: All items maintain consistent height automatically
- **Touch Feedback**: Includes subtle press animations
- **Accessibility**: Supports screen readers and keyboard navigation
- **Flexible Layout**: Adapts to different content lengths
- **iOS Style**: Follows iOS Human Interface Guidelines

## Integration with Navigation

```tsx
import { router } from "expo-router";

const handleNavigation = (route: string) => {
	router.push(route);
};

<ListItem
	title='Profile Settings'
	onPress={() => handleNavigation("/profile/settings")}
/>;
```
