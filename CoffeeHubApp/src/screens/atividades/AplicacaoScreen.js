import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../constants/theme';

export default function AplicacaoScreen({ navigation, route }) {
  const { preSelectedLote } = route.params || {};
  
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    talhao: '',
    loteId: preSelectedLote || '',
    tipoAplicacao: '',
    produto: '',
    marca: '',
    dosagem: '',
    unidadeDosagem: 'L/ha',
    volumeCalda: '',
    equipamento: '',
    responsavel: '',
    condicoesClimaticas: '',
    temperatura: '',
    umidade: '',
    ventoVelocidade: '',
    observacoes: '',
    prazoCarencia: '',
    intervaloSeguranca: '',
    status: 'Agendado',
  });

  const [showTipoModal, setShowTipoModal] = useState(false);
  const [showTalhaoModal, setShowTalhaoModal] = useState(false);
  const [showEquipamentoModal, setShowEquipamentoModal] = useState(false);
  const [showUnidadeModal, setShowUnidadeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const tiposAplicacao = [
    { id: 'herbicida', name: 'Herbicida', icon: 'grass' },
    { id: 'fungicida', name: 'Fungicida', icon: 'bug-report' },
    { id: 'inseticida', name: 'Inseticida', icon: 'pest-control' },
    { id: 'fertilizante', name: 'Fertilizante', icon: 'eco' },
    { id: 'adubo-foliar', name: 'Adubo Foliar', icon: 'local-florist' },
    { id: 'regulador-crescimento', name: 'Regulador de Crescimento', icon: 'height' },
    { id: 'estimulante', name: 'Estimulante', icon: 'energy-savings-leaf' },
  ];

  const talhoes = [
    { id: 'talhao-a1', name: 'Talhão A1 (5,2 ha)' },
    { id: 'talhao-a2', name: 'Talhão A2 (3,8 ha)' },
    { id: 'talhao-b1', name: 'Talhão B1 (4,5 ha)' },
    { id: 'talhao-b2', name: 'Talhão B2 (6,1 ha)' },
    { id: 'talhao-c1', name: 'Talhão C1 (2,9 ha)' },
    { id: 'talhao-c2', name: 'Talhão C2 (4,2 ha)' },
  ];

  const equipamentos = [
    { id: 'pulverizador-1', name: 'Pulverizador de Barra 600L' },
    { id: 'pulverizador-2', name: 'Pulverizador Costal 20L' },
    { id: 'atomizador', name: 'Atomizador 400L' },
    { id: 'nebulizador', name: 'Nebulizador' },
    { id: 'manual', name: 'Aplicação Manual' },
  ];

  const unidadesDosagem = [
    { id: 'l-ha', name: 'L/ha' },
    { id: 'ml-ha', name: 'mL/ha' },
    { id: 'kg-ha', name: 'kg/ha' },
    { id: 'g-ha', name: 'g/ha' },
    { id: 'ml-l', name: 'mL/L' },
    { id: 'g-l', name: 'g/L' },
  ];

  const statusOptions = [
    { id: 'agendado', name: 'Agendado' },
    { id: 'em-andamento', name: 'Em Andamento' },
    { id: 'concluido', name: 'Concluído' },
    { id: 'cancelado', name: 'Cancelado' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validações específicas para aplicações
    if (!formData.data || !formData.talhao || !formData.tipoAplicacao || !formData.produto) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios:\n- Data\n- Talhão\n- Tipo de Aplicação\n- Produto');
      return;
    }

    if (!formData.dosagem || !formData.unidadeDosagem) {
      Alert.alert('Erro', 'Por favor, informe a dosagem e sua unidade.');
      return;
    }

    // Gerar código de rastreamento
    const codigoRastreio = `APL${Date.now()}`;
    
    const aplicacaoData = {
      ...formData,
      codigoRastreio,
      dataRegistro: new Date().toISOString(),
      tipo: 'Aplicação',
    };

    Alert.alert(
      'Sucesso',
      `Aplicação registrada com sucesso!\nCódigo: ${codigoRastreio}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );

    console.log('Aplicação registrada:', aplicacaoData);
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar',
      'Tem certeza que deseja cancelar? Os dados não salvos serão perdidos.',
      [
        { text: 'Continuar Editando', style: 'cancel' },
        { text: 'Cancelar', style: 'destructive', onPress: () => navigation.goBack() }
      ]
    );
  };

  const renderDropdownModal = (visible, onClose, data, onSelect, title) => (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onSelect(item.name);
                  onClose();
                }}
              >
                {item.icon && <Icon name={item.icon} size={20} color={COLORS.primary} style={styles.modalItemIcon} />}
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const renderInput = (label, field, placeholder, required = false, multiline = false, keyboardType = 'default') => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        keyboardType={keyboardType}
      />
    </View>
  );

  const renderDropdown = (label, field, placeholder, onPress, required = false) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TouchableOpacity style={styles.dropdown} onPress={onPress}>
        <Text style={[styles.dropdownText, !formData[field] && styles.placeholderText]}>
          {formData[field] || placeholder}
        </Text>
        <Icon name="arrow-drop-down" size={24} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Icon name="close" size={24} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registro de Aplicação</Text>
        <TouchableOpacity onPress={handleSave}>
          <Icon name="check" size={24} color={COLORS.background} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Informações Básicas */}
          <Text style={styles.sectionTitle}>Informações Básicas</Text>
          
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              {renderInput('Data', 'data', 'YYYY-MM-DD', true)}
            </View>
            <View style={styles.halfWidth}>
              {renderInput('Hora', 'hora', 'HH:MM', true)}
            </View>
          </View>

          {renderDropdown(
            'Talhão',
            'talhao',
            'Selecionar talhão',
            () => setShowTalhaoModal(true),
            true
          )}

          {renderDropdown(
            'Tipo de Aplicação',
            'tipoAplicacao',
            'Selecionar tipo',
            () => setShowTipoModal(true),
            true
          )}

          {/* Produto */}
          <Text style={styles.sectionTitle}>Produto</Text>
          
          {renderInput('Nome do Produto', 'produto', 'Ex: Roundup', true)}
          {renderInput('Marca', 'marca', 'Ex: Bayer')}
          
          <View style={styles.row}>
            <View style={styles.twoThirdsWidth}>
              {renderInput('Dosagem', 'dosagem', 'Ex: 2.5', true, false, 'numeric')}
            </View>
            <View style={styles.oneThirdWidth}>
              {renderDropdown(
                'Unidade',
                'unidadeDosagem',
                'Unidade',
                () => setShowUnidadeModal(true),
                true
              )}
            </View>
          </View>

          {renderInput('Volume de Calda (L/ha)', 'volumeCalda', 'Ex: 200', false, false, 'numeric')}
          {renderInput('Prazo de Carência (dias)', 'prazoCarencia', 'Ex: 30', false, false, 'numeric')}
          {renderInput('Intervalo de Segurança (horas)', 'intervaloSeguranca', 'Ex: 24', false, false, 'numeric')}

          {/* Equipamento e Responsável */}
          <Text style={styles.sectionTitle}>Execução</Text>
          
          {renderDropdown(
            'Equipamento',
            'equipamento',
            'Selecionar equipamento',
            () => setShowEquipamentoModal(true)
          )}

          {renderInput('Responsável', 'responsavel', 'Nome do operador')}

          {/* Condições Climáticas */}
          <Text style={styles.sectionTitle}>Condições Climáticas</Text>
          
          {renderInput('Condições Gerais', 'condicoesClimaticas', 'Ex: Ensolarado, sem vento')}
          
          <View style={styles.row}>
            <View style={styles.oneThirdWidth}>
              {renderInput('Temperatura (°C)', 'temperatura', '25', false, false, 'numeric')}
            </View>
            <View style={styles.oneThirdWidth}>
              {renderInput('Umidade (%)', 'umidade', '60', false, false, 'numeric')}
            </View>
            <View style={styles.oneThirdWidth}>
              {renderInput('Vento (km/h)', 'ventoVelocidade', '5', false, false, 'numeric')}
            </View>
          </View>

          {/* Status e Observações */}
          <Text style={styles.sectionTitle}>Finalização</Text>
          
          {renderDropdown(
            'Status',
            'status',
            'Selecionar status',
            () => setShowStatusModal(true),
            true
          )}

          {renderInput('Observações', 'observacoes', 'Observações adicionais...', false, true)}
        </View>
      </ScrollView>

      {/* Modais */}
      {renderDropdownModal(
        showTipoModal,
        () => setShowTipoModal(false),
        tiposAplicacao,
        (value) => handleInputChange('tipoAplicacao', value),
        'Tipo de Aplicação'
      )}

      {renderDropdownModal(
        showTalhaoModal,
        () => setShowTalhaoModal(false),
        talhoes,
        (value) => handleInputChange('talhao', value),
        'Selecionar Talhão'
      )}

      {renderDropdownModal(
        showEquipamentoModal,
        () => setShowEquipamentoModal(false),
        equipamentos,
        (value) => handleInputChange('equipamento', value),
        'Selecionar Equipamento'
      )}

      {renderDropdownModal(
        showUnidadeModal,
        () => setShowUnidadeModal(false),
        unidadesDosagem,
        (value) => handleInputChange('unidadeDosagem', value),
        'Unidade de Dosagem'
      )}

      {renderDropdownModal(
        showStatusModal,
        () => setShowStatusModal(false),
        statusOptions,
        (value) => handleInputChange('status', value),
        'Status da Aplicação'
      )}
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
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 5,
  },
  inputGroup: {
    marginBottom: SIZES.margin,
  },
  label: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: 12,
    fontSize: SIZES.body,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: 12,
    backgroundColor: COLORS.surface,
  },
  dropdownText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    flex: 1,
  },
  placeholderText: {
    color: COLORS.textSecondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  oneThirdWidth: {
    width: '31%',
  },
  twoThirdsWidth: {
    width: '65%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalItemIcon: {
    marginRight: 12,
  },
  modalItemText: {
    fontSize: SIZES.body,
    color: COLORS.text,
  },
});
