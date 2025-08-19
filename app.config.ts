import { ConfigContext, ExpoConfig } from 'expo/config';
import { version } from './package.json';

const EAS_PROJECT_ID = '087d70be-5ada-40ee-b226-76fb8582031d';
const PROJECT_SLUG = 'myndscape';
const OWNER = 'damygoes';

const APP_NAME = 'myndscape';
const BUNDLE_IDENTIFIER = 'com.damilolabada.myndscape';
const PACKAGE_NAME = 'com.damilolabada.myndscape';
const ICON = './assets/icon.png';
const ADAPTIVE_ICON = './assets/adaptive-icon.png';
const SCHEME = 'ai.myndscape';

type AppEnv = 'development' | 'preview' | 'production';

// export const getDynamicAppConfig = (
//   environment: 'development' | 'preview' | 'production'
// ) => {
//   console.log('env here:', environment);
//   if (environment === 'production') {
//     return {
//       name: APP_NAME,
//       bundleIdentifier: BUNDLE_IDENTIFIER,
//       packageName: PACKAGE_NAME,
//       icon: ICON,
//       adaptiveIcon: ADAPTIVE_ICON,
//       scheme: SCHEME,
//     };
//   }

//   if (environment === 'preview') {
//     return {
//       name: `${APP_NAME} Preview`,
//       bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
//       packageName: `${PACKAGE_NAME}.preview`,
//       icon: ICON,
//       adaptiveIcon: ADAPTIVE_ICON,
//       scheme: `${SCHEME}-prev`,
//     };
//   }

//   return {
//     name: `${APP_NAME} Development`,
//     bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
//     packageName: `${PACKAGE_NAME}.dev`,
//     icon: ICON,
//     adaptiveIcon: ADAPTIVE_ICON,
//     scheme: `${SCHEME}-dev`,
//   };
// };

export const getDynamicAppConfig = (environment: AppEnv) => {
  const baseConfig = {
    icon: ICON,
    adaptiveIcon: ADAPTIVE_ICON,
    scheme: SCHEME,
  };

  if (environment === 'production') {
    return {
      ...baseConfig,
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
    };
  }

  if (environment === 'preview') {
    return {
      ...baseConfig,
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
    };
  }

  return {
    ...baseConfig,
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
  };
};

export default ({ config }: ConfigContext): ExpoConfig => {
  // manually set the environment for now as eas is not loading the .env file
  // const appEnv: AppEnv = 'development';
  const appEnv: AppEnv = 'production';

  console.log('🌍 BUILDING FOR ENV:', appEnv);

  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(appEnv);

  console.log('Variables:', {
    name,
    bundleIdentifier,
    packageName,
    scheme,
  });

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
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
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
      appEnv,
      EXPO_PUBLIC_APP_ENV: appEnv,
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/icon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/splash-icon.png',
          imageWidth: '100%',
          resizeMode: 'cover',
          backgroundColor: '#ffffff',
        },
      ],
      'expo-font',
    ],
    experiments: {
      typedRoutes: true,
    },
    owner: OWNER,
  };
};
