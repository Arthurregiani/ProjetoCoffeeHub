import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const LoteCard = ({ lote, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.cardTitle}>{lote.codigo}</Text>
    <Text style={styles.cardDetail}>Data de Criação: {lote.dataCriacao}</Text>
    <Text style={styles.cardDetail}>Status: {lote.status}</Text>
  </TouchableOpacity>
);

export default function LotesScreen({ navigation }) {
  const [lotes, setLotes] = useState([
    { 
      id: '1', 
      codigo: 'Lote001', 
      dataCriacao: '2025-06-01', 
      status: 'Processando',
      colheitas: [{
        data: '2025-06-01',
        quantidade: 100,
        metodo: 'Manual',
        talhao: 'Talhao A1',
        equipamento: 'N/A',
        funcionario: 'João Silva'
      }],
      composicao: {
        origem: ['Lote Base 01', 'Lote Base 02'],
        destino: ['Lote Final 01']
      }
    },
    { 
      id: '2', 
      codigo: 'Lote002', 
      dataCriacao: '2025-06-10', 
      status: 'Armazenado',
      colheitas: [{
        data: '2025-06-10',
        quantidade: 150,
        metodo: 'Mecânico',
        talhao: 'Talhao B2',
        equipamento: 'Colheitadeira XYZ',
        funcionario: 'Maria Santos'
      }],
      composicao: {
        origem: ['Lote Base 03'],
        destino: ['Lote Final 02', 'Lote Final 03']
      }
    },
  ]);

  // RF-023: Registrar Colheita
  const registrarColheita = (colheitaData) => {
    console.log('Registrando colheita:', colheitaData);
    // Implementar lógica para vincular colheita a talhão, operação, equipamento e funcionário
  };

  // RF-031: Registrar LoteComposicao
  const registrarLoteComposicao = (composicaoData) => {
    console.log('Registrando composição de lote:', composicaoData);
    // Implementar lógica para vincular lotes de origem e destino
  };

  // RF-024: Gerar Lote a partir de colheita
  const gerarLoteDeColheita = (colheita) => {
    const novoLote = {
      id: Date.now().toString(),
      codigo: `LOTE${Date.now()}`,
      dataCriacao: new Date().toISOString().split('T')[0],
      status: 'Criado',
      colheitas: [colheita],
      composicao: { origem: [], destino: [] }
    };
    setLotes(prev => [...prev, novoLote]);
    console.log('Lote gerado:', novoLote);
  };

  const handleLotePress = (lote) => {
    navigation.navigate('LoteDetalhes', { lote });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lotes</Text>
      <FlatList
        data={lotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LoteCard lote={item} onPress={() => handleLotePress(item)} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  listContent: {
    paddingBottom: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cardDetail: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
});

