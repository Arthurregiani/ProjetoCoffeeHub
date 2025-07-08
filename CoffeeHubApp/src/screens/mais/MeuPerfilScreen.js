import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

// Dados mockados do usuário - em um app real, viriam de uma API ou estado global
const userData = {
  nome: 'João Silva',
  email: 'joao.silva@email.com',
  telefone: '(11) 99999-9999',
  cpfCnpj: '123.456.789-00',
  dataNascimento: '15/03/1980',
  sexo: 'Masculino',
  endereco: {
    rua: 'Rua das Flores, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567'
  }
};

export default function MeuPerfilScreen() {
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
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EdicaoPerfil')}>
          <Icon name="edit" size={28} color={COLORS.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="person" size={60} color={COLORS.textSecondary} />
          </View>
          <Text style={styles.userName}>{userData.nome}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          {renderInfoItem('Nome Completo', userData.nome)}
          {renderInfoItem('E-mail', userData.email)}
          {renderInfoItem('Telefone', userData.telefone)}
          {renderInfoItem('CPF/CNPJ', userData.cpfCnpj)}
          {renderInfoItem('Data de Nascimento', userData.dataNascimento)}
          {renderInfoItem('Sexo', userData.sexo)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          {renderInfoItem('Rua', userData.endereco.rua)}
          {renderInfoItem('Bairro', userData.endereco.bairro)}
          {renderInfoItem('Cidade', userData.endereco.cidade)}
          {renderInfoItem('Estado', userData.endereco.estado)}
          {renderInfoItem('CEP', userData.endereco.cep)}
        </View>
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
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
});

