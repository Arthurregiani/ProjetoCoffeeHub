import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

export default function LoteDetalhesScreen({ route }) {
  const { lote } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes do Lote</Text>
      <Text style={styles.detail}>Código: {lote.codigo}</Text>
      <Text style={styles.detail}>Data de Criação: {lote.dataCriacao}</Text>
      <Text style={styles.detail}>Status: {lote.status}</Text>
      
      <Text style={styles.subtitle}>Colheitas</Text>
      {lote.colheitas && lote.colheitas.map((colheita, index) => (
        <View key={index} style={styles.colheitaContainer}>
          <Text style={styles.colheita}>Data: {colheita.data}</Text>
          <Text style={styles.colheita}>Quantidade: {colheita.quantidade} sacas</Text>
          <Text style={styles.colheita}>Método: {colheita.metodo}</Text>
          <Text style={styles.colheita}>Talhão: {colheita.talhao}</Text>
          <Text style={styles.colheita}>Equipamento: {colheita.equipamento}</Text>
          <Text style={styles.colheita}>Funcionário: {colheita.funcionario}</Text>
        </View>
      ))}

      <Text style={styles.subtitle}>Composição</Text>
      {lote.composicao && (
        <View>
          <Text style={styles.composition}>Origem: {lote.composicao.origem.join(', ') || 'Nenhuma'}</Text>
          <Text style={styles.composition}>Destino: {lote.composicao.destino.join(', ') || 'Nenhum'}</Text>
        </View>
      )}
    </ScrollView>
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
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  detail: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: SIZES.margin / 2,
  },
  subtitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin / 2,
  },
  composition: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin / 4,
  },
  colheitaContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginBottom: SIZES.margin / 2,
  },
  colheita: {
    fontSize: SIZES.body,
    color: COLORS.text,
    marginBottom: 2,
  },
});

