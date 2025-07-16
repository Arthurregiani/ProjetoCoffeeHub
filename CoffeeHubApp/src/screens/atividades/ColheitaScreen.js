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

export default function ColheitaScreen({ navigation, route }) {
  const { preSelectedLote } = route.params || {};
  
  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    talhao: '',
    loteId: preSelectedLote || '',
    metodo: '',
    quantidade: '',
    unidade: 'sacas',
    equipamento: '',
    funcionario: '',
    maturacao: '',
    condicoesClimaticas: '',
    percentualImpurezas: '',
    umidade: '',
    rendimento: '',
    observacoes: '',
    qualidadeGraos: '',
    custoPorSaca: '',
    status: 'Agendado',
  });

  const [showMetodoModal, setShowMetodoModal] = useState(false);
  const [showTalhaoModal, setShowTalhaoModal] = useState(false);
  const [showEquipamentoModal, setShowEquipamentoModal] = useState(false);
  const [showMaturacaoModal, setShowMaturacaoModal] = useState(false);
  const [showQualidadeModal, setShowQualidadeModal] = useState(false);
  const [showUnidadeModal, setShowUnidadeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const metodosColheita = [
    { id: 'manual-seletivo', name: 'Manual Seletivo', icon: 'hand-pan' },
    { id: 'manual-derriça', name: 'Manual Derriça', icon: 'pan-tool' },
    { id: 'mecanico', name: 'Mecânico', icon: 'precision-manufacturing' },
    { id: 'semimecanico', name: 'Semimecânico', icon: 'build' },
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
    { id: 'colheitadeira-1', name: 'Colheitadeira New Holland' },
    { id: 'colheitadeira-2', name: 'Colheitadeira Case' },
    { id: 'derricadeira', name: 'Derriçadeira Portátil' },
    { id: 'peneira', name: 'Peneira Manual' },
    { id: 'varredor', name: 'Varredor Mecânico' },
    { id: 'manual', name: 'Colheita Manual' },
  ];

  const niveisMaturacao = [
    { id: 'verde', name: 'Verde' },
    { id: 'verdoengo', name: 'Verdoengo' },
    { id: 'cereja', name: 'Cereja' },
    { id: 'passa', name: 'Passa' },
    { id: 'seco', name: 'Seco' },
    { id: 'misto', name: 'Misto' },
  ];

  const qualidadeGraos = [
    { id: 'especial', name: 'Especial (>80 pontos)' },
    { id: 'gourmet', name: 'Gourmet (75-80 pontos)' },
    { id: 'superior', name: 'Superior (70-75 pontos)' },
    { id: 'tradicional', name: 'Tradicional (60-70 pontos)' },
    { id: 'comercial', name: 'Comercial (<60 pontos)' },
  ];

  const unidades = [
    { id: 'sacas', name: 'Sacas (60kg)' },
    { id: 'kg', name: 'Quilogramas (kg)' },
    { id: 'toneladas', name: 'Toneladas (t)' },
    { id: 'litros', name: 'Litros (café coco)' },
  ];

  const statusOptions = [
    { id: 'agendado', name: 'Agendado' },
    { id: 'em-andamento', name: 'Em Andamento' },
    { id: 'concluido', name: 'Concluído' },
    { id: 'suspenso', name: 'Suspenso' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validações específicas para colheita
    if (!formData.data || !formData.talhao || !formData.metodo || !formData.quantidade) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios:\n- Data\n- Talhão\n- Método\n- Quantidade');
      return;
    }

    // Gerar código de rastreamento
    const codigoRastreio = `COL${Date.now()}`;
    
    // Gerar lote automaticamente
    const novoLote = {
      id: Date.now().toString(),
      codigo: `LOTE${Date.now()}`,
      codigoQR: `QR${Date.now()}`,
      dataCriacao: new Date().toISOString().split('T')[0],
      status: 'Criado',
      descricao: `Lote gerado da colheita em ${formData.talhao}`,
      origem: formData.talhao,
      quantidade: formData.quantidade,
      unidade: formData.unidade,
      qualidade: formData.qualidadeGraos,
      umidade: formData.umidade,
    };
    
    const colheitaData = {
      ...formData,
      codigoRastreio,
      loteGerado: novoLote,
      dataRegistro: new Date().toISOString(),
      tipo: 'Colheita',
    };

    Alert.alert(
      'Sucesso',
      `Colheita registrada com sucesso!\nCódigo: ${codigoRastreio}\nLote Gerado: ${novoLote.codigo}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );

    console.log('Colheita registrada:', colheitaData);
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
        <Text style={styles.headerTitle}>Registro de Colheita</Text>
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
            'Método de Colheita',
            'metodo',
            'Selecionar método',
            () => setShowMetodoModal(true),
            true
          )}

          {/* Quantidade e Produção */}
          <Text style={styles.sectionTitle}>Produção</Text>
          
          <View style={styles.row}>
            <View style={styles.twoThirdsWidth}>
              {renderInput('Quantidade', 'quantidade', 'Ex: 150', true, false, 'numeric')}
            </View>
            <View style={styles.oneThirdWidth}>
              {renderDropdown(
                'Unidade',
                'unidade',
                'Unidade',
                () => setShowUnidadeModal(true),
                true
              )}
            </View>
          </View>

          {renderInput('Rendimento (sacas/ha)', 'rendimento', 'Ex: 25', false, false, 'numeric')}
          {renderInput('Custo por Saca (R$)', 'custoPorSaca', 'Ex: 280.00', false, false, 'numeric')}

          {/* Qualidade */}
          <Text style={styles.sectionTitle}>Qualidade</Text>
          
          {renderDropdown(
            'Nível de Maturação',
            'maturacao',
            'Selecionar maturação',
            () => setShowMaturacaoModal(true)
          )}

          {renderDropdown(
            'Qualidade dos Grãos',
            'qualidadeGraos',
            'Selecionar qualidade',
            () => setShowQualidadeModal(true)
          )}

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              {renderInput('Umidade (%)', 'umidade', '12', false, false, 'numeric')}
            </View>
            <View style={styles.halfWidth}>
              {renderInput('% Impurezas', 'percentualImpurezas', '5', false, false, 'numeric')}
            </View>
          </View>

          {/* Execução */}
          <Text style={styles.sectionTitle}>Execução</Text>
          
          {renderDropdown(
            'Equipamento',
            'equipamento',
            'Selecionar equipamento',
            () => setShowEquipamentoModal(true)
          )}

          {renderInput('Funcionário Responsável', 'funcionario', 'Nome do funcionário')}
          {renderInput('Condições Climáticas', 'condicoesClimaticas', 'Ex: Ensolarado, 25°C')}

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
        showMetodoModal,
        () => setShowMetodoModal(false),
        metodosColheita,
        (value) => handleInputChange('metodo', value),
        'Método de Colheita'
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
        showMaturacaoModal,
        () => setShowMaturacaoModal(false),
        niveisMaturacao,
        (value) => handleInputChange('maturacao', value),
        'Nível de Maturação'
      )}

      {renderDropdownModal(
        showQualidadeModal,
        () => setShowQualidadeModal(false),
        qualidadeGraos,
        (value) => handleInputChange('qualidadeGraos', value),
        'Qualidade dos Grãos'
      )}

      {renderDropdownModal(
        showUnidadeModal,
        () => setShowUnidadeModal(false),
        unidades,
        (value) => handleInputChange('unidade', value),
        'Unidade'
      )}

      {renderDropdownModal(
        showStatusModal,
        () => setShowStatusModal(false),
        statusOptions,
        (value) => handleInputChange('status', value),
        'Status da Colheita'
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
