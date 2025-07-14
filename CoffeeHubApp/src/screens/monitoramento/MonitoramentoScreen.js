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

const MonitoramentoScreen = ({ navigation }) => {
  const [monitoramentos, setMonitoramentos] = useState([
    {
      id: 1,
      tipo: 'Pragas',
      descricao: 'Monitoramento de broca-do-café',
      data: '2024-01-15',
      talhao: 'Talhão A1',
      funcionario: 'João Silva',
      status: 'Concluído',
      observacoes: 'Baixa incidência de pragas',
      codigoRastreio: 'MON001',
    },
    {
      id: 2,
      tipo: 'Nutricional',
      descricao: 'Análise foliar',
      data: '2024-01-14',
      talhao: 'Talhão B2',
      funcionario: 'Maria Santos',
      status: 'Pendente',
      observacoes: 'Deficiência de potássio identificada',
      codigoRastreio: 'MON002',
    },
    {
      id: 3,
      tipo: 'Doenças',
      descricao: 'Verificação de ferrugem',
      data: '2024-01-13',
      talhao: 'Talhão C3',
      funcionario: 'Carlos Lima',
      status: 'Em andamento',
      observacoes: 'Sintomas iniciais detectados',
      codigoRastreio: 'MON003',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState('');
  const [novoMonitoramento, setNovoMonitoramento] = useState({
    tipo: '',
    descricao: '',
    talhao: '',
    funcionario: '',
    observacoes: '',
    status: 'Pendente',
  });

  const tiposMonitoramento = [
    { id: 'pragas', nome: 'Pragas', icon: 'bug-report', color: COLORS.error },
    { id: 'doencas', nome: 'Doenças', icon: 'local-hospital', color: COLORS.warning },
    { id: 'nutricional', nome: 'Nutricional', icon: 'eco', color: COLORS.success },
    { id: 'clima', nome: 'Clima', icon: 'wb-sunny', color: COLORS.primary },
    { id: 'solo', nome: 'Solo', icon: 'layers', color: COLORS.accent },
    { id: 'geral', nome: 'Geral', icon: 'visibility', color: COLORS.textSecondary },
  ];

  const handleAddMonitoramento = () => {
    if (!novoMonitoramento.tipo || !novoMonitoramento.descricao || !novoMonitoramento.talhao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novoItem = {
      id: Date.now(),
      ...novoMonitoramento,
      data: new Date().toISOString().split('T')[0],
      codigoRastreio: `MON${String(Date.now()).slice(-3)}`,
    };

    setMonitoramentos([novoItem, ...monitoramentos]);
    setNovoMonitoramento({
      tipo: '',
      descricao: '',
      talhao: '',
      funcionario: '',
      observacoes: '',
      status: 'Pendente',
    });
    setModalVisible(false);
    Alert.alert('Sucesso', 'Monitoramento registrado com sucesso!');
  };

  const handleMonitoramentoPress = (monitoramento) => {
    Alert.alert(
      'Detalhes do Monitoramento',
      `Tipo: ${monitoramento.tipo}\nDescrição: ${monitoramento.descricao}\nTalhão: ${monitoramento.talhao}\nFuncionário: ${monitoramento.funcionario}\nObservações: ${monitoramento.observacoes}\nCódigo: ${monitoramento.codigoRastreio}`,
      [
        { text: 'Fechar', style: 'cancel' },
        {
          text: 'Editar',
          onPress: () => {
            setNovoMonitoramento(monitoramento);
            setModalVisible(true);
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Concluído': return COLORS.success;
      case 'Em andamento': return COLORS.warning;
      case 'Pendente': return COLORS.error;
      default: return COLORS.textSecondary;
    }
  };

  const getTipoColor = (tipo) => {
    const tipoObj = tiposMonitoramento.find(t => t.nome === tipo);
    return tipoObj ? tipoObj.color : COLORS.primary;
  };

  const renderMonitoramentoCard = (monitoramento) => (
    <TouchableOpacity
      key={monitoramento.id}
      style={styles.monitoramentoCard}
      onPress={() => handleMonitoramentoPress(monitoramento)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.tipoContainer}>
          <View style={[styles.tipoIndicator, { backgroundColor: getTipoColor(monitoramento.tipo) }]} />
          <Text style={styles.tipoText}>{monitoramento.tipo}</Text>
        </View>
        <Text style={styles.dataText}>{monitoramento.data}</Text>
      </View>
      
      <Text style={styles.descricaoText}>{monitoramento.descricao}</Text>
      
      <View style={styles.infoRow}>
        <Icon name="location-on" size={16} color={COLORS.textSecondary} />
        <Text style={styles.infoText}>{monitoramento.talhao}</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Icon name="person" size={16} color={COLORS.textSecondary} />
        <Text style={styles.infoText}>{monitoramento.funcionario}</Text>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(monitoramento.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(monitoramento.status) }]}>
            {monitoramento.status}
          </Text>
        </View>
        <Text style={styles.codigoText}>{monitoramento.codigoRastreio}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTipoSelector = () => (
    <View style={styles.tipoGrid}>
      {tiposMonitoramento.map((tipo) => (
        <TouchableOpacity
          key={tipo.id}
          style={[
            styles.tipoButton,
            { backgroundColor: tipo.color },
            selectedTipo === tipo.nome && styles.tipoButtonSelected
          ]}
          onPress={() => {
            setSelectedTipo(tipo.nome);
            setNovoMonitoramento({ ...novoMonitoramento, tipo: tipo.nome });
          }}
        >
          <Icon name={tipo.icon} size={24} color={COLORS.white} />
          <Text style={styles.tipoButtonText}>{tipo.nome}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Monitoramento</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Lista de Monitoramentos */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monitoramentos Recentes</Text>
          {monitoramentos.map(renderMonitoramentoCard)}
        </View>
      </ScrollView>

      {/* Modal para Novo Monitoramento */}
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
                <Text style={styles.modalTitle}>Novo Monitoramento</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                <Text style={styles.inputLabel}>Tipo de Monitoramento *</Text>
                {renderTipoSelector()}

                <Text style={styles.inputLabel}>Descrição *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Descreva o monitoramento..."
                  value={novoMonitoramento.descricao}
                  onChangeText={(text) => setNovoMonitoramento({ ...novoMonitoramento, descricao: text })}
                  multiline
                  numberOfLines={2}
                />

                <Text style={styles.inputLabel}>Talhão *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Talhão A1"
                  value={novoMonitoramento.talhao}
                  onChangeText={(text) => setNovoMonitoramento({ ...novoMonitoramento, talhao: text })}
                />

                <Text style={styles.inputLabel}>Funcionário</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nome do funcionário"
                  value={novoMonitoramento.funcionario}
                  onChangeText={(text) => setNovoMonitoramento({ ...novoMonitoramento, funcionario: text })}
                />

                <Text style={styles.inputLabel}>Observações</Text>
                <TextInput
                  style={[styles.textInput, { height: 80 }]}
                  placeholder="Observações adicionais..."
                  value={novoMonitoramento.observacoes}
                  onChangeText={(text) => setNovoMonitoramento({ ...novoMonitoramento, observacoes: text })}
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
                  onPress={handleAddMonitoramento}
                >
                  <Text style={styles.saveButtonText}>Salvar</Text>
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
  monitoramentoCard: {
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
    alignItems: 'center',
    marginBottom: 8,
  },
  tipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipoIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tipoText: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  dataText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  descricaoText: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
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
  codigoText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
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
  tipoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tipoButton: {
    width: '30%',
    alignItems: 'center',
    padding: 12,
    borderRadius: SIZES.radius,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipoButtonSelected: {
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  tipoButtonText: {
    fontSize: SIZES.small,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 4,
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

export default MonitoramentoScreen;
