import { ConfigContext, ExpoConfig } from "expo/config";
import { version } from "./package.json";

const EAS_PROJECT_ID = "7fa827f2-a108-4a46-88b4-99e22aa03fc8";
const PROJECT_SLUG = "reflect-ai";
const OWNER = "damygoes";

const APP_NAME = "Reflect AI";
const BUNDLE_IDENTIFIER = "com.damilolabada.reflect";
const PACKAGE_NAME = "com.damilolabada.reflect";
const ICON = "./assets/icon.png";
const ADAPTIVE_ICON = "./assets/adaptive-icon.png";
const SCHEME = "ai.reflect";

export default ({ config }: ConfigContext): ExpoConfig => {

  const environment =
  process.env.EXPO_PUBLIC_APP_ENV === 'production'
    ? 'production'
    : process.env.EXPO_PUBLIC_APP_ENV === 'preview'
    ? 'preview'
    : 'development';

  console.log('⚙️ BUILD - EXPO_PUBLIC_APP_ENV:', environment);

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
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon,
    scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#ffffff",
      },
      package: packageName,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: "1.0.0",
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
      APP_ENV: environment,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    owner: OWNER,
  };
};

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
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Dev`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: ICON,
    adaptiveIcon: ADAPTIVE_ICON,
    scheme: `${SCHEME}-dev`,
  };
};