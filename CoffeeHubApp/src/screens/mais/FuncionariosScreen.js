import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

// Dados mockados de funcionários
const funcionariosMock = [
  {
    id: '1',
    nome: 'Carlos Silva',
    cargo: 'Operador de Máquinas',
    contato: '(11) 98765-4321',
    status: 'Ativo',
    dataAdmissao: '15/01/2023'
  },
  {
    id: '2',
    nome: 'Ana Santos',
    cargo: 'Supervisora de Campo',
    contato: '(11) 97654-3210',
    status: 'Ativo',
    dataAdmissao: '03/03/2022'
  },
  {
    id: '3',
    nome: 'José Oliveira',
    cargo: 'Trabalhador Rural',
    contato: '(11) 96543-2109',
    status: 'Inativo',
    dataAdmissao: '20/06/2021'
  }
];

export default function FuncionariosScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [funcionarios, setFuncionarios] = useState(funcionariosMock);
  const [showSearch, setShowSearch] = useState(false);

  const filteredFuncionarios = funcionarios.filter(funcionario =>
    funcionario.nome.toLowerCase().includes(searchText.toLowerCase()) ||
    funcionario.cargo.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderFuncionarioCard = ({ item }) => (
    <TouchableOpacity
      style={styles.funcionarioCard}
      onPress={() => navigation.navigate('CadastroFuncionario', { funcionario: item, isEdit: true })}
    >
      <View style={styles.funcionarioHeader}>
        <View style={styles.funcionarioAvatar}>
          <Icon name="person" size={30} color={COLORS.textSecondary} />
        </View>
        <View style={styles.funcionarioInfo}>
          <Text style={styles.funcionarioNome}>{item.nome}</Text>
          <Text style={styles.funcionarioCargo}>{item.cargo}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Ativo' ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.funcionarioDetails}>
        <Text style={styles.funcionarioContato}>📞 {item.contato}</Text>
        <Text style={styles.funcionarioData}>📅 Admissão: {item.dataAdmissao}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Funcionários</Text>
        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <Icon name="search" size={28} color={COLORS.background} />
        </TouchableOpacity>
      </View>

      {showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar funcionários..."
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{funcionarios.filter(f => f.status === 'Ativo').length}</Text>
            <Text style={styles.statLabel}>Ativos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{funcionarios.filter(f => f.status === 'Inativo').length}</Text>
            <Text style={styles.statLabel}>Inativos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{funcionarios.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        <FlatList
          data={filteredFuncionarios}
          renderItem={renderFuncionarioCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CadastroFuncionario', { isEdit: false })}
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
  searchContainer: {
    backgroundColor: COLORS.surface,
    padding: 15,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
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
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  listContainer: {
    paddingBottom: 80,
  },
  funcionarioCard: {
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
  funcionarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  funcionarioAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  funcionarioInfo: {
    flex: 1,
  },
  funcionarioNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  funcionarioCargo: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  funcionarioDetails: {
    marginTop: 5,
  },
  funcionarioContato: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  funcionarioData: {
    fontSize: 14,
    color: COLORS.textSecondary,
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

