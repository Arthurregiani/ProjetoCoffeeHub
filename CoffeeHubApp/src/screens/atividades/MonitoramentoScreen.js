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

export default function MonitoramentoScreen({ navigation, route }) {
  const { preSelectedLote } = route.params || {};
  
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    talhao: '',
    loteId: preSelectedLote || '',
    tipoMonitoramento: '',
    objetivo: '',
    metodologia: '',
    equipamentosUsados: '',
    responsavel: '',
    condicoesClimaticas: '',
    resultados: '',
    observacoes: '',
    nivelIncidencia: '',
    areAfeada: '',
    recomendacoes: '',
    proximaAvaliacao: '',
    fotos: '',
    status: 'Concluído',
  });

  const [showTipoModal, setShowTipoModal] = useState(false);
  const [showTalhaoModal, setShowTalhaoModal] = useState(false);
  const [showNivelModal, setShowNivelModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const tiposMonitoramento = [
    { id: 'pragas', name: 'Monitoramento de Pragas', icon: 'bug-report' },
    { id: 'doencas', name: 'Monitoramento de Doenças', icon: 'healing' },
    { id: 'nutricional', name: 'Monitoramento Nutricional', icon: 'eco' },
    { id: 'crescimento', name: 'Monitoramento de Crescimento', icon: 'height' },
    { id: 'florada', name: 'Monitoramento de Florada', icon: 'local-florist' },
    { id: 'frutos', name: 'Monitoramento de Frutos', icon: 'nature' },
    { id: 'qualidade', name: 'Monitoramento de Qualidade', icon: 'high-quality' },
    { id: 'climatico', name: 'Monitoramento Climático', icon: 'cloud' },
  ];

  const talhoes = [
    { id: 'talhao-a1', name: 'Talhão A1 (5,2 ha)' },
    { id: 'talhao-a2', name: 'Talhão A2 (3,8 ha)' },
    { id: 'talhao-b1', name: 'Talhão B1 (4,5 ha)' },
    { id: 'talhao-b2', name: 'Talhão B2 (6,1 ha)' },
    { id: 'talhao-c1', name: 'Talhão C1 (2,9 ha)' },
    { id: 'talhao-c2', name: 'Talhão C2 (4,2 ha)' },
  ];

  const niveisIncidencia = [
    { id: 'ausente', name: 'Ausente (0%)' },
    { id: 'baixo', name: 'Baixo (1-10%)' },
    { id: 'moderado', name: 'Moderado (11-25%)' },
    { id: 'alto', name: 'Alto (26-50%)' },
    { id: 'severo', name: 'Severo (>50%)' },
  ];

  const statusOptions = [
    { id: 'concluido', name: 'Concluído' },
    { id: 'pendente', name: 'Pendente' },
    { id: 'em-andamento', name: 'Em Andamento' },
    { id: 'suspenso', name: 'Suspenso' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validações específicas para monitoramento
    if (!formData.data || !formData.talhao || !formData.tipoMonitoramento) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios:\n- Data\n- Talhão\n- Tipo de Monitoramento');
      return;
    }

    if (!formData.objetivo || !formData.metodologia) {
      Alert.alert('Erro', 'Por favor, informe o objetivo e metodologia do monitoramento.');
      return;
    }

    // Gerar código de rastreamento
    const codigoRastreio = `MON${Date.now()}`;
    
    const monitoramentoData = {
      ...formData,
      codigoRastreio,
      dataRegistro: new Date().toISOString(),
      tipo: 'Monitoramento',
    };

    Alert.alert(
      'Sucesso',
      `Monitoramento registrado com sucesso!\nCódigo: ${codigoRastreio}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );

    console.log('Monitoramento registrado:', monitoramentoData);
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
        numberOfLines={multiline ? 4 : 1}
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
        <Text style={styles.headerTitle}>Registro de Monitoramento</Text>
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
            'Tipo de Monitoramento',
            'tipoMonitoramento',
            'Selecionar tipo',
            () => setShowTipoModal(true),
            true
          )}

          {renderInput('Responsável', 'responsavel', 'Nome do responsável')}

          {/* Metodologia */}
          <Text style={styles.sectionTitle}>Metodologia</Text>
          
          {renderInput('Objetivo', 'objetivo', 'Descreva o objetivo do monitoramento...', true, true)}
          {renderInput('Metodologia', 'metodologia', 'Descreva a metodologia utilizada...', true, true)}
          {renderInput('Equipamentos Utilizados', 'equipamentosUsados', 'Ex: Lupa, GPS, Termômetro...')}
          {renderInput('Condições Climáticas', 'condicoesClimaticas', 'Ex: Ensolarado, 25°C, sem vento')}

          {/* Resultados */}
          <Text style={styles.sectionTitle}>Resultados</Text>
          
          {renderInput('Resultados', 'resultados', 'Descreva os resultados encontrados...', false, true)}
          
          {renderDropdown(
            'Nível de Incidência',
            'nivelIncidencia',
            'Selecionar nível',
            () => setShowNivelModal(true)
          )}

          {renderInput('Área Afetada (ha)', 'areAfeada', 'Ex: 1.5', false, false, 'numeric')}
          {renderInput('Recomendações', 'recomendacoes', 'Recomendações de manejo...', false, true)}
          {renderInput('Próxima Avaliação', 'proximaAvaliacao', 'YYYY-MM-DD')}

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
          {renderInput('Fotos/Evidências', 'fotos', 'Links ou referências de fotos...')}
        </View>
      </ScrollView>

      {/* Modais */}
      {renderDropdownModal(
        showTipoModal,
        () => setShowTipoModal(false),
        tiposMonitoramento,
        (value) => handleInputChange('tipoMonitoramento', value),
        'Tipo de Monitoramento'
      )}

      {renderDropdownModal(
        showTalhaoModal,
        () => setShowTalhaoModal(false),
        talhoes,
        (value) => handleInputChange('talhao', value),
        'Selecionar Talhão'
      )}

      {renderDropdownModal(
        showNivelModal,
        () => setShowNivelModal(false),
        niveisIncidencia,
        (value) => handleInputChange('nivelIncidencia', value),
        'Nível de Incidência'
      )}

      {renderDropdownModal(
        showStatusModal,
        () => setShowStatusModal(false),
        statusOptions,
        (value) => handleInputChange('status', value),
        'Status do Monitoramento'
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
    height: 100,
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
