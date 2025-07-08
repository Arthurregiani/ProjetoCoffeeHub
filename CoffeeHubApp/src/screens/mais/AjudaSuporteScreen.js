import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/theme';

const faqItems = [
  {
    id: '1',
    question: 'Como cadastrar uma nova propriedade?',
    answer: 'Vá para a aba "Propriedades" e toque no botão "+" para adicionar uma nova propriedade. Preencha todos os campos obrigatórios e salve.'
  },
  {
    id: '2',
    question: 'Como registrar uma aplicação de insumos?',
    answer: 'Na aba "Atividades", selecione "Nova Aplicação" ou use o botão de acesso rápido no Dashboard. Selecione o talhão, insumo e quantidade.'
  },
  {
    id: '3',
    question: 'Como gerar relatórios de produção?',
    answer: 'Acesse a aba "Relatórios", selecione "Produção" e configure os filtros desejados. Você pode exportar o relatório em PDF.'
  },
  {
    id: '4',
    question: 'Como funciona a rastreabilidade?',
    answer: 'Cada atividade gera um código de rastreio. Use o scanner QR na aba "Relatórios" para acessar o histórico completo de um lote.'
  }
];

export default function AjudaSuporteScreen() {
  const navigation = useNavigation();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContact = (type) => {
    switch (type) {
      case 'phone':
        Linking.openURL('tel:+5511999999999');
        break;
      case 'email':
        Linking.openURL('mailto:suporte@coffeehub.com');
        break;
      case 'chat':
        Alert.alert('Chat', 'Funcionalidade de chat em desenvolvimento');
        break;
    }
  };

  const handleSendFeedback = () => {
    if (!feedbackText.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu feedback antes de enviar.');
      return;
    }

    Alert.alert(
      'Feedback Enviado',
      'Obrigado pelo seu feedback! Nossa equipe analisará sua mensagem.',
      [
        {
          text: 'OK',
          onPress: () => setFeedbackText('')
        }
      ]
    );
  };

  const renderFaqItem = (item) => (
    <View key={item.id} style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqQuestion}
        onPress={() => toggleFaq(item.id)}
      >
        <Text style={styles.faqQuestionText}>{item.question}</Text>
        <Icon
          name={expandedFaq === item.id ? "expand-less" : "expand-more"}
          size={24}
          color={COLORS.textSecondary}
        />
      </TouchableOpacity>
      {expandedFaq === item.id && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{item.answer}</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.background} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajuda e Suporte</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
          {faqItems.map(renderFaqItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tutoriais</Text>
          <TouchableOpacity style={styles.tutorialItem}>
            <Icon name="play-circle-outline" size={24} color={COLORS.primary} />
            <Text style={styles.tutorialText}>Como começar a usar o CoffeeHub</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tutorialItem}>
            <Icon name="play-circle-outline" size={24} color={COLORS.primary} />
            <Text style={styles.tutorialText}>Gerenciando propriedades e talhões</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tutorialItem}>
            <Icon name="play-circle-outline" size={24} color={COLORS.primary} />
            <Text style={styles.tutorialText}>Registrando atividades</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContact('phone')}
          >
            <Icon name="phone" size={24} color={COLORS.primary} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Telefone</Text>
              <Text style={styles.contactSubtitle}>(11) 99999-9999</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContact('email')}
          >
            <Icon name="email" size={24} color={COLORS.primary} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>E-mail</Text>
              <Text style={styles.contactSubtitle}>suporte@coffeehub.com</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContact('chat')}
          >
            <Icon name="chat" size={24} color={COLORS.primary} />
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Chat Online</Text>
              <Text style={styles.contactSubtitle}>Atendimento em tempo real</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enviar Feedback</Text>
          <TextInput
            style={styles.feedbackInput}
            value={feedbackText}
            onChangeText={setFeedbackText}
            placeholder="Descreva sua sugestão, problema ou dúvida..."
            placeholderTextColor={COLORS.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendFeedback}>
            <Icon name="send" size={20} color={COLORS.background} />
            <Text style={styles.sendButtonText}>Enviar Feedback</Text>
          </TouchableOpacity>
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
  faqItem: {
    marginBottom: 10,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  faqAnswer: {
    paddingTop: 10,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },
  faqAnswerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  tutorialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  tutorialText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginLeft: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  contactInfo: {
    marginLeft: 15,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  contactSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
    marginBottom: 15,
    minHeight: 100,
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

