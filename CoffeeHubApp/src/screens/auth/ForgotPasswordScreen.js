import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES, SHADOWS, SPACING, ACCESSIBILITY } from '../../constants/theme';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = () => {
    // Validação básica
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    setIsLoading(true);

    // Simular envio de e-mail de recuperação
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'E-mail Enviado',
        'Se o e-mail informado estiver cadastrado, você receberá instruções para redefinir sua senha.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    }, 2000);
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={handleBackToLogin} 
            style={styles.backButton}
            accessibilityLabel="Voltar para login"
            accessibilityRole="button"
          >
            <Icon name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recuperar Senha</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Conteúdo principal */}
        <View style={styles.content}>
          {/* Ícone */}
          <View style={styles.iconContainer}>
            <View style={styles.iconPlaceholder}>
              <Icon name="lock-reset" size={60} color={COLORS.primary} />
            </View>
          </View>

          <Text style={styles.title}>Esqueceu a senha?</Text>
          <Text style={styles.subtitle}>
            Não se preocupe! Digite seu e-mail abaixo e enviaremos instruções para redefinir sua senha.
          </Text>

          {/* Formulário */}
          <Card style={styles.formCard} shadow="medium">
            <Input
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              disabled={isLoading}
              leftIcon={<Icon name="email" size={20} color={COLORS.textSecondary} />}
              accessibilityLabel="Campo de e-mail"
              accessibilityHint="Digite seu endereço de e-mail para recuperar a senha"
            />

            <Button
              title={isLoading ? "Enviando..." : "Enviar Instruções"}
              onPress={handleResetPassword}
              disabled={isLoading}
              loading={isLoading}
              style={styles.resetButton}
              accessibilityLabel="Enviar instruções de recuperação"
            />
          </Card>

          {/* Informações adicionais */}
          <Card style={styles.infoCard} shadow="small">
            <View style={styles.infoHeader}>
              <Icon name="info" size={20} color={COLORS.info} />
              <Text style={styles.infoTitle}>Informações importantes</Text>
            </View>
            <Text style={styles.infoText}>
              Verifique sua caixa de entrada e pasta de spam. O e-mail pode levar alguns minutos para chegar.
            </Text>
          </Card>

          {/* Link para voltar ao Login */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Lembrou da senha?</Text>
            <Button
              title="Fazer Login"
              variant="ghost"
              size="small"
              onPress={handleBackToLogin}
              style={styles.loginButton}
              accessibilityLabel="Voltar para tela de login"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.sm,
  },
  backButton: {
    padding: SPACING.sm,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.surface,
    ...SHADOWS.small,
    minHeight: ACCESSIBILITY.touchTarget.minHeight,
    minWidth: ACCESSIBILITY.touchTarget.minWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.h3,
  },
  headerSpacer: {
    width: ACCESSIBILITY.touchTarget.minWidth,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.sm,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  iconPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryOpacity,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.h2,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
    paddingHorizontal: SPACING.sm,
  },
  formCard: {
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: SIZES.radiusLarge,
  },
  resetButton: {
    marginTop: SPACING.md,
  },
  infoCard: {
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderRadius: SIZES.radiusLarge,
    backgroundColor: COLORS.surface,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.sm,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  infoText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  loginText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  loginButton: {
    marginLeft: SPACING.xs,
  },
});

