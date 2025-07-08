import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

// Dados mockados de capacitações
const capacitacoesMock = [
  {
    id: '1',
    tipo: 'Curso',
    nome: 'Manejo Integrado de Pragas',
    dataInicio: '15/03/2025',
    dataFim: '17/03/2025',
    cargaHoraria: 24,
    instrutor: 'Dr. Carlos Agrônomo',
    entidadePromotora: 'EMATER',
    certificado: 'Sim',
    participante: 'João Silva'
  },
  {
    id: '2',
    tipo: 'Workshop',
    nome: 'Qualidade do Café',
    dataInicio: '20/02/2025',
    dataFim: '20/02/2025',
    cargaHoraria: 8,
    instrutor: 'Ana Barista',
    entidadePromotora: 'SEBRAE',
    certificado: 'Sim',
    participante: 'Maria Silva'
  },
  {
    id: '3',
    tipo: 'Treinamento',
    nome: 'Operação de Máquinas Agrícolas',
    dataInicio: '10/01/2025',
    dataFim: '12/01/2025',
    cargaHoraria: 16,
    instrutor: 'José Mecânico',
    entidadePromotora: 'SENAR',
    certificado: 'Não',
    participante: 'Carlos Silva'
  }
];

export default function CapacitacoesScreen() {
  const navigation = useNavigation();
  const [capacitacoes, setCapacitacoes] = useState(capacitacoesMock);

  const renderCapacitacaoCard = ({ item }) => (
    <TouchableOpacity
      style={styles.capacitacaoCard}
      onPress={() => navigation.navigate('CadastroCapacitacao', { capacitacao: item, isEdit: true })}
    >
      <View style={styles.capacitacaoHeader}>
        <View style={styles.capacitacaoIcon}>
          <Icon name="school" size={30} color={COLORS.primary} />
        </View>
        <View style={styles.capacitacaoInfo}>
          <Text style={styles.capacitacaoNome}>{item.nome}</Text>
          <Text style={styles.capacitacaoTipo}>{item.tipo}</Text>
        </View>
        <View style={[styles.certificadoBadge, { backgroundColor: item.certificado === 'Sim' ? '#4CAF50' : '#FF9800' }]}>
          <Icon name={item.certificado === 'Sim' ? 'verified' : 'pending'} size={16} color={COLORS.background} />
        </View>
      </View>
      <View style={styles.capacitacaoDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Participante:</Text>
          <Text style={styles.detailValue}>{item.participante}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Período:</Text>
          <Text style={styles.detailValue}>{item.dataInicio} - {item.dataFim}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Carga Horária:</Text>
          <Text style={styles.detailValue}>{item.cargaHoraria}h</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Instrutor:</Text>
          <Text style={styles.detailValue}>{item.instrutor}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Entidade:</Text>
          <Text style={styles.detailValue}>{item.entidadePromotora}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const statsData = [
    {
      label: 'Total',
      value: capacitacoes.length,
      color: COLORS.primary
    },
    {
      label: 'Com Certificado',
      value: capacitacoes.filter(c => c.certificado === 'Sim').length,
      color: '#4CAF50'
    },
    {
      label: 'Horas Totais',
      value: capacitacoes.reduce((total, c) => total + c.cargaHoraria, 0),
      color: '#FF9800'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Capacitações</Text>
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
          data={capacitacoes}
          renderItem={renderCapacitacaoCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CadastroCapacitacao', { isEdit: false })}
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
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 80,
  },
  capacitacaoCard: {
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
  capacitacaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  capacitacaoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  capacitacaoInfo: {
    flex: 1,
  },
  capacitacaoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  capacitacaoTipo: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  certificadoBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capacitacaoDetails: {
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
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 2,
    textAlign: 'right',
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

