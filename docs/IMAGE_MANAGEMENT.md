# Image Management System

This app uses a centralized image management system with support for both static assets and dynamic image uploads.

## 📁 Static Images (Current)

All images from `assets/images/` are centrally managed:

- `splash.png` - App splash screen image
- `coffe-chair.png` - Coffee chair product image
- `coffe-table.png` - Coffee table product image
- `minimal-desk.png` - Minimal desk product image
- `minimal-tabel.png` - Minimal table product image

## 🚀 Dynamic Image Uploads (Ready to Enable)

### Installation Required

```bash
pnpm add expo-image-picker expo-image-manipulator expo-file-system
```

### Features Available

- ✅ **Camera Capture** - Take photos directly in app
- ✅ **Gallery Selection** - Choose from device photos
- ✅ **Image Editing** - Crop and resize images
- ✅ **Local Storage** - Store images locally with AsyncStorage
- ✅ **Cloud Ready** - Prepared for AWS S3, Cloudinary, etc.
- ✅ **Product Management** - Add/update/delete products with images

## Usage Examples

### 1. Static Images (Current)

```tsx
import { Images, getImage } from "@/constants/Images";

// Direct import (fastest)
<Image source={Images.splash} style={styles.image} />

// Dynamic loading (for JSON data)
<Image source={getImage(product.image)} style={styles.image} />
```

### 2. Image Upload Component

```tsx
import ImageUploadComponent from "@/components/ui/ImageUploadComponent";

// For new products
<ImageUploadComponent
  onImageUploaded={(uri) => setProductImage(uri)}
/>

// For existing products
<ImageUploadComponent
  productId={123}
  currentImage={product.image}
  onImageUploaded={(uri) => console.log('Updated:', uri)}
/>
```

### 3. Admin Product Management

```tsx
import ImageUploadService from "@/services/ImageUploadService";

// Add product with image upload flow
const result = await ImageUploadService.addProductWithImage({
	name: "New Product",
	price: "29.99€",
	description: "Amazing product",
});
```

## 🔧 Adding New Static Images

1. **Add image file** to `assets/images/` folder
2. **Update** `constants/Images.ts`:

   ```tsx
   export const Images = {
   	// ... existing images
   	newImage: require("@/assets/images/new-image.png"),
   };

   export const ImageMap: { [key: string]: any } = {
   	// ... existing mappings
   	"@/assets/images/new-image.png": Images.newImage,
   };
   ```

## 🌐 Image Upload Types Supported

- **Local Device Photos** - `file://` URIs
- **Camera Captures** - Direct camera integration
- **Base64 Data** - `data:image/` URIs
- **Web URLs** - `https://` remote images
- **Cloud Storage** - Ready for S3, Cloudinary, Firebase

## 📱 Example Screens Created

- **Home Screen** - Product grid with images ✅
- **Product Page** - Full product images ✅
- **Admin Add Product** - Upload new product images 🚀
- **Image Upload Component** - Reusable upload widget 🚀

## 🛠️ Architecture Benefits

- ✅ **Centralized Management** - All images in one place
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Performance** - Optimized loading strategies
- ✅ **Scalability** - Ready for thousands of products
- ✅ **Offline Support** - Local storage with AsyncStorage
- ✅ **Cloud Integration** - Prepared for production deployment
- ✅ **Admin Tools** - Complete product management
- ✅ **User Uploads** - Customer reviews with photos (future)

## 🔮 Future Enhancements Ready

1. **Multiple Images per Product** - Gallery support
2. **Image Compression** - Automatic optimization
3. **CDN Integration** - Global image delivery
4. **User Generated Content** - Customer review photos
5. **Image Analytics** - Usage tracking
6. **Backup & Sync** - Cloud synchronization
