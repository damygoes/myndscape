import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LottieAnimation } from './LottieAnimation';

export const LottieTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lottie Animation Test</Text>

      <View style={styles.animationContainer}>
        <Text style={styles.label}>Loading Animation:</Text>
        <LottieAnimation
          source={require('../../../assets/animations/loading.json')}
          autoPlay
          loop
          style={{ width: 80, height: 80 }}
        />
      </View>

      <View style={styles.animationContainer}>
        <Text style={styles.label}>Error Animation:</Text>
        <LottieAnimation
          source={require('../../../assets/animations/error.json')}
          autoPlay
          loop
          style={{ width: 80, height: 80 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  animationContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
});
