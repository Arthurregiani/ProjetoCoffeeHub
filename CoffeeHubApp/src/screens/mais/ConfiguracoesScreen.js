import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

export default function ConfiguracoesScreen() {
  const navigation = useNavigation();
  
  // Estados das configurações
  const [modoOffline, setModoOffline] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [idioma, setIdioma] = useState('Português');
  const [tema, setTema] = useState('Claro');

  const handleIdiomaChange = () => {
    Alert.alert(
      'Selecionar Idioma',
      'Escolha o idioma do aplicativo:',
      [
        { text: 'Português', onPress: () => setIdioma('Português') },
        { text: 'Inglês', onPress: () => setIdioma('Inglês') },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const handleTemaChange = () => {
    Alert.alert(
      'Selecionar Tema',
      'Escolha o tema do aplicativo:',
      [
        { text: 'Claro', onPress: () => setTema('Claro') },
        { text: 'Escuro', onPress: () => setTema('Escuro') },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const handleGerenciarDados = () => {
    Alert.alert(
      'Gerenciar Dados',
      'Escolha uma opção:',
      [
        { 
          text: 'Limpar Cache', 
          onPress: () => Alert.alert('Sucesso', 'Cache limpo com sucesso!') 
        },
        { 
          text: 'Exportar Dados', 
          onPress: () => Alert.alert('Info', 'Funcionalidade em desenvolvimento') 
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const handleSobreApp = () => {
    Alert.alert(
      'Sobre o CoffeeHub',
      'CoffeeHub v1.0.0\n\nAplicativo para gestão de propriedades cafeeiras.\n\nDesenvolvido para produtores de café.\n\nTermos de Uso: www.coffeehub.com/termos\nPolítica de Privacidade: www.coffeehub.com/privacidade',
      [{ text: 'OK' }]
    );
  };

  const renderConfigItem = (title, subtitle, onPress, rightComponent) => (
    <TouchableOpacity style={styles.configItem} onPress={onPress}>
      <View style={styles.configItemLeft}>
        <Text style={styles.configItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.configItemSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sincronização</Text>
          {renderConfigItem(
            'Modo Offline',
            'Desativa sincronização automática',
            () => setModoOffline(!modoOffline),
            <Switch
              value={modoOffline}
              onValueChange={setModoOffline}
              trackColor={{ false: COLORS.textSecondary, true: COLORS.primary }}
              thumbColor={COLORS.background}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          {renderConfigItem(
            'Idioma',
            idioma,
            handleIdiomaChange,
            <Icon name="chevron-right" size={24} color={COLORS.textSecondary} />
          )}
          {renderConfigItem(
            'Tema',
            tema,
            handleTemaChange,
            <Icon name="chevron-right" size={24} color={COLORS.textSecondary} />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          {renderConfigItem(
            'Notificações',
            'Receber alertas e lembretes',
            () => setNotificacoes(!notificacoes),
            <Switch
              value={notificacoes}
              onValueChange={setNotificacoes}
              trackColor={{ false: COLORS.textSecondary, true: COLORS.primary }}
              thumbColor={COLORS.background}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados</Text>
          {renderConfigItem(
            'Gerenciar Dados',
            'Limpar cache, exportar dados',
            handleGerenciarDados,
            <Icon name="chevron-right" size={24} color={COLORS.textSecondary} />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          {renderConfigItem(
            'Sobre o Aplicativo',
            'Versão, termos de uso, privacidade',
            handleSobreApp,
            <Icon name="chevron-right" size={24} color={COLORS.textSecondary} />
          )}
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
  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  configItemLeft: {
    flex: 1,
  },
  configItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  configItemSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});

