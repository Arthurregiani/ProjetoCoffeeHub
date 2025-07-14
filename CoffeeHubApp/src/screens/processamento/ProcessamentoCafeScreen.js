import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../constants/theme';

export default function ProcessamentoCafeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [processamentoData, setProcessamentoData] = useState([]);

  useEffect(() => {
    loadProcessamentoData();
  }, []);

  const loadProcessamentoData = async () => {
    try {
      // Simulate data loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Data would be loaded from API here
    } catch (error) {
      console.error('Erro ao carregar dados de processamento:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProcessamentoData();
    setRefreshing(false);
  };

  const handleBatchPress = (batch) => {
    Alert.alert('Lote', `Lote: ${batch.nome}\nStatus: ${batch.status}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Processamento de Café</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color={COLORS.white} />
            {/* Add badge if notifications exist */}
          </TouchableOpacity>
        </View>

        {/* Batches in Processing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lotes em Processamento</Text>
          {processamentoData.map((batch) => (
            <TouchableOpacity
              key={batch.id}
              style={styles.batchItem}
              onPress={() => handleBatchPress(batch)}
            >
              <Text style={styles.batchName}>{batch.nome}</Text>
              <Text style={styles.batchStatus}>{batch.status}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add New Processing Record */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NovoProcessamento')}
          >
            <Text style={styles.addButtonText}>Adicionar Novo Registro</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  notificationButton: {
    padding: 8,
  },
  section: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  batchItem: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin / 2,
  },
  batchName: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  batchStatus: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  addButton: {
    backgroundColor: COLORS.success,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

