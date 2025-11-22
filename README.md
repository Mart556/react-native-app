# React Native Marketplace App

A comprehensive mobile marketplace application built with **React Native** and **Expo**. This project utilizes **Expo Router** for navigation and features a modern, responsive UI.

## 🚀 Features

- **Authentication**: Secure Sign In and Sign Up flows.
- **Listings Management**: Create, view, and manage product listings.
- **Favorites**: Bookmark and save favorite items.
- **Profile**: User profile management and settings.
- **Image Upload**: Functionality to upload images for listings.
- **Theming**: Support for light and dark modes.
- **Responsive UI**: Built with modern components and animations using `react-native-reanimated`.

## 🛠 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/) (SDK 54)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Language**: TypeScript
- **Styling**: Custom UI components & Theming
- **State/Data**: Custom hooks (`useData`, `useThemeColor`)
- **Icons**: FontAwesome & Expo Vector Icons

## 🏁 Getting Started

### Prerequisites

- Node.js
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-native-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the application**
   ```bash
   pnpm start
   ```
   This will start the Expo development server. You can run the app on:
   - **Android**: Press `a` (requires Android Studio/Emulator or Expo Go)
   - **iOS**: Press `i` (requires Xcode/Simulator or Expo Go)
   - **Web**: Press `w`

## 📂 Project Structure

```
app/                # Expo Router screens and layout
assets/             # Static assets (images, JSON data)
components/         # Reusable UI components
constants/          # App constants (Colors, Images)
hooks/              # Custom React hooks
services/           # API and Logic services
scripts/            # Utility scripts
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
