import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, ScrollView, Dimensions, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES, SHADOWS, SPACING, ACCESSIBILITY } from '../../constants/theme';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    
    // Simular autenticação
    Alert.alert(
      'Login',
      'Login realizado com sucesso!',
      [
        {
          text: 'OK',
          onPress: () => navigation.replace('MainTabs')
        }
      ]
    );
  };

  const handleSkipAuth = () => {
    Alert.alert(
      'Modo Desenvolvimento',
      'Entrando sem autenticação para desenvolvimento.',
      [
        {
          text: 'OK',
          onPress: () => navigation.replace('MainTabs')
        }
      ]
    );
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header com gradiente visual */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Icon name="local-cafe" size={60} color={COLORS.primary} />
            </View>
            <Text style={styles.appName}>CoffeeHub</Text>
            <Text style={styles.tagline}>Gestão Inteligente de Café</Text>
          </View>
        </View>

        {/* Formulário de Login */}
        <Card style={styles.formCard} shadow="large">
          <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          <Input
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Icon name="email" size={20} color={COLORS.textSecondary} />}
            accessibilityLabel="Campo de e-mail"
            accessibilityHint="Digite seu endereço de e-mail"
          />

          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry={true}
            leftIcon={<Icon name="lock" size={20} color={COLORS.textSecondary} />}
            accessibilityLabel="Campo de senha"
            accessibilityHint="Digite sua senha"
          />

          <Button
            title="Esqueceu a senha?"
            variant="ghost"
            size="small"
            onPress={handleForgotPassword}
            style={styles.forgotPasswordButton}
            accessibilityLabel="Esqueceu a senha"
          />

          <Button
            title="Entrar"
            onPress={handleLogin}
            style={styles.loginButton}
            accessibilityLabel="Fazer login"
            accessibilityHint="Toque para fazer login na aplicação"
          />

          <Button
            title="Entrar sem autenticação (Dev)"
            variant="outline"
            size="small"
            onPress={handleSkipAuth}
            style={styles.skipAuthButton}
            icon={<Icon name="developer-mode" size={16} color={COLORS.primary} />}
            accessibilityLabel="Modo desenvolvedor"
          />
        </Card>

        {/* Link para Cadastro */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem uma conta?</Text>
          <Button
            title="Cadastre-se"
            variant="ghost"
            size="small"
            onPress={handleRegister}
            style={styles.registerButton}
            accessibilityLabel="Criar nova conta"
          />
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
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primaryOpacity,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  appName: {
    fontSize: SIZES.h1,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.h1,
  },
  tagline: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  formCard: {
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: SIZES.radiusLarge,
  },
  welcomeText: {
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
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.sm,
  },
  loginButton: {
    marginBottom: SPACING.md,
  },
  skipAuthButton: {
    marginBottom: SPACING.md,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  registerText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  registerButton: {
    marginLeft: SPACING.xs,
  },
});
