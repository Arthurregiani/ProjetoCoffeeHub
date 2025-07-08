import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 20px padding horizontal, 20px gap between cards

const reportCategories = [
  { id: '1', name: 'Rastreabilidade', icon: 'track-changes', screen: 'DetalhesRastreabilidade' }, // Placeholder for now
  { id: '2', name: 'Produção', icon: 'local-cafe', screen: 'VisualizacaoRelatorio' },
  { id: '3', name: 'Qualidade', icon: 'star', screen: 'VisualizacaoRelatorio' },
  { id: '4', name: 'Financeiro', icon: 'attach-money', screen: 'VisualizacaoRelatorio' },
  { id: '5', name: 'Estoque de Insumos', icon: 'inventory', screen: 'VisualizacaoRelatorio' },
  { id: '6', name: 'Desempenho', icon: 'trending-up', screen: 'VisualizacaoRelatorio' },
];

const recentReports = [
  { id: 'a', name: 'Produção Mensal - Junho 2025', type: 'Produção' },
  { id: 'b', name: 'Rastreabilidade Lote #12345', type: 'Rastreabilidade' },
  { id: 'c', name: 'Estoque Fertilizantes - Q2', type: 'Estoque de Insumos' },
];

export default function RelatoriosScreen() {
  const navigation = useNavigation();

  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => navigation.navigate(item.screen, { reportName: item.name, reportType: item.name })}
    >
      <Icon name={item.icon} size={40} color={COLORS.primary} />
      <Text style={styles.categoryCardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRecentReportItem = ({ item }) => (
    <TouchableOpacity style={styles.recentReportItem} onPress={() => navigation.navigate('VisualizacaoRelatorio', { reportName: item.name, reportType: item.type })}>
      <Text style={styles.recentReportTitle}>{item.name}</Text>
      <Text style={styles.recentReportType}>{item.type}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Relatórios</Text>
        <TouchableOpacity onPress={() => console.log('Filtro/Período Clicado')}>
          <Icon name="filter-list" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Categorias de Relatório</Text>
      <FlatList
        data={reportCategories}
        renderItem={renderCategoryCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />

      <Text style={styles.sectionTitle}>Relatórios Recentes</Text>
      <FlatList
        data={recentReports}
        renderItem={renderRecentReportItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.qrScannerButton} onPress={() => navigation.navigate('DetalhesRastreabilidade', { fromQR: true })}>
        <Icon name="qr-code-scanner" size={24} color={COLORS.background} />
        <Text style={styles.qrScannerButtonText}>Scanner QR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 15,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 20,
    width: cardWidth,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 150, // Fixed height for better alignment
  },
  categoryCardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  recentReportItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  recentReportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  recentReportType: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  qrScannerButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  qrScannerButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});


