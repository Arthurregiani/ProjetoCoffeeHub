import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

export default function CadastroConjugeScreen() {
  const navigation = useNavigation();
  
  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    dataNascimento: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validação básica
    if (!formData.nome || !formData.telefone || !formData.cpf || !formData.dataNascimento) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Aqui você faria a chamada para a API para salvar os dados
    Alert.alert(
      'Sucesso',
      'Dados do cônjuge salvos com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const renderInput = (label, field, placeholder, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label} *</Text>
      <TextInput
        style={styles.input}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar Cônjuge</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="favorite" size={60} color={COLORS.textSecondary} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Cônjuge</Text>
          {renderInput('Nome', 'nome', 'Digite o nome completo')}
          {renderInput('Telefone', 'telefone', '(11) 99999-9999', 'phone-pad')}
          {renderInput('CPF', 'cpf', '000.000.000-00', 'numeric')}
          {renderInput('Data de Nascimento', 'dataNascimento', 'DD/MM/AAAA')}
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

