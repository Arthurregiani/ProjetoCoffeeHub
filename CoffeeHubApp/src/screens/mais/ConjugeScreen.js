import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

// Dados mockados do cônjuge - em um app real, viriam de uma API
const conjuge = {
  nome: 'Maria Silva',
  telefone: '(11) 88888-8888',
  cpf: '987.654.321-00',
  dataNascimento: '20/05/1985'
};

// Para simular quando não há cônjuge cadastrado, mude para null
const hasConjuge = true;

export default function ConjugeScreen() {
  const navigation = useNavigation();

  const renderInfoItem = (label, value) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cônjuge</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroConjuge')}>
          <Icon name={hasConjuge ? "edit" : "add"} size={28} color={COLORS.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {hasConjuge ? (
          <>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Icon name="favorite" size={60} color={COLORS.textSecondary} />
              </View>
              <Text style={styles.conjueName}>{conjuge.nome}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações do Cônjuge</Text>
              {renderInfoItem('Nome', conjuge.nome)}
              {renderInfoItem('Telefone', conjuge.telefone)}
              {renderInfoItem('CPF', conjuge.cpf)}
              {renderInfoItem('Data de Nascimento', conjuge.dataNascimento)}
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="favorite-border" size={80} color={COLORS.textSecondary} />
            <Text style={styles.emptyTitle}>Nenhum cônjuge cadastrado</Text>
            <Text style={styles.emptyDescription}>
              Cadastre as informações do seu cônjuge para manter os dados atualizados.
            </Text>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => navigation.navigate('CadastroConjuge')}
            >
              <Icon name="add" size={24} color={COLORS.background} />
              <Text style={styles.addButtonText}>Cadastrar Cônjuge</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
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
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  content: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  conjueName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

