import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Você pode adicionar um logo aqui */}
      {/* <Image source={require('../assets/images/coffeehub_logo.png')} style={styles.logo} /> */}
      <Text style={styles.title}>CoffeeHub</Text>
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.indicator} />
      <Text style={styles.subtitle}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: SIZES.margin * 2,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.margin,
  },
  indicator: {
    marginTop: SIZES.margin * 2,
  },
});
