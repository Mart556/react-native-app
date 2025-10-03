# Image Upload Setup

To enable image upload functionality, install the required packages:

```bash
# Install expo-image-picker for camera/gallery access
pnpm add expo-image-picker

# Optional: For advanced image processing
pnpm add expo-image-manipulator

# Optional: For file system operations
pnpm add expo-file-system
```

## Quick Setup Commands

```bash
cd c:\Users\marth\Desktop\react-native-app
pnpm add expo-image-picker expo-image-manipulator expo-file-system
```

## After Installation

1. **Rebuild the app** (required for native modules):

   ```bash
   pnpm expo prebuild --clean
   pnpm expo run:android
   # or
   pnpm expo run:ios
   ```

2. **Update app.json** to include permissions:
   ```json
   {
   	"expo": {
   		"plugins": [
   			[
   				"expo-image-picker",
   				{
   					"photosPermission": "The app accesses your photos to let you upload product images.",
   					"cameraPermission": "The app accesses your camera to let you take product photos."
   				}
   			]
   		]
   	}
   }
   ```

## Usage Examples

Once installed, you can use the ImageUploadService in your components.
