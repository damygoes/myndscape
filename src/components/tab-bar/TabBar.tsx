// import { COLORS } from '@/constants/colors';
// import { AntDesign, Feather } from '@expo/vector-icons';
// import { useNavigationState } from '@react-navigation/native';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import { StyleSheet, View, useColorScheme } from 'react-native';
// import TabBarButton from './TabBarButton';

// const routeConfig: Record<
//   string,
//   {
//     label: string;
//     icon: (color: string) => React.ReactNode;
//   }
// > = {
//   index: {
//     label: 'Home',
//     icon: (color) => <Feather name="home" size={20} color={color} />,
//   },
//   history: {
//     label: 'History',
//     icon: (color) => <Feather name="hard-drive" size={20} color={color} />,
//   },
//   profile: {
//     label: 'Profile',
//     icon: (color) => <AntDesign name="user" size={20} color={color} />,
//   },
// };

// const TabBar = () => {
//   const router = useRouter();
//   const { index: currentIndex, routes } = useNavigationState((state) => state);
//   const colorScheme = useColorScheme() ?? 'light'; // get current theme
//   const themedColors = COLORS[colorScheme];

//   return (
//     <View
//       style={[
//         styles.tabbar,
//         {
//           backgroundColor: themedColors.inputBorder,
//           shadowColor: themedColors.shadow,
//         },
//       ]}
//     >
//       {routes.map((route, index) => {
//         const config = routeConfig[route.name];
//         if (!config) return null;

//         const isFocused = index === currentIndex;

//         const onPress = () => {
//           if (!isFocused) {
//             if (route.name === 'index') {
//               router.replace('/');
//             } else {
//               router.replace(`/${route.name}`);
//             }
//           }
//         };

//         return (
//           <TabBarButton
//             key={route.key ?? route.name}
//             style={styles.tabbarItem}
//             onPress={onPress}
//             isFocused={isFocused}
//             label={config.label}
//             icon={config.icon}
//             color={isFocused ? themedColors.primary : themedColors.textMuted}
//           />
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabbar: {
//     position: 'absolute',
//     bottom: 25,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     opacity: 0.97,
//     marginHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 999,
//     borderCurve: 'continuous',
//     shadowOffset: { width: 0, height: 10 },
//     shadowRadius: 10,
//     shadowOpacity: 0.4,
//   },
//   tabbarItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default TabBar;
