import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { COLORS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActivityCard = ({ activity, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardTitle}>{activity.type}</Text>
      <Text style={styles.cardDate}>{activity.date}</Text>
    </View>
    <Text style={styles.cardLocation}>{activity.location}</Text>
    <Text style={styles.cardDescription}>{activity.description}</Text>
    <View style={styles.cardFooter}>
      <Text style={styles.cardStatus}>{activity.status}</Text>
      {activity.trackingCode && (
        <Text style={styles.cardTrackingCode}>#{activity.trackingCode}</Text>
      )}
    </View>
  </TouchableOpacity>
);

const ActivityTypeModal = ({ visible, onClose, onSelectType }) => {
  const activityTypes = [
    { id: 'monitoring', name: 'Monitoramento', icon: 'visibility' },
    { id: 'application', name: 'Aplicação', icon: 'spray' },
    { id: 'harvest', name: 'Colheita', icon: 'agriculture' },
    { id: 'irrigation', name: 'Irrigação', icon: 'water-drop' },
    { id: 'management', name: 'Manejo', icon: 'build' },
    { id: 'financial', name: 'Operação Financeira', icon: 'attach-money' },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecionar Tipo de Atividade</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={activityTypes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => onSelectType(item)}
              >
                <Icon name={item.icon} size={24} color={COLORS.primary} />
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default function AtividadesScreen({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Monitoramento');
  const [modalVisible, setModalVisible] = useState(false);
  
  // Verificar se há parâmetros de lote pré-selecionado
  const preSelectedLote = route?.params?.preSelectedLote;
  const shouldOpenModal = route?.params?.shouldOpenModal;

  // Abrir modal automaticamente se necessário
  React.useEffect(() => {
    if (shouldOpenModal) {
      setModalVisible(true);
      // Limpar os parâmetros para evitar abrir novamente
      navigation.setParams({ shouldOpenModal: false });
    }
  }, [shouldOpenModal, navigation]);

  const tabs = ['Monitoramento', 'Insumos', 'Produção', 'Qualidade', 'Recursos', 'Financeiro'];

  // Dados de exemplo para diferentes categorias
  const activitiesData = {
    'Monitoramento': [
      { id: '1', type: 'Monitoramento de Pragas', date: '15/01/2024', location: 'Talhão A1', description: 'Verificação de broca-do-café', status: 'Concluído', trackingCode: 'MON001' },
      { id: '2', type: 'Monitoramento Nutricional', date: '14/01/2024', location: 'Talhão B2', description: 'Análise foliar', status: 'Pendente', trackingCode: 'MON002' },
    ],
    'Insumos': [
      { id: '3', type: 'Aplicação de Fertilizante', date: '13/01/2024', location: 'Talhão A1', description: 'NPK 20-05-20', status: 'Concluído', trackingCode: 'INS001' },
      { id: '4', type: 'Aplicação de Defensivo', date: '12/01/2024', location: 'Talhão C3', description: 'Fungicida preventivo', status: 'Concluído', trackingCode: 'INS002' },
    ],
    'Produção': [
      { id: '5', type: 'Colheita', date: '10/01/2024', location: 'Talhão A1', description: 'Colheita manual seletiva', status: 'Em andamento', trackingCode: 'PRD001' },
      { id: '6', type: 'Processamento', date: '09/01/2024', location: 'Terreiro', description: 'Secagem natural', status: 'Concluído', trackingCode: 'PRD002' },
    ],
    'Qualidade': [
      { id: '7', type: 'Classificação', date: '08/01/2024', location: 'Armazém', description: 'Classificação por peneira', status: 'Concluído', trackingCode: 'QLD001' },
      { id: '8', type: 'Análise Sensorial', date: '07/01/2024', location: 'Laboratório', description: 'Cupping de qualidade', status: 'Pendente', trackingCode: 'QLD002' },
    ],
    'Recursos': [
      { id: '9', type: 'Manutenção de Equipamento', date: '06/01/2024', location: 'Oficina', description: 'Revisão do trator', status: 'Concluído', trackingCode: 'REC001' },
      { id: '10', type: 'Treinamento', date: '05/01/2024', location: 'Sede', description: 'Capacitação em segurança', status: 'Agendado', trackingCode: 'REC002' },
    ],
    'Financeiro': [
      { id: '11', type: 'Compra de Insumos', date: '04/01/2024', location: 'Fornecedor A', description: 'Aquisição de fertilizantes', status: 'Concluído', trackingCode: 'FIN001' },
      { id: '12', type: 'Venda de Café', date: '03/01/2024', location: 'Cooperativa', description: 'Venda de 100 sacas', status: 'Processando', trackingCode: 'FIN002' },
    ],
  };

  const currentActivities = activitiesData[activeTab] || [];

  const handleActivityPress = (activity) => {
    console.log('Detalhes da atividade:', activity.type);
    // Navegar para tela de detalhes da atividade
  };

  const handleAddActivity = () => {
    setModalVisible(true);
  };

  const handleSelectActivityType = (activityType) => {
    setModalVisible(false);
    console.log('Tipo selecionado:', activityType.name);
    // Navegar para a tela de registro do tipo de atividade selecionado
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Atividades</Text>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={tabs}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === item && styles.activeTab
              ]}
              onPress={() => setActiveTab(item)}
            >
              <Text style={[
                styles.tabText,
                activeTab === item && styles.activeTabText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={currentActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onPress={() => handleActivityPress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="work-off" size={64} color={COLORS.gray} />
            <Text style={styles.emptyText}>Nenhuma atividade encontrada</Text>
            <Text style={styles.emptySubtext}>Toque no botão + para adicionar uma nova atividade</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleAddActivity}>
        <Icon name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>

      <ActivityTypeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectType={handleSelectActivityType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  tabsContainer: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  cardDate: {
    fontSize: 12,
    color: COLORS.gray,
  },
  cardLocation: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  cardTrackingCode: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: 'monospace',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: COLORS.accent,
    borderRadius: 30,
    elevation: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
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
    borderBottomColor: COLORS.lightGray,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalItemText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 16,
  },
});
