import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

// Dados mockados de operações financeiras
const operacoesMock = [
  {
    id: '1',
    data: '15/07/2025',
    tipo: 'Receita',
    descricao: 'Venda de café - Lote #12345',
    valor: 15000.00,
    categoria: 'Vendas',
    formaPagamento: 'Transferência',
    documentoFiscal: 'NF-001234'
  },
  {
    id: '2',
    data: '10/07/2025',
    tipo: 'Despesa',
    descricao: 'Compra de fertilizantes',
    valor: 2500.00,
    categoria: 'Insumos',
    formaPagamento: 'Cartão',
    documentoFiscal: 'NF-005678'
  },
  {
    id: '3',
    data: '05/07/2025',
    tipo: 'Despesa',
    descricao: 'Manutenção de equipamentos',
    valor: 800.00,
    categoria: 'Manutenção',
    formaPagamento: 'Dinheiro',
    documentoFiscal: 'Recibo-001'
  }
];

export default function OperacoesFinanceirasScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [operacoes, setOperacoes] = useState(operacoesMock);
  const [showSearch, setShowSearch] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('Todos');

  const filteredOperacoes = operacoes.filter(operacao => {
    const matchesSearch = operacao.descricao.toLowerCase().includes(searchText.toLowerCase()) ||
                         operacao.categoria.toLowerCase().includes(searchText.toLowerCase());
    const matchesTipo = filtroTipo === 'Todos' || operacao.tipo === filtroTipo;
    return matchesSearch && matchesTipo;
  });

  const totalReceitas = operacoes.filter(op => op.tipo === 'Receita').reduce((sum, op) => sum + op.valor, 0);
  const totalDespesas = operacoes.filter(op => op.tipo === 'Despesa').reduce((sum, op) => sum + op.valor, 0);
  const saldo = totalReceitas - totalDespesas;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const renderOperacaoCard = ({ item }) => (
    <TouchableOpacity
      style={styles.operacaoCard}
      onPress={() => navigation.navigate('RegistroOperacaoFinanceira', { operacao: item, isEdit: true })}
    >
      <View style={styles.operacaoHeader}>
        <View style={[styles.tipoIndicator, { backgroundColor: item.tipo === 'Receita' ? '#4CAF50' : '#F44336' }]} />
        <View style={styles.operacaoInfo}>
          <Text style={styles.operacaoDescricao}>{item.descricao}</Text>
          <Text style={styles.operacaoCategoria}>{item.categoria}</Text>
        </View>
        <View style={styles.operacaoValor}>
          <Text style={[styles.valorText, { color: item.tipo === 'Receita' ? '#4CAF50' : '#F44336' }]}>
            {item.tipo === 'Receita' ? '+' : '-'} {formatCurrency(item.valor)}
          </Text>
        </View>
      </View>
      <View style={styles.operacaoDetails}>
        <Text style={styles.operacaoData}>📅 {item.data}</Text>
        <Text style={styles.operacaoFormaPagamento}>💳 {item.formaPagamento}</Text>
        <Text style={styles.operacaoDocumento}>📄 {item.documentoFiscal}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFiltroButton = (tipo) => (
    <TouchableOpacity
      key={tipo}
      style={[styles.filtroButton, filtroTipo === tipo && styles.filtroButtonActive]}
      onPress={() => setFiltroTipo(tipo)}
    >
      <Text style={[styles.filtroButtonText, filtroTipo === tipo && styles.filtroButtonTextActive]}>
        {tipo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Operações Financeiras</Text>
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
            placeholder="Buscar operações..."
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
      )}

      <ScrollView style={styles.content}>
        <View style={styles.resumoContainer}>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoLabel}>Receitas</Text>
            <Text style={[styles.resumoValor, { color: '#4CAF50' }]}>{formatCurrency(totalReceitas)}</Text>
          </View>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoLabel}>Despesas</Text>
            <Text style={[styles.resumoValor, { color: '#F44336' }]}>{formatCurrency(totalDespesas)}</Text>
          </View>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoLabel}>Saldo</Text>
            <Text style={[styles.resumoValor, { color: saldo >= 0 ? '#4CAF50' : '#F44336' }]}>
              {formatCurrency(saldo)}
            </Text>
          </View>
        </View>

        <View style={styles.filtrosContainer}>
          {['Todos', 'Receita', 'Despesa'].map(renderFiltroButton)}
        </View>

        <FlatList
          data={filteredOperacoes}
          renderItem={renderOperacaoCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('RegistroOperacaoFinanceira', { isEdit: false })}
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
  resumoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resumoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  resumoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  resumoValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filtrosContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filtroButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    marginRight: 10,
  },
  filtroButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filtroButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  filtroButtonTextActive: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 80,
  },
  operacaoCard: {
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
  operacaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipoIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 15,
  },
  operacaoInfo: {
    flex: 1,
  },
  operacaoDescricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  operacaoCategoria: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  operacaoValor: {
    alignItems: 'flex-end',
  },
  valorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  operacaoDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  operacaoData: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  operacaoFormaPagamento: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  operacaoDocumento: {
    fontSize: 12,
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

