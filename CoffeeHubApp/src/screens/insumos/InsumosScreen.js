import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../constants/theme';

const InsumosScreen = ({ navigation }) => {
  const [insumos, setInsumos] = useState([
    {
      id: 1,
      nome: 'NPK 20-05-20',
      categoria: 'Fertilizante',
      custoUnitario: 85.50,
      unidadeMedida: 'kg',
      codigoRastreio: 'FERT001',
      fabricante: 'Fertilizantes Brasil',
      dataFabricacao: '2024-01-15',
      dataValidade: '2026-01-15',
      saldo: 500,
      nivelMinimo: 100,
      status: 'Ativo',
      observacoes: 'Fertilizante básico para café',
    },
    {
      id: 2,
      nome: 'Fungicida Cobox',
      categoria: 'Agroquímico',
      custoUnitario: 125.00,
      unidadeMedida: 'L',
      codigoRastreio: 'AGRO001',
      fabricante: 'Defensivos Agrícolas',
      dataFabricacao: '2024-02-10',
      dataValidade: '2025-02-10',
      saldo: 50,
      nivelMinimo: 20,
      status: 'Ativo',
      observacoes: 'Controle de ferrugem do café',
    },
    {
      id: 3,
      nome: 'Herbicida Roundup',
      categoria: 'Agroquímico',
      custoUnitario: 95.00,
      unidadeMedida: 'L',
      codigoRastreio: 'AGRO002',
      fabricante: 'Monsanto',
      dataFabricacao: '2024-03-01',
      dataValidade: '2025-03-01',
      saldo: 15,
      nivelMinimo: 25,
      status: 'Baixo Estoque',
      observacoes: 'Controle de plantas daninhas',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingInsumo, setEditingInsumo] = useState(null);
  const [novoInsumo, setNovoInsumo] = useState({
    nome: '',
    categoria: 'Fertilizante',
    custoUnitario: '',
    unidadeMedida: 'kg',
    fabricante: '',
    dataFabricacao: '',
    dataValidade: '',
    saldo: '',
    nivelMinimo: '',
    observacoes: '',
  });

  const categorias = ['Fertilizante', 'Agroquímico', 'Sementes', 'Implementos', 'Outros'];
  const unidadesMedida = ['kg', 'L', 'unidade', 'saca', 'tonelada'];

  const handleAddInsumo = () => {
    if (!novoInsumo.nome || !novoInsumo.custoUnitario || !novoInsumo.fabricante) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const insumoData = {
      id: editingInsumo ? editingInsumo.id : Date.now(),
      ...novoInsumo,
      custoUnitario: parseFloat(novoInsumo.custoUnitario),
      saldo: parseInt(novoInsumo.saldo) || 0,
      nivelMinimo: parseInt(novoInsumo.nivelMinimo) || 0,
      codigoRastreio: editingInsumo ? editingInsumo.codigoRastreio : `INS${String(Date.now()).slice(-3)}`,
      status: parseInt(novoInsumo.saldo) <= parseInt(novoInsumo.nivelMinimo) ? 'Baixo Estoque' : 'Ativo',
    };

    if (editingInsumo) {
      setInsumos(insumos.map(item => item.id === editingInsumo.id ? insumoData : item));
      Alert.alert('Sucesso', 'Insumo atualizado com sucesso!');
    } else {
      setInsumos([insumoData, ...insumos]);
      Alert.alert('Sucesso', 'Insumo adicionado com sucesso!');
    }

    setNovoInsumo({
      nome: '',
      categoria: 'Fertilizante',
      custoUnitario: '',
      unidadeMedida: 'kg',
      fabricante: '',
      dataFabricacao: '',
      dataValidade: '',
      saldo: '',
      nivelMinimo: '',
      observacoes: '',
    });
    setEditingInsumo(null);
    setModalVisible(false);
  };

  const handleEditInsumo = (insumo) => {
    setEditingInsumo(insumo);
    setNovoInsumo({
      nome: insumo.nome,
      categoria: insumo.categoria,
      custoUnitario: insumo.custoUnitario.toString(),
      unidadeMedida: insumo.unidadeMedida,
      fabricante: insumo.fabricante,
      dataFabricacao: insumo.dataFabricacao,
      dataValidade: insumo.dataValidade,
      saldo: insumo.saldo.toString(),
      nivelMinimo: insumo.nivelMinimo.toString(),
      observacoes: insumo.observacoes,
    });
    setModalVisible(true);
  };

  const handleDeleteInsumo = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este insumo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setInsumos(insumos.filter(item => item.id !== id));
            Alert.alert('Sucesso', 'Insumo excluído com sucesso!');
          },
        },
      ]
    );
  };

  const handleInsumoPress = (insumo) => {
    Alert.alert(
      'Detalhes do Insumo',
      `Nome: ${insumo.nome}\nCategoria: ${insumo.categoria}\nCusto: R$ ${insumo.custoUnitario.toFixed(2)}\nSaldo: ${insumo.saldo} ${insumo.unidadeMedida}\nFabricante: ${insumo.fabricante}\nValidade: ${insumo.dataValidade}\nCódigo: ${insumo.codigoRastreio}`,
      [
        { text: 'Fechar', style: 'cancel' },
        { text: 'Editar', onPress: () => handleEditInsumo(insumo) },
        { text: 'Excluir', style: 'destructive', onPress: () => handleDeleteInsumo(insumo.id) },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo': return COLORS.success;
      case 'Baixo Estoque': return COLORS.warning;
      case 'Vencido': return COLORS.error;
      case 'Inativo': return COLORS.textSecondary;
      default: return COLORS.textSecondary;
    }
  };

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case 'Fertilizante': return COLORS.primary;
      case 'Agroquímico': return COLORS.warning;
      case 'Sementes': return COLORS.success;
      case 'Implementos': return COLORS.accent;
      default: return COLORS.textSecondary;
    }
  };

  const renderInsumoCard = (insumo) => (
    <TouchableOpacity
      key={insumo.id}
      style={styles.insumoCard}
      onPress={() => handleInsumoPress(insumo)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.nomeContainer}>
          <Text style={styles.nomeText}>{insumo.nome}</Text>
          <View style={[styles.categoriaTag, { backgroundColor: getCategoriaColor(insumo.categoria) }]}>
            <Text style={styles.categoriaText}>{insumo.categoria}</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(insumo.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(insumo.status) }]}>
            {insumo.status}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon name="inventory" size={16} color={COLORS.textSecondary} />
        <Text style={styles.infoText}>
          {insumo.saldo} {insumo.unidadeMedida} (Mín: {insumo.nivelMinimo})
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="attach-money" size={16} color={COLORS.textSecondary} />
        <Text style={styles.infoText}>R$ {insumo.custoUnitario.toFixed(2)}/{insumo.unidadeMedida}</Text>
      </View>

      <View style={styles.infoRow}>
        <Icon name="business" size={16} color={COLORS.textSecondary} />
        <Text style={styles.infoText}>{insumo.fabricante}</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.codigoText}>{insumo.codigoRastreio}</Text>
        <Text style={styles.validadeText}>Val: {insumo.dataValidade}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSelector = (options, selectedValue, onSelect, placeholder) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.selectorButton,
            selectedValue === option && styles.selectorButtonSelected
          ]}
          onPress={() => onSelect(option)}
        >
          <Text style={[
            styles.selectorButtonText,
            selectedValue === option && styles.selectorButtonTextSelected
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insumos</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{insumos.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{insumos.filter(i => i.status === 'Ativo').length}</Text>
          <Text style={styles.statLabel}>Ativos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{insumos.filter(i => i.status === 'Baixo Estoque').length}</Text>
          <Text style={styles.statLabel}>Baixo Estoque</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            R$ {insumos.reduce((total, insumo) => total + (insumo.custoUnitario * insumo.saldo), 0).toFixed(0)}
          </Text>
          <Text style={styles.statLabel}>Valor Total</Text>
        </View>
      </View>

      {/* Lista de Insumos */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insumos Cadastrados</Text>
          {insumos.map(renderInsumoCard)}
        </View>
      </ScrollView>

      {/* Modal para Novo/Editar Insumo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {editingInsumo ? 'Editar Insumo' : 'Novo Insumo'}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                <Text style={styles.inputLabel}>Nome do Insumo *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: NPK 20-05-20"
                  value={novoInsumo.nome}
                  onChangeText={(text) => setNovoInsumo({ ...novoInsumo, nome: text })}
                />

                <Text style={styles.inputLabel}>Categoria *</Text>
                {renderSelector(
                  categorias,
                  novoInsumo.categoria,
                  (categoria) => setNovoInsumo({ ...novoInsumo, categoria }),
                  'Selecione a categoria'
                )}

                <Text style={styles.inputLabel}>Custo Unitário (R$) *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: 85.50"
                  value={novoInsumo.custoUnitario}
                  onChangeText={(text) => setNovoInsumo({ ...novoInsumo, custoUnitario: text })}
                  keyboardType="numeric"
                />

                <Text style={styles.inputLabel}>Unidade de Medida</Text>
                {renderSelector(
                  unidadesMedida,
                  novoInsumo.unidadeMedida,
                  (unidade) => setNovoInsumo({ ...novoInsumo, unidadeMedida: unidade }),
                  'Selecione a unidade'
                )}

                <Text style={styles.inputLabel}>Fabricante *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nome do fabricante"
                  value={novoInsumo.fabricante}
                  onChangeText={(text) => setNovoInsumo({ ...novoInsumo, fabricante: text })}
                />

                <Text style={styles.inputLabel}>Data de Fabricação</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="YYYY-MM-DD"
                  value={novoInsumo.dataFabricacao}
                  onChangeText={(text) => setNovoInsumo({ ...novoInsumo, dataFabricacao: text })}
                />

                <Text style={styles.inputLabel}>Data de Validade</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="YYYY-MM-DD"
                  value={novoInsumo.dataValidade}
                  onChangeText={(text) => setNovoInsumo({ ...novoInsumo, dataValidade: text })}
                />

                <Text style={styles.inputLabel}>Saldo Atual</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Quantidade em estoque"
                  value={novoInsumo.saldo}
                  onChangeText={(text) => setNovoInsumo({ ...novoInsumo, saldo: text })}
                  keyboardType="numeric"
                />

                <Text style={styles.inputLabel}>Nível Mínimo</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Quantidade mínima para alerta"
                  value={novoInsumo.nivelMinimo}
                  onChangeText={(text) => setNovoInsumo({ ...novoInsumo, nivelMinimo: text })}
                  keyboardType="numeric"
                />

                <Text style={styles.inputLabel}>Observações</Text>
                <TextInput
                  style={[styles.textInput, { height: 80 }]}
                  placeholder="Observações adicionais..."
                  value={novoInsumo.observacoes}
                  onChangeText={(text) => setNovoInsumo({ ...novoInsumo, observacoes: text })}
                  multiline
                  numberOfLines={4}
                />
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleAddInsumo}
                >
                  <Text style={styles.saveButtonText}>
                    {editingInsumo ? 'Atualizar' : 'Salvar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding / 2,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  insumoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nomeContainer: {
    flex: 1,
  },
  nomeText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  categoriaTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  categoriaText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: SIZES.caption,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  codigoText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  validadeText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    maxHeight: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalBody: {
    padding: SIZES.padding,
    maxHeight: 400,
  },
  inputLabel: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: SIZES.body,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  selectorContainer: {
    marginBottom: 16,
  },
  selectorButton: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    marginRight: 8,
  },
  selectorButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  selectorButtonText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  selectorButtonTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButtonText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  saveButtonText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default InsumosScreen;
