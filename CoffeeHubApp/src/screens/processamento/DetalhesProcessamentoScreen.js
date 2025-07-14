import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetalhesProcessamentoScreen = ({ navigation, route }) => {
  const { lote } = route.params || {};
  const [etapaAtual, setEtapaAtual] = useState('lavagem');

  const etapasProcessamento = [
    { id: 'lavagem', nome: 'Lavagem', icon: 'water-drop', concluida: true },
    { id: 'secagem', nome: 'Secagem', icon: 'wb-sunny', concluida: true },
    { id: 'descascamento', nome: 'Descascamento', icon: 'grain', concluida: false },
    { id: 'classificacao', nome: 'Classificação', icon: 'sort', concluida: false },
    { id: 'torrefacao', nome: 'Torrefação', icon: 'local-fire-department', concluida: false },
  ];

  const dadosProcessamento = {
    lote: lote?.nome || 'Lote 001',
    variedade: 'Bourbon Amarelo',
    dataInicio: '10/01/2024',
    previsaoTermino: '25/01/2024',
    responsavel: 'João Silva',
    status: 'Em andamento',
    temperatura: '45°C',
    umidade: '12%',
    peso: '500kg',
  };

  const handleEtapaPress = (etapa) => {
    if (etapa.id === 'secagem') {
      navigation.navigate('ControleSecagem', { lote: dadosProcessamento.lote });
    } else if (etapa.id === 'classificacao') {
      navigation.navigate('Qualidade', { lote: dadosProcessamento.lote });
    }
  };

  const registrarEtapa = () => {
    Alert.alert(
      'Registrar Etapa',
      'Deseja registrar a conclusão desta etapa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => Alert.alert('Sucesso', 'Etapa registrada com sucesso!') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalhes do Processamento</Text>
        <Text style={styles.subtitle}>{dadosProcessamento.lote}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações Gerais</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Variedade:</Text>
          <Text style={styles.infoValue}>{dadosProcessamento.variedade}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Data de Início:</Text>
          <Text style={styles.infoValue}>{dadosProcessamento.dataInicio}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Previsão de Término:</Text>
          <Text style={styles.infoValue}>{dadosProcessamento.previsaoTermino}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Responsável:</Text>
          <Text style={styles.infoValue}>{dadosProcessamento.responsavel}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={[styles.infoValue, styles.statusAtivo]}>
            {dadosProcessamento.status}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Condições Atuais</Text>
        <View style={styles.condicoesContainer}>
          <View style={styles.condicaoItem}>
            <Icon name="device-thermostat" size={24} color="#ff6b35" />
            <Text style={styles.condicaoLabel}>Temperatura</Text>
            <Text style={styles.condicaoValue}>{dadosProcessamento.temperatura}</Text>
          </View>
          <View style={styles.condicaoItem}>
            <Icon name="water-drop" size={24} color="#4dabf7" />
            <Text style={styles.condicaoLabel}>Umidade</Text>
            <Text style={styles.condicaoValue}>{dadosProcessamento.umidade}</Text>
          </View>
          <View style={styles.condicaoItem}>
            <Icon name="scale" size={24} color="#51cf66" />
            <Text style={styles.condicaoLabel}>Peso</Text>
            <Text style={styles.condicaoValue}>{dadosProcessamento.peso}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Etapas do Processamento</Text>
        {etapasProcessamento.map((etapa, index) => (
          <TouchableOpacity
            key={etapa.id}
            style={[
              styles.etapaItem,
              etapa.concluida && styles.etapaConcluida,
              etapa.id === etapaAtual && styles.etapaAtual,
            ]}
            onPress={() => handleEtapaPress(etapa)}
          >
            <View style={styles.etapaContent}>
              <Icon
                name={etapa.icon}
                size={24}
                color={etapa.concluida ? '#51cf66' : etapa.id === etapaAtual ? '#ff6b35' : '#adb5bd'}
              />
              <Text style={[
                styles.etapaNome,
                etapa.concluida && styles.etapaNomeConcluida,
                etapa.id === etapaAtual && styles.etapaNomeAtual,
              ]}>
                {etapa.nome}
              </Text>
            </View>
            {etapa.concluida ? (
              <Icon name="check-circle" size={20} color="#51cf66" />
            ) : etapa.id === etapaAtual ? (
              <Icon name="radio-button-checked" size={20} color="#ff6b35" />
            ) : (
              <Icon name="radio-button-unchecked" size={20} color="#adb5bd" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={registrarEtapa}>
          <Icon name="add-task" size={20} color="#fff" />
          <Text style={styles.buttonText}>Registrar Etapa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('Qualidade', { lote: dadosProcessamento.lote })}
        >
          <Icon name="star" size={20} color="#6b46c1" />
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Controle de Qualidade
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  infoLabel: {
    fontSize: 14,
    color: '#636e72',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#2d3436',
    fontWeight: '600',
  },
  statusAtivo: {
    color: '#51cf66',
  },
  condicoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  condicaoItem: {
    alignItems: 'center',
    flex: 1,
  },
  condicaoLabel: {
    fontSize: 12,
    color: '#636e72',
    marginTop: 4,
  },
  condicaoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d3436',
    marginTop: 2,
  },
  etapaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  etapaConcluida: {
    backgroundColor: '#d3f9d8',
    borderColor: '#51cf66',
  },
  etapaAtual: {
    backgroundColor: '#fff4e6',
    borderColor: '#ff6b35',
  },
  etapaContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  etapaNome: {
    fontSize: 16,
    color: '#636e72',
    marginLeft: 12,
  },
  etapaNomeConcluida: {
    color: '#2b8a3e',
    fontWeight: '600',
  },
  etapaNomeAtual: {
    color: '#ff6b35',
    fontWeight: '600',
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6b46c1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6b46c1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#6b46c1',
  },
});

export default DetalhesProcessamentoScreen;
