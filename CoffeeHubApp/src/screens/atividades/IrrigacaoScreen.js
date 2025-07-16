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

export default function IrrigacaoScreen({ navigation, route }) {
  const { preSelectedLote } = route.params || {};
  
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    horaInicio: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    horaFim: '',
    talhao: '',
    loteId: preSelectedLote || '',
    tipoIrrigacao: '',
    volumeAguaUtilizado: '',
    pressaoSistema: '',
    vazaoSistema: '',
    tempoIrrigacao: '',
    sistemaUtilizado: '',
    responsavel: '',
    condicoesClimaticas: '',
    temperaturaAmbiente: '',
    umidadeAr: '',
    umidadeSolo: '',
    observacoes: '',
    custoEnergetico: '',
    eficienciaAplicacao: '',
    status: 'Agendado',
  });

  const [showTipoModal, setShowTipoModal] = useState(false);
  const [showTalhaoModal, setShowTalhaoModal] = useState(false);
  const [showSistemaModal, setShowSistemaModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const tiposIrrigacao = [
    { id: 'gotejamento', name: 'Gotejamento', icon: 'water-drop' },
    { id: 'aspersao', name: 'Aspersão', icon: 'shower' },
    { id: 'microaspersao', name: 'Microaspersão', icon: 'grain' },
    { id: 'sulco', name: 'Sulco', icon: 'waves' },
    { id: 'inundacao', name: 'Inundação', icon: 'flood' },
    { id: 'nebulizacao', name: 'Nebulização', icon: 'cloud' },
  ];

  const talhoes = [
    { id: 'talhao-a1', name: 'Talhão A1 (5,2 ha)' },
    { id: 'talhao-a2', name: 'Talhão A2 (3,8 ha)' },
    { id: 'talhao-b1', name: 'Talhão B1 (4,5 ha)' },
    { id: 'talhao-b2', name: 'Talhão B2 (6,1 ha)' },
    { id: 'talhao-c1', name: 'Talhão C1 (2,9 ha)' },
    { id: 'talhao-c2', name: 'Talhão C2 (4,2 ha)' },
  ];

  const sistemas = [
    { id: 'sistema-1', name: 'Sistema Central 1 (Gotejamento)' },
    { id: 'sistema-2', name: 'Sistema Central 2 (Aspersão)' },
    { id: 'sistema-3', name: 'Sistema Móvel A' },
    { id: 'sistema-4', name: 'Sistema Móvel B' },
    { id: 'pivot', name: 'Pivot Central' },
    { id: 'manual', name: 'Irrigação Manual' },
  ];

  const statusOptions = [
    { id: 'agendado', name: 'Agendado' },
    { id: 'em-andamento', name: 'Em Andamento' },
    { id: 'concluido', name: 'Concluído' },
    { id: 'suspenso', name: 'Suspenso' },
    { id: 'cancelado', name: 'Cancelado' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validações específicas para irrigação
    if (!formData.data || !formData.talhao || !formData.tipoIrrigacao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios:\n- Data\n- Talhão\n- Tipo de Irrigação');
      return;
    }

    if (!formData.volumeAguaUtilizado || !formData.tempoIrrigacao) {
      Alert.alert('Erro', 'Por favor, informe o volume de água e tempo de irrigação.');
      return;
    }

    // Gerar código de rastreamento
    const codigoRastreio = `IRR${Date.now()}`;
    
    const irrigacaoData = {
      ...formData,
      codigoRastreio,
      dataRegistro: new Date().toISOString(),
      tipo: 'Irrigação',
    };

    Alert.alert(
      'Sucesso',
      `Irrigação registrada com sucesso!\nCódigo: ${codigoRastreio}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );

    console.log('Irrigação registrada:', irrigacaoData);
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
        <Text style={styles.headerTitle}>Registro de Irrigação</Text>
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
              {renderInput('Hora Início', 'horaInicio', 'HH:MM', true)}
            </View>
          </View>

          {renderInput('Hora Fim', 'horaFim', 'HH:MM (opcional)')}

          {renderDropdown(
            'Talhão',
            'talhao',
            'Selecionar talhão',
            () => setShowTalhaoModal(true),
            true
          )}

          {renderDropdown(
            'Tipo de Irrigação',
            'tipoIrrigacao',
            'Selecionar tipo',
            () => setShowTipoModal(true),
            true
          )}

          {renderDropdown(
            'Sistema Utilizado',
            'sistemaUtilizado',
            'Selecionar sistema',
            () => setShowSistemaModal(true)
          )}

          {/* Parâmetros Técnicos */}
          <Text style={styles.sectionTitle}>Parâmetros Técnicos</Text>
          
          {renderInput('Volume de Água (L)', 'volumeAguaUtilizado', 'Ex: 5000', true, false, 'numeric')}
          {renderInput('Tempo de Irrigação (min)', 'tempoIrrigacao', 'Ex: 120', true, false, 'numeric')}
          
          <View style={styles.row}>
            <View style={styles.halfWidth}>
              {renderInput('Pressão (bar)', 'pressaoSistema', 'Ex: 2.5', false, false, 'numeric')}
            </View>
            <View style={styles.halfWidth}>
              {renderInput('Vazão (L/min)', 'vazaoSistema', 'Ex: 50', false, false, 'numeric')}
            </View>
          </View>

          {renderInput('Eficiência (%)', 'eficienciaAplicacao', 'Ex: 85', false, false, 'numeric')}
          {renderInput('Custo Energético (R$)', 'custoEnergetico', 'Ex: 45.80', false, false, 'numeric')}

          {/* Condições Ambientais */}
          <Text style={styles.sectionTitle}>Condições Ambientais</Text>
          
          {renderInput('Condições Climáticas', 'condicoesClimaticas', 'Ex: Ensolarado, sem vento')}
          
          <View style={styles.row}>
            <View style={styles.oneThirdWidth}>
              {renderInput('Temp. Ambiente (°C)', 'temperaturaAmbiente', '25', false, false, 'numeric')}
            </View>
            <View style={styles.oneThirdWidth}>
              {renderInput('Umidade Ar (%)', 'umidadeAr', '60', false, false, 'numeric')}
            </View>
            <View style={styles.oneThirdWidth}>
              {renderInput('Umidade Solo (%)', 'umidadeSolo', '40', false, false, 'numeric')}
            </View>
          </View>

          {/* Execução */}
          <Text style={styles.sectionTitle}>Execução</Text>
          
          {renderInput('Responsável', 'responsavel', 'Nome do operador')}

          {/* Finalização */}
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
        tiposIrrigacao,
        (value) => handleInputChange('tipoIrrigacao', value),
        'Tipo de Irrigação'
      )}

      {renderDropdownModal(
        showTalhaoModal,
        () => setShowTalhaoModal(false),
        talhoes,
        (value) => handleInputChange('talhao', value),
        'Selecionar Talhão'
      )}

      {renderDropdownModal(
        showSistemaModal,
        () => setShowSistemaModal(false),
        sistemas,
        (value) => handleInputChange('sistemaUtilizado', value),
        'Sistema de Irrigação'
      )}

      {renderDropdownModal(
        showStatusModal,
        () => setShowStatusModal(false),
        statusOptions,
        (value) => handleInputChange('status', value),
        'Status da Irrigação'
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
