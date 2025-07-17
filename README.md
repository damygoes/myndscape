# 🌿 Myndscape — A Wellness & Journaling Mobile App

**Myndscape** is a beautiful minimalistic mobile journaling app designed to help you gain mental clarity, build self-awareness, and track your emotional well-being. Built using **React Native**, **Expo**, and **Supabase**, it features a calm, glassy UI with secure authentication and real-time storage.

## ✨ Features

- 🧘‍♀️ **Daily Mood Tracking** – Reflect on moods like anxious, excited, tired, and more.
- 📓 **Journaling** – Write daily entries to process your thoughts, feelings, and progress.
- 🧠 **Wellness-Themed Colors** – Soothing dark theme with emotion-based palettes.
- 🔒 **Auth via Supabase** – Secure email-based login and session management.
- 🖼 **Avatar Uploads** – Clean glass UI with avatar upload to Supabase Storage.
- 🔍 **Blurred Cards & UI** – Native glassmorphism using `expo-blur` and `react-native`.
- ⚛️ Built using **React Native + Expo Router**

## 📱 Screenshots

<!-- You can upload screenshots here once available -->

| Login                        | 
| ![](./screenshots/login.png) | 

<!-- | Login                        | Home                        | History                        | Journal Entry                      | Edit Journal                        | Profile                        |
| ---------------------------- | --------------------------- | ------------------------------ | ---------------------------------- | ----------------------------------- | ------------------------------ |
| ![](./screenshots/login.png) | ![](./screenshots/home.png) | ![](./screenshots/history.png) | ![](./screenshots/add-journal.png) | ![](./screenshots/edit-journal.png) | ![](./screenshots/profile.png) | -->

## 🛠️ Tech Stack

| Tech                                                              | Purpose                                  |
| ----------------------------------------------------------------- | ---------------------------------------- |
| [Expo](https://expo.dev/)                                         | App scaffolding, build, and deployment   |
| [React Native](https://reactnative.dev/)                          | Core framework for native UI             |
| [Expo Router](https://expo.github.io/router/docs)                 | File-based routing system                |
| [Supabase](https://supabase.com/)                                 | Backend as a service (Auth, DB, Storage) |
| [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) | Glass UI / blur effects                  |
| [clsx](https://www.npmjs.com/package/clsx)                        | Utility for conditional styling          |

## ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/damygoes/myndscape.git

cd myndscape
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env file in the root:

```bash
SUPABASE_URL=https://your-project.supabase.co

SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the app

```bash
npx expo start
```

Then scan the QR code using your device, or use Android/iOS simulator.

## 📂 Folder Structure

```bash
.
├── README.md
├── app.config.ts
├── app.json
├── assets
│   ├── adaptive-icon.png
│   ├── animations
│   │   ├── 404.json
│   │   ├── error.json
│   │   └── loading.json
│   ├── favicon.png
│   ├── fonts
│   │   └── SpaceMono-Regular.ttf
│   ├── icon-transparent.png
│   ├── icon.png
│   ├── images
│   │   ├── hero-1.jpg
│   │   ├── hero-2.jpg
│   │   └── hero-3.jpg
│   └── splash-icon.png
├── babel.config.js
├── eas.json
├── expo-env.d.ts
├── global.css
├── metro.config.js
├── nativewind-env.d.ts
├── package-lock.json
├── package.json
├── polyfills.ts
├── screenshots
│   ├── add-journal.png
│   ├── edit-journal.png
│   ├── history.png
│   ├── home.png
│   ├── login.png
│   └── profile.png
├── src
│   ├── app
│   │   ├── (tabs)
│   │   │   ├── _layout.tsx
│   │   │   ├── history
│   │   │   │   ├── _layout.tsx
│   │   │   │   ├── add-entry.tsx
│   │   │   │   ├── edit-entry
│   │   │   │   │   └── [id].tsx
│   │   │   │   ├── entry-details
│   │   │   │   │   └── [id].tsx
│   │   │   │   └── index.tsx
│   │   │   ├── index.tsx
│   │   │   └── profile
│   │   │       ├── _layout.tsx
│   │   │       ├── edit-profile.tsx
│   │   │       └── index.tsx
│   │   ├── +not-found.tsx
│   │   ├── _layout.tsx
│   │   └── login.tsx
│   ├── components
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── HapticTab.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ParallaxScrollView.tsx
│   │   ├── SplashScreen.tsx
│   │   ├── ThemedCard.tsx
│   │   ├── ThemedText.tsx
│   │   ├── ThemedView.tsx
│   │   ├── card
│   │   │   ├── Card.tsx
│   │   │   └── GlassCard.tsx
│   │   ├── floating-button
│   │   │   └── FloatingButton.tsx
│   │   ├── layouts
│   │   │   ├── RootLayoutContent.tsx
│   │   │   ├── SafeScrollView.tsx
│   │   │   └── ThemedSafeAreaView.tsx
│   │   ├── tab-bar
│   │   │   ├── HapticTab.tsx
│   │   │   ├── TabBar.tsx
│   │   │   ├── TabBarBackground.tsx
│   │   │   └── TabBarButton.tsx
│   │   └── ui
│   │       ├── IconSymbol.ios.tsx
│   │       ├── IconSymbol.tsx
│   │       ├── LottieAnimation.tsx
│   │       ├── LottieTest.tsx
│   │       └── TabBarBackground.tsx
│   ├── constants
│   │   └── colors.ts
│   ├── features
│   │   ├── auth
│   │   │   ├── components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── LogoutButton.tsx
│   │   │   └── hooks
│   │   │       ├── useAuthActions.ts
│   │   │       └── useDeepLinkSession.ts
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   │   ├── AiInsights.tsx
│   │   │   │   ├── DashboardSection.tsx
│   │   │   │   ├── LastEntrySummary.tsx
│   │   │   │   ├── MoodPrompt.tsx
│   │   │   │   ├── QuickStats.tsx
│   │   │   │   └── TipCard.tsx
│   │   │   └── utils
│   │   │       ├── analyzeEntries.ts
│   │   │       ├── generateMoodTipMessage.ts
│   │   │       └── getTipForMood.ts
│   │   ├── journal-entries
│   │   │   ├── api
│   │   │   │   └── callAnalyzeEntryFunction.ts
│   │   │   ├── components
│   │   │   │   ├── EditJournalEntry.tsx
│   │   │   │   ├── EditJournalModal.tsx
│   │   │   │   ├── JournalEntries.tsx
│   │   │   │   └── JournalEntryList.tsx
│   │   │   ├── hooks
│   │   │   │   ├── useCreateJournalEntry.ts
│   │   │   │   ├── useCurrentUserEntries.ts
│   │   │   │   ├── useDeleteJournalEntry.ts
│   │   │   │   ├── useHandleJournalEntryCreation.ts
│   │   │   │   ├── useJournalEntries.ts
│   │   │   │   ├── useJournalEntryById.ts
│   │   │   │   └── useUpdateJournalEntry.ts
│   │   │   ├── journal-entry-item
│   │   │   │   ├── components
│   │   │   │   │   ├── JournalEntryActions.tsx
│   │   │   │   │   ├── JournalEntryAnalysisSection.tsx
│   │   │   │   │   ├── JournalEntryContent.tsx
│   │   │   │   │   ├── JournalEntryItem.tsx
│   │   │   │   │   ├── MoodBadge.tsx
│   │   │   │   │   ├── ThemeBadge.tsx
│   │   │   │   │   ├── ThemesBadges.tsx
│   │   │   │   │   └── TipSection.tsx
│   │   │   │   ├── constants.ts
│   │   │   │   └── utils.ts
│   │   │   ├── store
│   │   │   │   ├── useJournalEntriesStore.ts
│   │   │   │   └── useJournalEntryAnalysisStore.ts
│   │   │   └── types.ts
│   │   ├── profile
│   │   │   ├── components
│   │   │   │   ├── ProfileAvatar.tsx
│   │   │   │   ├── ProfileDetails.tsx
│   │   │   │   ├── ProfileDetailsWithForm.tsx
│   │   │   │   └── ProfileForm.tsx
│   │   │   ├── hooks
│   │   │   │   ├── useUpdateUserProfile.ts
│   │   │   │   └── useUserProfile.ts
│   │   │   └── utils
│   │   │       └── renderField.tsx
│   │   └── user
│   │       ├── hooks
│   │       │   └── useCurrentUserProfile.ts
│   │       ├── store
│   │       │   └── userStore.ts
│   │       └── types.ts
│   ├── hooks
│   │   ├── useColorScheme.ts
│   │   ├── useColorScheme.web.ts
│   │   ├── useDebounce.ts
│   │   └── useThemeColor.ts
│   ├── lib
│   │   └── queryKeys.ts
│   ├── scripts
│   │   └── seedDatabase.ts
│   ├── services
│   │   ├── SupabaseAuthProvider.tsx
│   │   └── supabase.ts
│   └── utils
│       ├── clsx.ts
│       └── moodUtils.ts
├── supabase
│   ├── config.toml
│   └── functions
│       └── analyzeEntry
│           ├── deno.json
│           └── index.ts
├── tailwind.config.js
└── tsconfig.json
```

## 📦 Dependencies Overview

- expo, react-native, expo-router

- @supabase/supabase-js

- expo-blur, expo-image-picker

- clsx for conditional class merging

- @expo/vector-icons for consistent icons

## 🚀 Deployment

You can build the app with Expo:

```bash

npx expo build:android

npx expo build:ios
```

Or use EAS Build for advanced workflows.

## 🤝 Contributing

If you'd like to contribute:

- Fork this repo

- Create a new branch: git checkout -b feature/feature-name

- Commit your changes

- Push your branch: git push origin feature/feature-name

- Submit a Pull Request

## 📄 License

MIT License © 2025 Damilola Bada

## 🙌 Acknowledgements

- Supabase

- Expo

- GitHub Primer

- Inspiration from wellness UI kits and Apple’s glass design aesthetics
