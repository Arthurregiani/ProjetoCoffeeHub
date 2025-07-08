import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

// Dados mockados de certificações
const certificacoesMock = [
  {
    id: '1',
    tipo: 'Orgânico',
    entidade: 'IBD Certificações',
    dataEmissao: '15/01/2024',
    validade: '15/01/2027',
    codigo: 'ORG-2024-001',
    status: 'Válida'
  },
  {
    id: '2',
    tipo: 'Fair Trade',
    entidade: 'FLO-CERT',
    dataEmissao: '20/03/2023',
    validade: '20/03/2026',
    codigo: 'FT-2023-045',
    status: 'Válida'
  },
  {
    id: '3',
    tipo: 'Rainforest Alliance',
    entidade: 'Rainforest Alliance',
    dataEmissao: '10/06/2022',
    validade: '10/06/2025',
    codigo: 'RA-2022-123',
    status: 'Expirando'
  },
  {
    id: '4',
    tipo: 'UTZ',
    entidade: 'UTZ Certified',
    dataEmissao: '05/08/2021',
    validade: '05/08/2024',
    codigo: 'UTZ-2021-789',
    status: 'Expirada'
  }
];

export default function CertificacoesScreen() {
  const navigation = useNavigation();
  const [certificacoes, setCertificacoes] = useState(certificacoesMock);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Válida':
        return '#4CAF50';
      case 'Expirando':
        return '#FF9800';
      case 'Expirada':
        return '#F44336';
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Válida':
        return 'check-circle';
      case 'Expirando':
        return 'warning';
      case 'Expirada':
        return 'cancel';
      default:
        return 'help';
    }
  };

  const renderCertificacaoCard = ({ item }) => (
    <TouchableOpacity
      style={styles.certificacaoCard}
      onPress={() => navigation.navigate('CadastroCertificacao', { certificacao: item, isEdit: true })}
    >
      <View style={styles.certificacaoHeader}>
        <View style={styles.certificacaoIcon}>
          <Icon name="verified" size={30} color={COLORS.primary} />
        </View>
        <View style={styles.certificacaoInfo}>
          <Text style={styles.certificacaoTipo}>{item.tipo}</Text>
          <Text style={styles.certificacaoEntidade}>{item.entidade}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Icon name={getStatusIcon(item.status)} size={16} color={COLORS.background} />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.certificacaoDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Código:</Text>
          <Text style={styles.detailValue}>{item.codigo}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Emissão:</Text>
          <Text style={styles.detailValue}>{item.dataEmissao}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Validade:</Text>
          <Text style={styles.detailValue}>{item.validade}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const statsData = [
    {
      label: 'Válidas',
      value: certificacoes.filter(c => c.status === 'Válida').length,
      color: '#4CAF50'
    },
    {
      label: 'Expirando',
      value: certificacoes.filter(c => c.status === 'Expirando').length,
      color: '#FF9800'
    },
    {
      label: 'Expiradas',
      value: certificacoes.filter(c => c.status === 'Expirada').length,
      color: '#F44336'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certificações</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          {statsData.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statNumber, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <FlatList
          data={certificacoes}
          renderItem={renderCertificacaoCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CadastroCertificacao', { isEdit: false })}
      >
        <Icon name="add" size={24} color={COLORS.background} />
      </TouchableOpacity>
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
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  listContainer: {
    paddingBottom: 80,
  },
  certificacaoCard: {
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
  certificacaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  certificacaoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  certificacaoInfo: {
    flex: 1,
  },
  certificacaoTipo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  certificacaoEntidade: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  certificacaoDetails: {
    marginTop: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

