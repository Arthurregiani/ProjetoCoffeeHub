import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

export default function EdicaoPerfilScreen() {
  const navigation = useNavigation();
  
  // Estado inicial com dados mockados
  const [formData, setFormData] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-9999',
    cpfCnpj: '123.456.789-00',
    dataNascimento: '15/03/1980',
    sexo: 'Masculino',
    rua: 'Rua das Flores, 123',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você faria a chamada para a API para salvar os dados
    Alert.alert(
      'Sucesso',
      'Perfil atualizado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const renderInput = (label, field, placeholder, required = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={styles.input}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          {renderInput('Nome Completo', 'nome', 'Digite seu nome completo', true)}
          {renderInput('E-mail', 'email', 'Digite seu e-mail', true)}
          {renderInput('Telefone', 'telefone', 'Digite seu telefone', true)}
          {renderInput('CPF/CNPJ', 'cpfCnpj', 'Digite seu CPF ou CNPJ')}
          {renderInput('Data de Nascimento', 'dataNascimento', 'DD/MM/AAAA')}
          {renderInput('Sexo', 'sexo', 'Masculino/Feminino/Outro')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço</Text>
          {renderInput('Rua', 'rua', 'Digite o endereço completo')}
          {renderInput('Bairro', 'bairro', 'Digite o bairro')}
          {renderInput('Cidade', 'cidade', 'Digite a cidade')}
          {renderInput('Estado', 'estado', 'Digite o estado')}
          {renderInput('CEP', 'cep', 'Digite o CEP')}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Icon name="save" size={24} color={COLORS.background} />
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  required: {
    color: COLORS.error || '#e74c3c',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

