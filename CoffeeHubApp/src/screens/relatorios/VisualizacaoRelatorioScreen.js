import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

export default function VisualizacaoRelatorioScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { reportName, reportType } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{reportName || 'Visualização de Relatório'}</Text>
        <TouchableOpacity onPress={() => console.log('Exportar Relatório')}> 
          <Icon name="file-download" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Filtros</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filtro de Data: Últimos 30 dias</Text>
        <Text style={styles.filterText}>Propriedade: Todas</Text>
        <Text style={styles.filterText}>Tipo: {reportType || 'Geral'}</Text>
        {/* Adicionar mais filtros conforme necessário */}
      </View>

      <Text style={styles.sectionTitle}>Gráficos e Tabelas</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.chartPlaceholder}>Gráfico de {reportName || 'Dados'}</Text>
        {/* Aqui você integraria bibliotecas de gráficos como Victory Native ou React Native Chart Kit */}
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tablePlaceholder}>Tabela de Dados de {reportName || 'Relatório'}</Text>
        {/* Aqui você renderizaria uma tabela com os dados detalhados */}
      </View>

      <Text style={styles.sectionTitle}>Opções de Visualização</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Por Ano</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Por Talhão</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Por Tipo de Insumo</Text>
        </TouchableOpacity>
      </View>

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
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginLeft: -28, // Compensate for back button
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 15,
  },
  filterContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  filterText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  chartContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 20,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartPlaceholder: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  tableContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 20,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  tablePlaceholder: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  optionButtonText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});


