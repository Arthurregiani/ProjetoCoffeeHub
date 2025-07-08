import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

const traceabilityEvents = [
  { id: '1', date: '2025-06-01', type: 'Colheita', description: 'Colheita do Lote #12345 no Talhão A' },
  { id: '2', date: '2025-06-05', type: 'Processamento', description: 'Processamento via seca do Lote #12345' },
  { id: '3', date: '2025-06-10', type: 'Classificação', description: 'Classificação do Lote #12345: Peneira 17/18' },
  { id: '4', date: '2025-06-12', type: 'Armazenamento', description: 'Armazenamento do Lote #12345 no Armazém Central' },
  { id: '5', date: '2025-06-15', type: 'Comercialização', description: 'Venda de 10 sacas do Lote #12345 para Cliente X' },
];

export default function DetalhesRastreabilidadeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { fromQR } = route.params || {}; // Indica se veio do scanner QR

  const renderTraceabilityEvent = ({ item }) => (
    <TouchableOpacity style={styles.eventCard} onPress={() => console.log('Detalhes do Evento:', item.id)}>
      <Text style={styles.eventDate}>{item.date}</Text>
      <Text style={styles.eventType}>{item.type}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes de Rastreabilidade</Text>
        <View style={{ width: 28 }} />{/* Placeholder para alinhar o título */}
      </View>

      <Text style={styles.sectionTitle}>Informações Gerais</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Tipo:</Text> Lote</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Identificador:</Text> #12345</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Propriedade:</Text> Fazenda Coffee Bean</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Talhão:</Text> Talhão A</Text>
        {/* Adicionar mais informações conforme o item (Lote, Talhão, Propriedade) */}
      </View>

      <Text style={styles.sectionTitle}>Linha do Tempo de Eventos</Text>
      <FlatList
        data={traceabilityEvents}
        renderItem={renderTraceabilityEvent}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      <Text style={styles.sectionTitle}>Gráfico de Composição de Lotes</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.chartPlaceholder}>Gráfico de Composição (Ex: Pizza ou Barras)</Text>
        {/* Aqui você integraria um gráfico real de composição de lotes */}
      </View>

      <TouchableOpacity style={styles.qrCodeButton} onPress={() => console.log('Gerar QR Code')}> 
        <Icon name="qr-code" size={24} color={COLORS.background} />
        <Text style={styles.qrCodeButtonText}>Gerar QR Code</Text>
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
    fontSize: 24,
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
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  eventCard: {
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
  eventDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  eventType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  chartContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 20,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartPlaceholder: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  qrCodeButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  qrCodeButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});


