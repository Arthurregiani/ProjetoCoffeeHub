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

export default function CreateActivityScreen({ navigation, route }) {
  const { activityType, preSelectedLote } = route.params || {};
  
  const [formData, setFormData] = useState({
    type: activityType?.name || '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    location: '',
    description: '',
    observations: '',
    loteId: preSelectedLote || '',
    responsavel: '',
    quantidade: '',
    unidade: '',
    custo: '',
    status: 'Agendado',
  });

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showLoteModal, setShowLoteModal] = useState(false);

  // Dados simulados para dropdowns
  const locations = [
    { id: 'talhao-a1', name: 'Talhão A1' },
    { id: 'talhao-a2', name: 'Talhão A2' },
    { id: 'talhao-b1', name: 'Talhão B1' },
    { id: 'talhao-b2', name: 'Talhão B2' },
    { id: 'talhao-c1', name: 'Talhão C1' },
    { id: 'talhao-c2', name: 'Talhão C2' },
    { id: 'terreiro', name: 'Terreiro' },
    { id: 'armazem', name: 'Armazém' },
    { id: 'oficina', name: 'Oficina' },
  ];

  const statusOptions = [
    { id: 'agendado', name: 'Agendado' },
    { id: 'em-andamento', name: 'Em andamento' },
    { id: 'concluido', name: 'Concluído' },
    { id: 'pendente', name: 'Pendente' },
    { id: 'cancelado', name: 'Cancelado' },
  ];

  const lotes = [
    { id: 'lote-001', name: 'Lote 001 - Arábica' },
    { id: 'lote-002', name: 'Lote 002 - Conilon' },
    { id: 'lote-003', name: 'Lote 003 - Bourbon' },
    { id: 'lote-004', name: 'Lote 004 - Catuaí' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validações básicas
    if (!formData.type || !formData.date || !formData.location || !formData.description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Simular salvamento
    Alert.alert(
      'Sucesso',
      'Atividade criada com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
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
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const renderInput = (label, field, placeholder, required = false, multiline = false) => (
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
        <Text style={styles.headerTitle}>Nova Atividade</Text>
        <TouchableOpacity onPress={handleSave}>
          <Icon name="check" size={24} color={COLORS.background} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Tipo da Atividade */}
          {renderInput('Tipo da Atividade', 'type', 'Ex: Monitoramento de Pragas', true)}

          {/* Data e Hora */}
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              {renderInput('Data', 'date', 'DD/MM/AAAA', true)}
            </View>
            <View style={styles.halfWidth}>
              {renderInput('Hora', 'time', 'HH:MM', true)}
            </View>
          </View>

          {/* Local */}
          {renderDropdown(
            'Local',
            'location',
            'Selecionar local',
            () => setShowLocationModal(true),
            true
          )}

          {/* Lote (se aplicável) */}
          {renderDropdown(
            'Lote',
            'loteId',
            'Selecionar lote (opcional)',
            () => setShowLoteModal(true)
          )}

          {/* Descrição */}
          {renderInput('Descrição', 'description', 'Descreva a atividade...', true, true)}

          {/* Responsável */}
          {renderInput('Responsável', 'responsavel', 'Nome do responsável')}

          {/* Quantidade e Unidade */}
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              {renderInput('Quantidade', 'quantidade', '0')}
            </View>
            <View style={styles.halfWidth}>
              {renderInput('Unidade', 'unidade', 'kg, litros, sacas...')}
            </View>
          </View>

          {/* Custo */}
          {renderInput('Custo (R$)', 'custo', '0,00')}

          {/* Status */}
          {renderDropdown(
            'Status',
            'status',
            'Selecionar status',
            () => setShowStatusModal(true),
            true
          )}

          {/* Observações */}
          {renderInput('Observações', 'observations', 'Observações adicionais...', false, true)}
        </View>
      </ScrollView>

      {/* Modais */}
      {renderDropdownModal(
        showLocationModal,
        () => setShowLocationModal(false),
        locations,
        (value) => handleInputChange('location', value),
        'Selecionar Local'
      )}

      {renderDropdownModal(
        showStatusModal,
        () => setShowStatusModal(false),
        statusOptions,
        (value) => handleInputChange('status', value),
        'Selecionar Status'
      )}

      {renderDropdownModal(
        showLoteModal,
        () => setShowLoteModal(false),
        lotes,
        (value) => handleInputChange('loteId', value),
        'Selecionar Lote'
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalItemText: {
    fontSize: SIZES.body,
    color: COLORS.text,
  },
});
