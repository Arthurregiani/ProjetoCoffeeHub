import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/theme';

export default function PlaceholderScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title = 'Tela', message = 'Esta funcionalidade está em desenvolvimento.' } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <Icon name="construction" size={80} color={COLORS.textSecondary} />
        <Text style={styles.title}>Em Desenvolvimento</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.subtitle}>
          Esta funcionalidade será implementada em uma próxima versão do aplicativo.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

