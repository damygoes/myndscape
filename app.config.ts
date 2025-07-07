import { ConfigContext, ExpoConfig } from "expo/config";
import { version } from "./package.json";

// Replace these with your EAS project ID and project slug.
// You can find them at https://expo.dev/accounts/[account]/projects/[project].
const EAS_PROJECT_ID = "7fa827f2-a108-4a46-88b4-99e22aa03fc8";
const PROJECT_SLUG = "reflect-ai";
const OWNER = "damygoes";

// App production config
const APP_NAME = "Reflect AI";
const BUNDLE_IDENTIFIER = "com.damilolabada.app";
const PACKAGE_NAME = "com.damilolabada.app";
const ICON = "./assets/icon.png";
const ADAPTIVE_ICON = "./assets/adaptive-icon.png";
const SCHEME = "ai.reflect";

export default ({ config }: ConfigContext): ExpoConfig => {
  const environment =
    (process.env.APP_ENV as 'development' | 'preview' | 'production') ??
    'development';

  console.log('⚙️ Building app for environment:', environment);

  const {
    name,
    bundleIdentifier,
    icon,
    adaptiveIcon,
    packageName,
    scheme,
  } = getDynamicAppConfig(environment);

  return {
    ...config,
    name,
    version,
    slug: PROJECT_SLUG,
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    icon,
    scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: '#ffffff',
      },
      package: packageName,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: '1.0.0',
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
      APP_ENV: environment,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    owner: OWNER,
  };
};


// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: "./assets/icon.png",
      adaptiveIcon: "./assets/adaptive-icon.png",
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: "./assets/icon.png",
    adaptiveIcon: "./assets/adaptive-icon.png",
    scheme: `${SCHEME}-dev`,
  };
};