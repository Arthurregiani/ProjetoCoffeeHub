import React, { useState, useCallback } from 'react';
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
  StatusBar,
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Constantes para melhor organização
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const ANIMATION_DURATION = 200;

// Constantes para ícones de categoria
const CATEGORY_ICONS = {
  'Fertilizante': 'eco',
  'Agroquímico': 'science',
  'Sementes': 'grass',
  'Implementos': 'build',
  'Outros': 'category',
};

// Componente Card reutilizável removido - agora usando TouchableOpacity com styles de card

// Componente Button reutilizável
const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  disabled = false,
  style,
  ...props 
}) => {
  const scaleValue = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.button, styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`], 
             styles[`buttonSize${size.charAt(0).toUpperCase() + size.slice(1)}`], 
             disabled && styles.buttonDisabled, style]}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
      {...props}
    >
      <Animated.View style={[styles.buttonContent, { transform: [{ scale: scaleValue }] }]}> 
        {icon && <Icon name={icon} size={size === 'small' ? 16 : 20} color={variant === 'primary' ? COLORS.white : COLORS.primary} style={styles.buttonIcon} />} 
        <Text style={[styles.buttonText, styles[`buttonText${variant.charAt(0).toUpperCase() + variant.slice(1)}`], styles[`buttonTextSize${size.charAt(0).toUpperCase() + size.slice(1)}`]]}> 
          {title} 
        </Text> 
      </Animated.View> 
    </TouchableOpacity> 
  );
};




function InsumosScreen({ navigation }) {
  // Estado inicial dos insumos
  const [insumos, setInsumos] = useState([
    {
      id: 1,
      nome: 'NPK 20-05-20',
      categoria: 'Fertilizante',
      custoUnitario: 85.5,
      unidadeMedida: 'kg',
      codigoRastreio: 'FERT001',
      fabricante: 'Yara',
      dataFabricacao: '2024-01-10',
      dataValidade: '2025-01-10',
      saldo: 120,
      nivelMinimo: 30,
      status: 'Ativo',
      observacoes: 'Fertilizante para fase vegetativa',
    },
    {
      id: 2,
      nome: 'Glifosato',
      categoria: 'Agroquímico',
      custoUnitario: 45.0,
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
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');
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
  const [formErrors, setFormErrors] = useState({});

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

  const getFilteredInsumos = () => {
    return insumos.filter(insumo => {
      const matchesSearch = insumo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           insumo.fabricante.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           insumo.categoria.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'Todas' || insumo.categoria === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredInsumos = getFilteredInsumos();
  const categoriaOptions = ['Todas', ...categorias];

  const renderInsumoCard = (insumo) => {
    const scaleValue = new Animated.Value(1);
    
    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();
    };
    
    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };
    
    return (
      <Animated.View key={insumo.id} style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          style={styles.insumoCard}
          onPress={() => handleInsumoPress(insumo)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityLabel={`Insumo ${insumo.nome}`}
          accessibilityHint="Toque para ver detalhes e opções"
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
              <Icon name="inventory" size={18} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>
                {insumo.saldo} {insumo.unidadeMedida} (Mín: {insumo.nivelMinimo})
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="attach-money" size={18} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>R$ {insumo.custoUnitario.toFixed(2)}/{insumo.unidadeMedida}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="business" size={18} color={COLORS.textSecondary} />
              <Text style={styles.infoText}>{insumo.fabricante}</Text>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.codigoText}>{insumo.codigoRastreio}</Text>
              <Text style={styles.validadeText}>Val: {insumo.dataValidade}</Text>
            </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

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

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const totalInventoryValue = insumos.reduce((total, insumo) => total + (insumo.custoUnitario * insumo.saldo), 0);
  const lowStockCount = insumos.filter(i => i.status === 'Baixo Estoque').length;
  const activeCount = insumos.filter(i => i.status === 'Ativo').length;


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      {/* Header minimalista */}
      <View style={styles.headerMinimal}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <Icon name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitleMinimal}>Insumos</Text>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          style={styles.headerButton}
          accessibilityLabel="Adicionar insumo"
          accessibilityRole="button"
        >
          <Icon name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Pesquisa e Filtros */}
      <View style={styles.searchFilterSectionMinimal}>
        <View style={styles.searchContainerMinimal}>
          <Icon name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInputMinimal}
            placeholder="Pesquisar insumos..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchTerm}
            onChangeText={setSearchTerm}
            accessibilityLabel="Campo de pesquisa"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity
              style={styles.clearSearchButton}
              onPress={() => setSearchTerm('')}
              accessibilityLabel="Limpar pesquisa"
            >
              <Icon name="clear" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollViewMinimal}>
          {categoriaOptions.map((categoria) => (
            <TouchableOpacity
              key={categoria}
              style={[
                styles.filterButtonMinimal,
                filterCategory === categoria && styles.filterButtonSelectedMinimal
              ]}
              onPress={() => setFilterCategory(categoria)}
              accessibilityLabel={`Filtrar por ${categoria}`}
              accessibilityRole="button"
            >
              <Text style={[
                styles.filterButtonTextMinimal,
                filterCategory === categoria && styles.filterButtonTextSelectedMinimal
              ]}>
                {categoria}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* Alerta de baixo estoque minimalista */}
        {lowStockCount > 0 && (
          <View style={styles.lowStockAlertMinimal}>
            <Icon name="warning" size={16} color={COLORS.warning} style={{marginRight: 4}} />
            <Text style={styles.lowStockAlertTextMinimal}>
              {lowStockCount} {lowStockCount === 1 ? 'item' : 'itens'} com estoque baixo
            </Text>
          </View>
        )}

        {/* Lista de Insumos */}
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Insumos Cadastrados</Text>
            <Text style={styles.resultCount}>
              {filteredInsumos.length} de {insumos.length} insumos
            </Text>
          </View>
          {filteredInsumos.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="inventory" size={64} color={COLORS.textSecondary} />
              <Text style={styles.emptyStateTitle}>
                {searchTerm || filterCategory !== 'Todas' 
                  ? 'Nenhum insumo encontrado' 
                  : 'Nenhum insumo cadastrado'}
              </Text>
              <Text style={styles.emptyStateText}>
                {searchTerm || filterCategory !== 'Todas' 
                  ? 'Tente ajustar os filtros ou termos de pesquisa' 
                  : 'Comece adicionando seu primeiro insumo'}
              </Text>
              <Button
                title="Adicionar Insumo"
                onPress={() => setModalVisible(true)}
                icon="add"
                variant="primary"
                size="medium"
                style={styles.emptyStateButton}
              />
            </View>
          ) : (
            <View style={styles.listContent}>
              {filteredInsumos.map((insumo) => renderInsumoCard(insumo))}
            </View>
          )}
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Card-like styles now directly applied to TouchableOpacity
  insumoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.paddingSmall,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.paddingSmall,
  },
  nomeContainer: {
    flex: 1,
    marginRight: SIZES.paddingSmall,
  },
  nomeText: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  categoriaTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSmall,
    alignSelf: 'flex-start',
  },
  listSection: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  resultCount: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  listContent: {
    paddingBottom: SIZES.paddingLarge,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.paddingLarge,
    marginTop: SIZES.paddingLarge,
  },
  emptyStateTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
    marginTop: SIZES.padding,
    marginBottom: SIZES.paddingSmall,
  },
  emptyStateText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.paddingLarge,
  },
  emptyStateButton: {
    marginTop: SIZES.paddingSmall,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceVariant,
  },
  searchIcon: {
    marginRight: SIZES.paddingSmall,
  },
  clearSearchButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalBody: {
    flex: 1,
    padding: SIZES.padding,
  },
  inputLabel: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.paddingSmall,
    marginTop: SIZES.paddingSmall,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SIZES.paddingSmall,
    fontSize: SIZES.body,
    backgroundColor: COLORS.surface,
    marginBottom: SIZES.paddingSmall,
  },
  selectorContainer: {
    marginBottom: SIZES.paddingSmall,
  },
  selectorButton: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
    marginRight: SIZES.paddingSmall,
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
  // Button styles
  button: {
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonSizeMedium: {
    height: SIZES.buttonHeight,
    paddingHorizontal: SIZES.padding,
  },
  buttonSizeSmall: {
    height: SIZES.buttonHeightSmall,
    paddingHorizontal: SIZES.paddingSmall,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  buttonTextPrimary: {
    color: COLORS.white,
  },
  buttonTextSecondary: {
    color: COLORS.primary,
  },
  buttonTextSizeMedium: {
    fontSize: SIZES.body,
  },
  buttonTextSizeSmall: {
    fontSize: SIZES.caption,
  },
  buttonIcon: {
    marginRight: SIZES.paddingSmall,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  headerMinimal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitleMinimal: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  searchFilterSectionMinimal: {
    paddingHorizontal: SIZES.padding,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: COLORS.background,
  },
  searchContainerMinimal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    marginBottom: 8,
    minHeight: 44,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  searchInputMinimal: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
    paddingVertical: 10,
  },
  filterScrollViewMinimal: {
    flexGrow: 0,
    marginBottom: 2,
  },
  filterButtonMinimal: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: COLORS.lightGray,
    marginRight: 8,
    minHeight: 32,
    justifyContent: 'center',
  },
  filterButtonSelectedMinimal: {
    backgroundColor: COLORS.primary,
  },
  filterButtonTextMinimal: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterButtonTextSelectedMinimal: {
    color: COLORS.white,
    fontWeight: '600',
  },
  lowStockAlertMinimal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.08)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: SIZES.padding,
    marginTop: 2,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  lowStockAlertTextMinimal: {
    color: COLORS.warning,
    fontSize: SIZES.caption,
    fontWeight: '600',
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
