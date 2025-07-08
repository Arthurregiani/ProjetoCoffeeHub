# Guia de Configuração do Ambiente React Native para CoffeeHub

Este guia detalha os passos necessários para configurar seu ambiente de desenvolvimento e iniciar o projeto CoffeeHub React Native em sua máquina local. Seguiremos as melhores práticas para garantir uma instalação suave e eficiente.

## 1. Pré-requisitos Essenciais

Para desenvolver aplicativos React Native, você precisará de algumas ferramentas fundamentais. Certifique-se de que seu sistema atenda aos seguintes requisitos:

### 1.1. Node.js e npm (Node Package Manager)

O Node.js é um ambiente de tempo de execução JavaScript que permite executar código JavaScript fora de um navegador. O npm é o gerenciador de pacotes padrão para o Node.js e é usado para instalar bibliotecas e dependências para seus projetos React Native.

**Recomendação:** É altamente recomendável instalar a versão LTS (Long Term Support) mais recente do Node.js. No momento da escrita deste guia, a versão LTS recomendada é a 20.x ou superior. Você pode baixar o instalador diretamente do site oficial do Node.js [1].

**Instalação:**

*   **Windows e macOS:** Baixe o instalador `.msi` (Windows) ou `.pkg` (macOS) do site oficial do Node.js e siga as instruções do assistente de instalação. O npm será instalado automaticamente junto com o Node.js.

*   **Linux (Ubuntu/Debian):** Você pode usar o `nvm` (Node Version Manager) para gerenciar múltiplas versões do Node.js, o que é uma prática recomendada para desenvolvedores. Alternativamente, você pode usar o gerenciador de pacotes do sistema:

    ```bash
    # Atualizar o índice de pacotes
    sudo apt update

    # Instalar Node.js e npm
    sudo apt install nodejs npm
    ```

**Verificação da Instalação:**

Após a instalação, abra seu terminal ou prompt de comando e execute os seguintes comandos para verificar se o Node.js e o npm foram instalados corretamente:

```bash
node --version
npm --version
```

Você deverá ver as versões instaladas do Node.js e do npm, respectivamente. Por exemplo:

```
v20.12.2
10.5.0
```

### 1.2. Java Development Kit (JDK)

O React Native, especialmente para o desenvolvimento Android, requer o Java Development Kit (JDK). O JDK é um kit de desenvolvimento de software que permite compilar e executar aplicativos Java. O Android Studio, que será abordado na próxima seção, depende do JDK para construir seus aplicativos Android.

**Recomendação:** Para o desenvolvimento React Native, o JDK 11 ou superior é geralmente recomendado. Versões mais recentes do JDK também são compatíveis, mas é importante verificar a compatibilidade com a versão específica do React Native que você estará usando.

**Instalação:**

*   **Windows:** Você pode baixar o instalador do OpenJDK (uma implementação de código aberto do JDK) de sites como Adoptium (Eclipse Temurin) [2] ou Oracle. Siga as instruções de instalação.

*   **macOS:** Use o Homebrew para instalar o OpenJDK:

    ```bash
    brew install openjdk@11
    sudo ln -sfn /usr/local/opt/openjdk@11/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
    ```

*   **Linux (Ubuntu/Debian):**

    ```bash
    sudo apt update
    sudo apt install openjdk-11-jdk
    ```

**Verificação da Instalação:**

Para verificar se o JDK foi instalado corretamente, execute o seguinte comando no seu terminal:

```bash
java -version
```

Você deverá ver a versão do Java instalada. Por exemplo:

```
openjdk version "11.0.22" 2024-01-16
OpenJDK Runtime Environment (build 11.0.22+7-Ubuntu-0ubuntu22.04.1)
OpenJDK 64-Bit Server VM (build 11.0.22+7-Ubuntu-0ubuntu22.04.1, mixed mode, sharing)
```

### 1.3. Android Studio (para Desenvolvimento Android)

O Android Studio é o ambiente de desenvolvimento integrado (IDE) oficial para o desenvolvimento de aplicativos Android. Ele inclui o Android SDK (Software Development Kit), que é essencial para construir, testar e depurar aplicativos React Native para Android. Mesmo que você não vá escrever código Java/Kotlin diretamente, o React Native utiliza as ferramentas do SDK para compilar seu aplicativo.

**Instalação:**

1.  **Baixe o Android Studio:** Acesse o site oficial do Android Studio [3] e baixe a versão mais recente para o seu sistema operacional.

2.  **Instale o Android Studio:** Siga as instruções do instalador. Durante a instalação, o Android Studio o guiará através da instalação dos componentes essenciais do Android SDK, incluindo:
    *   **Android SDK Platform:** A versão mais recente da plataforma Android.
    *   **Android SDK Build-Tools:** Ferramentas necessárias para construir seu aplicativo.
    *   **Android Virtual Device (AVD):** Para criar e gerenciar emuladores Android.

3.  **Configurar Variáveis de Ambiente:** Após a instalação, é crucial configurar a variável de ambiente `ANDROID_HOME` e adicionar os diretórios `platform-tools` e `emulator` ao seu `PATH`. Isso permite que o React Native CLI e outras ferramentas encontrem os componentes do SDK.

    *   **Windows:**
        1.  Abra as Propriedades do Sistema (Pesquise por "Variáveis de Ambiente").
        2.  Clique em "Variáveis de Ambiente...".
        3.  Em "Variáveis do sistema", clique em "Novo..." para `ANDROID_HOME` e defina o valor para o caminho do seu SDK (geralmente `C:\Users\SeuUsuario\AppData\Local\Android\Sdk`).
        4.  Edite a variável `Path` e adicione `%ANDROID_HOME%\platform-tools` e `%ANDROID_HOME%\emulator`.

    *   **macOS e Linux:** Adicione as seguintes linhas ao seu arquivo de configuração do shell (por exemplo, `~/.bashrc`, `~/.zshrc` ou `~/.profile`). Lembre-se de substituir `/path/to/your/sdk` pelo caminho real do seu SDK (geralmente `~/Library/Android/sdk` no macOS e `~/Android/Sdk` no Linux).

        ```bash
        export ANDROID_HOME=$HOME/Android/Sdk
        export PATH=$PATH:$ANDROID_HOME/emulator
        export PATH=$PATH:$ANDROID_HOME/tools
        export PATH=$PATH:$ANDROID_HOME/tools/bin
        export PATH=$PATH:$ANDROID_HOME/platform-tools
        ```
        Após adicionar essas linhas, salve o arquivo e recarregue seu terminal (ou abra um novo) para que as mudanças tenham efeito:
        ```bash
        source ~/.bashrc  # ou ~/.zshrc, ~/.profile
        ```

4.  **Instalar Componentes do SDK (dentro do Android Studio):**
    *   Abra o Android Studio.
    *   Vá em `Tools > SDK Manager`.
    *   Na aba `SDK Platforms`, selecione a versão mais recente do Android (por exemplo, Android 14.0 - Upside Down Cake) e certifique-se de que "Android SDK Platform" esteja marcado.
    *   Na aba `SDK Tools`, marque as seguintes opções:
        *   `Android SDK Build-Tools` (a versão mais recente)
        *   `Android SDK Command-line Tools (latest)`
        *   `Android Emulator`
        *   `Android SDK Platform-Tools`
    *   Clique em "Apply" para instalar os componentes selecionados.

### 1.4. Xcode (para Desenvolvimento iOS - Apenas macOS)

Se você planeja desenvolver para iOS, precisará de um computador macOS e do Xcode, o IDE da Apple para desenvolvimento iOS/macOS. O Xcode inclui o iOS SDK e as ferramentas necessárias para construir e executar aplicativos iOS.

**Instalação:**

1.  **Baixe o Xcode:** O Xcode pode ser baixado gratuitamente na Mac App Store [4]. A instalação pode levar um tempo considerável devido ao seu tamanho.

2.  **Instalar Ferramentas de Linha de Comando do Xcode:** Após a instalação do Xcode, abra o terminal e execute o seguinte comando para instalar as ferramentas de linha de comando:

    ```bash
    xcode-select --install
    ```

3.  **Configurar o Xcode:** Abra o Xcode, vá em `Xcode > Preferences > Locations` e selecione a versão mais recente das "Command Line Tools".

## 2. Instalação do React Native CLI

Com todos os pré-requisitos configurados, o próximo passo é instalar o React Native Command Line Interface (CLI). O React Native CLI é uma ferramenta que permite criar novos projetos React Native, executar comandos para construir e executar seus aplicativos, e gerenciar dependências.

**Instalação Global:**

Abra seu terminal ou prompt de comando e execute o seguinte comando para instalar o React Native CLI globalmente. Isso o tornará disponível em qualquer diretório do seu sistema.

```bash
npm install -g @react-native-community/cli
```

**Verificação da Instalação:**

Para verificar se o React Native CLI foi instalado corretamente, você pode tentar criar um novo projeto (o que faremos na próxima seção) ou verificar a versão do CLI:

```bash
npx react-native --version
```

Você deverá ver a versão do `@react-native-community/cli` instalada.

## Referências

[1] Node.js. *Download Node.js*. Disponível em: [https://nodejs.org/](https://nodejs.org/). Acesso em: 7 jul. 2025.

[2] Adoptium. *Eclipse Temurin*. Disponível em: [https://adoptium.net/](https://adoptium.net/). Acesso em: 7 jul. 2025.

[3] Android Developers. *Android Studio*. Disponível em: [https://developer.android.com/studio](https://developer.android.com/studio). Acesso em: 7 jul. 2025.

[4] Apple Developer. *Xcode*. Disponível em: [https://developer.apple.com/xcode/](https://developer.apple.com/xcode/). Acesso em: 7 jul. 2025.





## 3. Inicialização do Projeto React Native

Com o ambiente de desenvolvimento configurado, o próximo passo é criar o projeto React Native que servirá como base para o aplicativo CoffeeHub. Utilizaremos o React Native CLI para ter controle total sobre a estrutura e as configurações do projeto.

### 3.1. Criando o Projeto CoffeeHub

Para criar um novo projeto React Native, abra seu terminal ou prompt de comando e navegue até o diretório onde você deseja que o projeto seja criado. Em seguida, execute o seguinte comando:

```bash
npx react-native@latest init CoffeeHubApp
```

*   **`npx`**: É uma ferramenta do npm que permite executar pacotes Node.js sem a necessidade de instalá-los globalmente. Isso garante que você sempre use a versão mais recente do `react-native` CLI para inicializar o projeto.
*   **`react-native@latest`**: Especifica que queremos usar a versão mais recente do pacote `react-native`.
*   **`init CoffeeHubApp`**: Este comando inicializa um novo projeto React Native com o nome `CoffeeHubApp`. Um novo diretório com esse nome será criado, contendo toda a estrutura inicial do projeto.

Após executar o comando, o processo de criação pode levar alguns minutos, pois ele baixará as dependências necessárias e configurará o projeto. Você pode ser solicitado a confirmar a instalação de alguns pacotes; digite `y` e pressione Enter para prosseguir.

### 3.2. Verificando a Criação do Projeto

Após a conclusão do comando `init`, navegue para o diretório do projeto recém-criado:

```bash
cd CoffeeHubApp
```

Para verificar se o projeto foi criado corretamente e se as dependências básicas estão funcionando, você pode tentar executar o aplicativo em um emulador ou dispositivo conectado. Certifique-se de ter um emulador Android rodando (via Android Studio AVD Manager) ou um dispositivo Android/iOS conectado e configurado para depuração.

*   **Para Android:**
    ```bash
npx react-native run-android
    ```

*   **Para iOS (apenas em macOS):**
    ```bash
npx react-native run-ios
    ```

Esses comandos irão construir o aplicativo e instalá-lo no emulador/dispositivo, abrindo o Metro Bundler (servidor de desenvolvimento do React Native) em uma nova janela do terminal. Se tudo estiver configurado corretamente, você verá a tela de boas-vindas do React Native no seu emulador/dispositivo.

## 4. Estrutura de Pastas e Organização do Projeto

Uma boa estrutura de pastas é fundamental para a manutenibilidade e escalabilidade de um projeto. Com base na `Árvore de Fluxo de Navegação Detalhada - CoffeeHub.md` que você forneceu, vamos organizar o projeto de forma lógica e modular. A ideia é separar as telas, componentes, serviços e configurações para facilitar o desenvolvimento e a colaboração.

### 4.1. Estrutura de Diretórios Proposta

Abaixo está a estrutura de diretórios que você deve criar dentro do seu projeto `CoffeeHubApp`. O diretório `src/` será o coração do seu código-fonte.

```
CoffeeHubApp/
├── android/                # Arquivos nativos Android
├── ios/                    # Arquivos nativos iOS
├── node_modules/           # Dependências do projeto
├── src/                    # Código-fonte do aplicativo
│   ├── assets/             # Imagens, fontes, ícones, etc.
│   │   ├── images/
│   │   └── fonts/
│   ├── components/         # Componentes reutilizáveis (UI, formulários, etc.)
│   │   ├── common/        # Componentes genéricos (Botões, Inputs, Cards)
│   │   ├── auth/          # Componentes específicos de autenticação
│   │   ├── dashboard/     # Componentes específicos do dashboard
│   │   └── forms/         # Componentes de formulário reutilizáveis
│   ├── constants/          # Constantes (cores, tamanhos, URLs de API, etc.)
│   ├── navigation/         # Configuração de navegação (rotas, stacks, drawers)
│   ├── screens/            # Telas principais do aplicativo
│   │   ├── auth/          # Telas de autenticação (Login, Cadastro, Recuperação)
│   │   ├── dashboard/     # Tela principal do Dashboard
│   │   ├── propriedades/  # Telas relacionadas a Propriedades (Lista, Detalhes, Formulário)
│   │   ├── atividades/    # Telas relacionadas a Atividades
│   │   ├── relatorios/    # Telas relacionadas a Relatórios
│   │   └── mais/          # Telas do menu "Mais" (Perfil, Funcionários, etc.)
│   ├── services/           # Serviços de API, autenticação, etc.
│   ├── utils/              # Funções utilitárias, helpers
│   ├── hooks/              # Custom Hooks (se usar React Hooks avançados)
│   ├── contexts/           # Contextos React (para gerenciamento de estado global)
│   └── types/              # Definições de tipos (se usar TypeScript)
├── App.js                  # Componente raiz do aplicativo
├── index.js                # Ponto de entrada do aplicativo
├── package.json            # Metadados e dependências do projeto
├── .gitignore              # Arquivos e diretórios a serem ignorados pelo Git
└── ...                     # Outros arquivos de configuração
```

### 4.2. Criando os Diretórios

Você pode criar essa estrutura de diretórios manualmente ou usando comandos no terminal. Navegue até o diretório `CoffeeHubApp` e execute os seguintes comandos:

```bash
cd CoffeeHubApp
mkdir -p src/assets/{images,fonts}
mkdir -p src/components/{common,auth,dashboard,forms}
mkdir -p src/constants
mkdir -p src/navigation
mkdir -p src/screens/{auth,dashboard,propriedades,atividades,relatorios,mais}
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/hooks
mkdir -p src/contexts
mkdir -p src/types
```

Essa estrutura inicial fornecerá uma base sólida para organizar seu código de forma limpa e modular, seguindo a lógica da árvore de navegação do CoffeeHub.




## 5. Configuração da Navegação Principal

O aplicativo CoffeeHub utilizará o `React Navigation` para gerenciar a navegação entre as diferentes telas. A estrutura de navegação detalhada que você forneceu indica a necessidade de uma `Bottom Navigation Bar` para as seções principais (Dashboard, Propriedades, Atividades, Relatórios, Mais) e um `Drawer Navigator` para o menu lateral, além de um `Stack Navigator` para o fluxo de autenticação.

### 5.1. Instalação das Dependências de Navegação

Primeiro, navegue até o diretório raiz do seu projeto `CoffeeHubApp` e instale as bibliotecas necessárias para o React Navigation:

```bash
cd CoffeeHubApp
npm install @react-navigation/native @react-navigation/stack @react-navigation/drawer @react-navigation/bottom-tabs
```

Além disso, o React Navigation depende de algumas bibliotecas nativas para um desempenho otimizado. Instale-as também:

```bash
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
```

Para iOS, você também precisará instalar os `pods` (gerenciador de dependências nativas para iOS). Navegue até o diretório `ios` e execute `pod install`:

```bash
cd ios && pod install && cd ..
```

### 5.2. Configuração Adicional para Bibliotecas Nativas

Algumas bibliotecas requerem configurações adicionais para funcionar corretamente em ambas as plataformas:

*   **`react-native-gesture-handler`**: Adicione a seguinte linha no topo do seu arquivo `index.js` (o ponto de entrada do seu aplicativo), antes de qualquer outra importação:

    ```javascript
    import 'react-native-gesture-handler';
    ```

*   **`react-native-reanimated`**: No arquivo `babel.config.js` na raiz do seu projeto, adicione o plugin `react-native-reanimated/plugin` no final da lista de plugins. Seu `babel.config.js` deve ficar parecido com isto:

    ```javascript
    module.exports = {
      presets: ['module:@react-native/babel-preset'],
      plugins: [
        'react-native-reanimated/plugin',
      ],
    };
    ```

*   **`react-native-vector-icons`**: Para Android, adicione a seguinte linha no final do arquivo `android/app/build.gradle` (antes do `apply from: 


```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

### 5.3. Criando o Navegador Principal (`AppNavigator.js`)

Crie o arquivo `src/navigation/AppNavigator.js`. Este arquivo será responsável por orquestrar a navegação entre o fluxo de autenticação e o fluxo principal do aplicativo. Ele também lidará com a lógica de verificação de autenticação inicial.

```javascript
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para simular autenticação
import Icon from 'react-native-vector-icons/MaterialIcons';

// Importe suas telas aqui
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import PropriedadesScreen from '../screens/propriedades/PropriedadesScreen';
import AtividadesScreen from '../screens/atividades/AtividadesScreen';
import RelatoriosScreen from '../screens/relatorios/RelatoriosScreen';
import MoreMenuScreen from '../screens/mais/MoreMenuScreen';

// Importe as constantes de tema
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Navegação principal com Bottom Tabs
function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // O Drawer Navigator já terá um header
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { backgroundColor: COLORS.surface },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Propriedades') {
            iconName = 'landscape';
          } else if (route.name === 'Atividades') {
            iconName = 'work';
          } else if (route.name === 'Relatórios') {
            iconName = 'bar-chart';
          } else if (route.name === 'Mais') {
            iconName = 'more-horiz';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Propriedades" component={PropriedadesScreen} />
      <Tab.Screen name="Atividades" component={AtividadesScreen} />
      <Tab.Screen name="Relatórios" component={RelatoriosScreen} />
      <Tab.Screen name="Mais" component={MoreMenuScreen} />
    </Tab.Navigator>
  );
}

// Navegação principal com Drawer (menu lateral)
function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.background,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen name="Home" component={MainTabsNavigator} options={{ title: 'CoffeeHub' }} />
      {/* Adicione outras telas que podem ser acessadas diretamente pelo Drawer aqui, se necessário */}
    </Drawer.Navigator>
  );
}

// Navegação de Autenticação
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

// Navegador principal da aplicação
export default function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simula a verificação de um token JWT armazenado
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {userToken == null ? <AuthStack /> : <MainDrawerNavigator />}
    </NavigationContainer>
  );
}
```

### 5.4. Modificando `App.js`

O arquivo `App.js` na raiz do seu projeto deve ser simplificado para apenas renderizar o `AppNavigator` que acabamos de criar. Substitua o conteúdo existente de `App.js` pelo seguinte:

```javascript
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return <AppNavigator />;
}
```

### 5.5. Implementando a Tela de Splash/Carregamento Inicial

Crie o arquivo `src/screens/SplashScreen.js`. Esta tela será exibida enquanto o aplicativo verifica o status de autenticação do usuário.

```javascript
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Você pode adicionar um logo aqui */}
      {/* <Image source={require('../assets/images/coffeehub_logo.png')} style={styles.logo} /> */}
      <Text style={styles.title}>CoffeeHub</Text>
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.indicator} />
      <Text style={styles.subtitle}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: SIZES.margin * 2,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.margin,
  },
  indicator: {
    marginTop: SIZES.margin * 2,
  },
});
```

### 5.6. Implementando o Fluxo de Autenticação

#### 5.6.1. Tela de Login (`LoginScreen.js`)

Crie o arquivo `src/screens/auth/LoginScreen.js`. Esta tela será o ponto de entrada para usuários existentes.

```javascript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, SIZES } from '../../constants/theme';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulação de autenticação (substituir por chamada real à API)
    if (email === 'test@example.com' && password === 'password') {
      await AsyncStorage.setItem('userToken', 'mock-jwt-token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainDrawerNavigator' }], // Nome da rota principal no AppNavigator
      });
    } else {
      Alert.alert('Erro de Login', 'Email ou senha inválidos.');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>CoffeeHub</Text>
          <Text style={styles.subtitle}>Sistema de Rastreabilidade para Cafeicultura</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.link}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Primeiro acesso? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.margin / 2,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  form: {
    width: '100%',
  },
  input: {
    height: SIZES.inputHeight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.margin,
    fontSize: SIZES.body,
  },
  button: {
    height: SIZES.buttonHeight,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
  link: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: SIZES.margin,
    fontSize: SIZES.body,
  },
});
```

#### 5.6.2. Tela de Recuperação de Senha (`ForgotPasswordScreen.js`)

Crie o arquivo `src/screens/auth/ForgotPasswordScreen.js`.

```javascript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { COLORS, SIZES } from '../../constants/theme';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    // Simulação de envio de email (substituir por chamada real à API)
    if (email) {
      Alert.alert('Sucesso', 'Um link de recuperação de senha foi enviado para o seu email.');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Por favor, insira seu email.');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recuperar Senha</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.instructionText}>
            Informe seu email cadastrado para receber um link de recuperação de senha.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email cadastrado"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Enviando...' : 'Enviar link de recuperação'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SIZES.margin,
  },
  headerTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: SIZES.padding * 2,
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  input: {
    height: SIZES.inputHeight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.margin,
    fontSize: SIZES.body,
  },
  button: {
    height: SIZES.buttonHeight,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
});
```

#### 5.6.3. Tela de Cadastro (`RegisterScreen.js`)

Crie o arquivo `src/screens/auth/RegisterScreen.js`.

```javascript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

import { COLORS, SIZES } from '../../constants/theme';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpfCnpj: '',
    phone: '',
    birthDate: '',
    gender: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    // Simulação de registro (substituir por chamada real à API e validação robusta)
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Erro de Cadastro', 'As senhas não coincidem.');
      setLoading(false);
      return;
    }
    if (!formData.fullName || !formData.email || !formData.password || !formData.cpfCnpj) {
      Alert.alert('Erro de Cadastro', 'Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    // Aqui você faria a chamada à API de registro
    console.log('Dados de registro:', formData);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login para continuar.');
    navigation.navigate('Login');
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cadastre-se</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.subtitle}>Crie sua conta no CoffeeHub</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              value={formData.confirmPassword}
              onChangeText={(text) => handleChange('confirmPassword', text)}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="CPF/CNPJ"
              value={formData.cpfCnpj}
              onChangeText={(text) => handleChange('cpfCnpj', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={formData.phone}
              onChangeText={(text) => handleChange('phone', text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              value={formData.birthDate}
              onChangeText={(text) => handleChange('birthDate', text)}
              keyboardType="numeric"
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.gender}
                onValueChange={(itemValue) => handleChange('gender', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Sexo" value="" />
                <Picker.Item label="Masculino" value="Masculino" />
                <Picker.Item label="Feminino" value="Feminino" />
                <Picker.Item label="Outro" value="Outro" />
              </Picker>
            </View>

            <Text style={styles.sectionTitle}>Endereço</Text>
            <TextInput
              style={styles.input}
              placeholder="Rua"
              value={formData.street}
              onChangeText={(text) => handleChange('street', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Número"
              value={formData.number}
              onChangeText={(text) => handleChange('number', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Bairro"
              value={formData.neighborhood}
              onChangeText={(text) => handleChange('neighborhood', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              value={formData.city}
              onChangeText={(text) => handleChange('city', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Estado (UF)"
              value={formData.state}
              onChangeText={(text) => handleChange('state', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="CEP"
              value={formData.zipCode}
              onChangeText={(text) => handleChange('zipCode', text)}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SIZES.margin,
  },
  headerTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: SIZES.padding * 2,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  form: {
    width: '100%',
  },
  input: {
    height: SIZES.inputHeight,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.margin,
    fontSize: SIZES.body,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
  },
  picker: {
    height: SIZES.inputHeight,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
    marginTop: SIZES.margin,
  },
  button: {
    height: SIZES.buttonHeight,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  buttonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
  link: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: SIZES.margin,
    fontSize: SIZES.body,
  },
});
```

### 5.7. Implementando a Tela de Dashboard (`DashboardScreen.js`)

Crie o arquivo `src/screens/dashboard/DashboardScreen.js`. Esta será a tela inicial após o login, exibindo um resumo das informações.

```javascript
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { LineChart, BarChart } from 'react-native-chart-kit'; // Descomente se for usar gráficos

import { COLORS, SIZES } from '../../constants/theme';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen({ navigation }) {
  const [dashboardData, setDashboardData] = useState({
    totalProdutores: 0,
    totalPropriedades: 0,
    totalTalhoes: 0,
    totalInsumos: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Simular dados (substituir por chamadas reais à API)
      setDashboardData({
        totalProdutores: 25,
        totalPropriedades: 45,
        totalTalhoes: 120,
        totalInsumos: 85,
      });

      // Implementação real:
      // const [produtores, propriedades, talhoes, insumos] = await Promise.all([
      //   api.get('/produtores/'),
      //   api.get('/propriedades/'),
      //   api.get('/talhoes/'),
      //   api.get('/insumos/'),
      // ]);

      // setDashboardData({
      //   totalProdutores: produtores.data.length,
      //   totalPropriedades: propriedades.data.length,
      //   totalTalhoes: talhoes.data.length,
      //   totalInsumos: insumos.data.length,
      // });
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    }
  };

  // const chartConfig = { // Descomente se for usar gráficos
  //   backgroundColor: COLORS.primary,
  //   backgroundGradientFrom: COLORS.primary,
  //   backgroundGradientTo: COLORS.primaryLight,
  //   decimalPlaces: 0,
  //   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   style: {
  //     borderRadius: SIZES.radius,
  //   },
  // };

  // const productionData = { // Descomente se for usar gráficos
  //   labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //       strokeWidth: 2,
  //     },
  //   ],
  // };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Visão geral da sua produção</Text>
      </View>

      {/* Cards de resumo */}
      <View style={styles.cardsContainer}>
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: COLORS.primary }]}
            onPress={() => navigation.navigate('Propriedades')}
          >
            <Text style={styles.cardNumber}>{dashboardData.totalProdutores}</Text>
            <Text style={styles.cardLabel}>Produtores</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: COLORS.secondary }]}
            onPress={() => navigation.navigate('Propriedades')}
          >
            <Text style={styles.cardNumber}>{dashboardData.totalPropriedades}</Text>
            <Text style={styles.cardLabel}>Propriedades</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: COLORS.accent }]}
            onPress={() => navigation.navigate('Propriedades')}
          >
            <Text style={styles.cardNumber}>{dashboardData.totalTalhoes}</Text>
            <Text style={styles.cardLabel}>Talhões</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: COLORS.success }]}
            onPress={() => navigation.navigate('Propriedades')}
          >
            <Text style={styles.cardNumber}>{dashboardData.totalInsumos}</Text>
            <Text style={styles.cardLabel}>Insumos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Gráfico de produção (descomente e instale react-native-chart-kit se for usar) */}
      {/*
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Produção Mensal (sacas)</Text>
        <LineChart
          data={productionData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
      */}

      {/* Ações rápidas */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert('Ação', 'Nova Atividade')}
          >
            <Text style={styles.actionText}>Nova Atividade</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert('Ação', 'Registrar Colheita')}
          >
            <Text style={styles.actionText}>Registrar Colheita</Text>
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
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  cardsContainer: {
    padding: SIZES.padding,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.margin,
  },
  card: {
    flex: 1,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cardNumber: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  cardLabel: {
    fontSize: SIZES.body,
    color: COLORS.background,
    marginTop: 4,
  },
  chartContainer: {
    padding: SIZES.padding,
  },
  chartTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  chart: {
    borderRadius: SIZES.radius,
  },
  quickActions: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.primaryLight,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionText: {
    color: COLORS.background,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
});
```

### 5.8. Implementando Telas Vazias para Navegação

Para que a navegação funcione, precisamos de arquivos para todas as telas referenciadas no `AppNavigator.js` e na `Árvore de Fluxo de Navegação Detalhada`. Crie os seguintes arquivos com um conteúdo mínimo. Você os preencherá com a lógica e UI mais tarde.

*   `src/screens/propriedades/PropriedadesScreen.js`
    ```javascript
    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import { COLORS, SIZES } from '../../constants/theme';

    export default function PropriedadesScreen() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Propriedades</Text>
          <Text style={styles.subtitle}>Lista de propriedades e gestão</Text>
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
      },
      title: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.text,
      },
      subtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        marginTop: 4,
      },
    });
    ```

*   `src/screens/atividades/AtividadesScreen.js`
    ```javascript
    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import { COLORS, SIZES } from '../../constants/theme';

    export default function AtividadesScreen() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Atividades</Text>
          <Text style={styles.subtitle}>Registro e acompanhamento de atividades</Text>
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
      },
      title: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.text,
      },
      subtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        marginTop: 4,
      },
    });
    ```

*   `src/screens/relatorios/RelatoriosScreen.js`
    ```javascript
    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import { COLORS, SIZES } from '../../constants/theme';

    export default function RelatoriosScreen() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Relatórios</Text>
          <Text style={styles.subtitle}>Visualização de dados e análises</Text>
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
      },
      title: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.text,
      },
      subtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        marginTop: 4,
      },
    });
    ```

*   `src/screens/mais/MoreMenuScreen.js`
    ```javascript
    import React from 'react';
    import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { COLORS, SIZES } from '../../constants/theme';

    export default function MoreMenuScreen() {
      const navigation = useNavigation();

      const handleLogout = () => {
        // Lógica de logout
        // await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }], // Volta para a tela de login
        });
      };

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Mais Opções</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Navegação', 'Meu Perfil')}> 
            <Text style={styles.menuItemText}>Meu Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert('Navegação', 'Funcionários')}> 
            <Text style={styles.menuItemText}>Funcionários</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={[styles.menuItemText, styles.logoutText]}>Sair</Text>
          </TouchableOpacity>
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
        marginBottom: SIZES.margin * 2,
      },
      menuItem: {
        paddingVertical: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
      },
      menuItemText: {
        fontSize: SIZES.body,
        color: COLORS.text,
      },
      logoutText: {
        color: COLORS.error,
        fontWeight: 'bold',
      },
    });
    ```

### 5.9. Criando o Arquivo de Constantes de Tema (`theme.js`)

Crie o arquivo `src/constants/theme.js`. Este arquivo centralizará as definições de cores, tamanhos de fonte, espaçamentos e outras propriedades de estilo, garantindo consistência visual em todo o aplicativo.

```javascript
export const COLORS = {
  // Cores primárias (tons de verde e marrom)
  primary: '#2E7D32',      // Verde escuro
  primaryLight: '#4CAF50', // Verde claro
  secondary: '#5D4037',    // Marrom
  secondaryLight: '#8D6E63', // Marrom claro
  
  // Cores de destaque
  accent: '#FF9800',       // Laranja
  accentLight: '#FFB74D',  // Laranja claro
  
  // Cores neutras
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  
  // Estados
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

export const SIZES = {
  // Tamanhos de fonte
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  body: 16,
  caption: 14,
  small: 12,
  
  // Espaçamentos
  padding: 16,
  margin: 16,
  radius: 8,
  
  // Dimensões
  buttonHeight: 48,
  inputHeight: 48,
  headerHeight: 60,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};
```

### 5.10. Criando o Arquivo de Serviço de API (`api.js`)

Crie o arquivo `src/services/api.js`. Este arquivo configurará o Axios para fazer requisições HTTP ao seu backend e incluirá um interceptor para lidar com tokens JWT.

```javascript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure a URL base da API (ajuste conforme necessário)
const BASE_URL = 'http://localhost:8000/api'; // Exemplo: ajuste para a URL do seu backend Django

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT às requisições
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken'); // Use 'userToken' conforme definido no AppNavigator
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros (ex: token expirado)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido, fazer logout
      await AsyncStorage.removeItem('userToken');
      // Você pode adicionar uma lógica para redirecionar para a tela de login aqui
      // Ex: navigation.navigate('Login'); (se tiver acesso ao objeto navigation)
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 5.11. Criando o Arquivo de Serviço de Autenticação (`authService.js`)

Crie o arquivo `src/services/authService.js`. Este serviço encapsulará a lógica de autenticação, incluindo login, logout e verificação de status de autenticação.

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

class AuthService {
  async login(email, password) {
    try {
      // Simulação de login. Substitua pela chamada real à API do seu backend.
      // const response = await api.post('/auth/login/', { email, password });
      // const { token } = response.data;

      // Para fins de demonstração, um token mockado:
      const token = 'mock-jwt-token-12345'; 

      await AsyncStorage.setItem('userToken', token);
      return { success: true, token };
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      return { success: false, error: error.response?.data?.detail || 'Falha no login' };
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('userToken');
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error.message);
      return { success: false, error: 'Falha ao fazer logout' };
    }
  }

  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      // Em uma aplicação real, você também validaria a expiração do token aqui
      return !!token;
    } catch (error) {
      console.error('Authentication check failed:', error.message);
      return false;
    }
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      console.error('Failed to get token:', error.message);
      return null;
    }
  }
}

export default new AuthService();
```

## Referências

[1] Node.js. *Download Node.js*. Disponível em: [https://nodejs.org/](https://nodejs.org/). Acesso em: 7 jul. 2025.

[2] Adoptium. *Eclipse Temurin*. Disponível em: [https://adoptium.net/](https://adoptium.net/). Acesso em: 7 jul. 2025.

[3] Android Developers. *Android Studio*. Disponível em: [https://developer.android.com/studio](https://developer.android.com/studio). Acesso em: 7 jul. 2025.

[4] Apple Developer. *Xcode*. Disponível em: [https://developer.apple.com/xcode/](https://developer.apple.com/xcode/). Acesso em: 7 jul. 2025.

[5] React Navigation. *Getting Started*. Disponível em: [https://reactnavigation.org/docs/getting-started/](https://reactnavigation.org/docs/getting-started/). Acesso em: 7 jul. 2025.

[6] React Native Community. *AsyncStorage*. Disponível em: [https://react-native-async-storage.github.io/async-storage/docs/usage](https://react-native-async-storage.github.io/async-storage/docs/usage). Acesso em: 7 jul. 2025.

[7] Axios. *Getting Started*. Disponível em: [https://axios-http.com/docs/intro](https://axios-http.com/docs/intro). Acesso em: 7 jul. 2025.

[8] React Native Vector Icons. *Installation*. Disponível em: [https://github.com/oblador/react-native-vector-icons#installation](https://github.com/oblador/react-native-vector-icons#installation). Acesso em: 7 jul. 2025.





## 6. Esboçando a Implementação das Demais Seções

Com a estrutura de navegação principal e o fluxo de autenticação configurados, você tem uma base sólida para construir as demais seções do aplicativo CoffeeHub. A `Árvore de Fluxo de Navegação Detalhada` é um excelente guia para entender as telas e suas interações. Para cada seção, o processo geral envolverá:

1.  **Criação das Telas:** Crie os arquivos `.js` para cada tela dentro do diretório `src/screens/` correspondente (ex: `src/screens/propriedades/ListaPropriedadesScreen.js`).
2.  **Definição dos Componentes:** Identifique os componentes reutilizáveis (formulários, listas, cards) e crie-os em `src/components/`.
3.  **Integração com a Navegação:** Adicione as novas telas aos navegadores apropriados (Stack, Tab, Drawer) no `src/navigation/AppNavigator.js`.
4.  **Conexão com a API:** Utilize o `src/services/api.js` para fazer as chamadas ao backend e o `src/services/authService.js` para gerenciar a autenticação.
5.  **Gerenciamento de Estado:** Use o React Context API (em `src/contexts/`) ou outras soluções de gerenciamento de estado para compartilhar dados entre as telas.

### 6.1. Seção Propriedades

Esta seção gerenciará as propriedades rurais, talhões, áreas de preservação, CAR e produção anual. As telas principais incluem:

*   **Lista de Propriedades:** Exibe todas as propriedades cadastradas com opções de busca, filtro e ordenação.
*   **Detalhes da Propriedade:** Mostra informações detalhadas de uma propriedade, incluindo abas para talhões, áreas de preservação, CAR, produção anual e documentos.
*   **Cadastro/Edição de Propriedade:** Formulário para adicionar ou editar informações de uma propriedade.
*   **Detalhes do Talhão:** Informações específicas de um talhão, com histórico de atividades.
*   **Cadastro/Edição de Talhão:** Formulário para adicionar ou editar talhões.

**Exemplo de Estrutura de Código para `src/screens/propriedades/ListaPropriedadesScreen.js`:**

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
// import api from '../../services/api'; // Descomente quando for integrar com a API

// Componente de Card de Propriedade (exemplo)
const PropertyCard = ({ property, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(property.id)}>
    <Text style={styles.cardTitle}>{property.name}</Text>
    <Text style={styles.cardSubtitle}>{property.location}</Text>
    <View style={styles.cardInfo}>
      <Icon name="area-chart" size={16} color={COLORS.textSecondary} />
      <Text style={styles.cardInfoText}>{property.area} ha</Text>
    </View>
    <View style={styles.cardInfo}>
      <Icon name="grass" size={16} color={COLORS.textSecondary} />
      <Text style={styles.cardInfoText}>{property.talhoes} Talhões</Text>
    </View>
  </TouchableOpacity>
);

export default function PropriedadesScreen() {
  const navigation = useNavigation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      // Simulação de dados
      const mockData = [
        { id: '1', name: 'Fazenda Esperança', location: 'Minas Gerais', area: 150, talhoes: 10 },
        { id: '2', name: 'Sítio Café da Serra', location: 'São Paulo', area: 80, talhoes: 5 },
        { id: '3', name: 'Chácara Boa Vista', location: 'Espírito Santo', area: 200, talhoes: 12 },
      ];
      setProperties(mockData);
      // Implementação real:
      // const response = await api.get('/propriedades/');
      // setProperties(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as propriedades.');
      console.error('Erro ao carregar propriedades:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyPress = (propertyId) => {
    navigation.navigate('DetalhesPropriedade', { propertyId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Propriedades</Text>
        <TouchableOpacity onPress={() => Alert.alert('Busca', 'Funcionalidade de busca')}> 
          <Icon name="search" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Carregando propriedades...</Text>
      ) : (
        <FlatList
          data={properties}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PropertyCard property={item} onPress={handlePropertyPress} />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CadastroPropriedade')}
      >
        <Icon name="add" size={24} color={COLORS.background} />
      </TouchableOpacity>
    </View>
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
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  listContent: {
    padding: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    elevation: 2, // Sombra para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin / 2,
  },
  cardSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin / 2,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.margin / 4,
  },
  cardInfoText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginLeft: SIZES.margin / 4,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: SIZES.margin * 2,
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: SIZES.padding,
    bottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
```

### 6.2. Seção Atividades

Esta seção centraliza o registro e acompanhamento de todas as atividades agrícolas, como aplicações, colheitas, monitoramentos, irrigação e manejo. As telas principais incluem:

*   **Tela Principal de Atividades:** Com abas para diferentes categorias de atividades (Monitoramento, Insumos, Produção, Qualidade, Recursos, Financeiro).
*   **Lista de Atividades:** Exibe atividades filtradas por categoria.
*   **Telas de Registro:** Formulários específicos para cada tipo de atividade (Nova Aplicação, Nova Colheita, Monitoramento, etc.).
*   **Telas de Detalhes:** Exibição detalhada de uma atividade específica.

**Exemplo de Estrutura de Código para `src/screens/atividades/AtividadesScreen.js` (Tela Principal de Atividades com Tabs):**

```javascript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../constants/theme';

const Tab = createMaterialTopTabNavigator();

// Telas de exemplo para cada aba
const MonitoramentoTab = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Lista de Monitoramentos</Text>
  </View>
);
const InsumosTab = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Lista de Atividades de Insumos</Text>
  </View>
);
const ProducaoTab = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Lista de Atividades de Produção</Text>
  </View>
);
const QualidadeTab = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Lista de Atividades de Qualidade</Text>
  </View>
);
const RecursosTab = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Lista de Atividades de Recursos</Text>
  </View>
);
const FinanceiroTab = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Lista de Operações Financeiras</Text>
  </View>
);

export default function AtividadesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Atividades</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
          tabBarStyle: { backgroundColor: COLORS.surface },
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: 'auto' },
        }}
      >
        <Tab.Screen name="Monitoramento" component={MonitoramentoTab} />
        <Tab.Screen name="Insumos" component={InsumosTab} />
        <Tab.Screen name="Produção" component={ProducaoTab} />
        <Tab.Screen name="Qualidade" component={QualidadeTab} />
        <Tab.Screen name="Recursos" component={RecursosTab} />
        <Tab.Screen name="Financeiro" component={FinanceiroTab} />
      </Tab.Navigator>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => Alert.alert('Nova Atividade', 'Abrir menu para selecionar tipo de atividade')}
      >
        <Icon name="add" size={24} color={COLORS.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  tabText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: SIZES.padding,
    bottom: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
```

### 6.3. Seção Relatórios

Esta seção oferece visualizações e análises de dados, incluindo rastreabilidade, produção, qualidade, financeiro e estoque de insumos. As telas principais incluem:

*   **Tela Principal de Relatórios:** Grid de categorias de relatório e atalhos para relatórios recentes.
*   **Tela de Visualização de Relatório:** Exibe gráficos e tabelas com filtros e opções de exportação.
*   **Tela de Detalhes de Rastreabilidade (QR Code):** Exibe informações detalhadas de um lote, talhão ou propriedade, com linha do tempo de eventos e opção de gerar QR Code.

**Exemplo de Estrutura de Código para `src/screens/relatorios/RelatoriosScreen.js`:**

```javascript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';

const ReportCard = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.reportCard} onPress={onPress}>
    <Icon name={icon} size={40} color={COLORS.primary} />
    <Text style={styles.reportCardTitle}>{title}</Text>
  </TouchableOpacity>
);

export default function RelatoriosScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Relatórios</Text>
        <TouchableOpacity onPress={() => Alert.alert('Filtro', 'Abrir filtros de período/data')}> 
          <Icon name="filter-list" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.reportGrid}>
        <ReportCard
          title="Rastreabilidade"
          icon="track-changes"
          onPress={() => navigation.navigate('DetalhesRastreabilidade')}
        />
        <ReportCard
          title="Produção"
          icon="local-cafe"
          onPress={() => Alert.alert('Relatório', 'Visualizar relatório de Produção')}
        />
        <ReportCard
          title="Qualidade"
          icon="star"
          onPress={() => Alert.alert('Relatório', 'Visualizar relatório de Qualidade')}
        />
        <ReportCard
          title="Financeiro"
          icon="attach-money"
          onPress={() => Alert.alert('Relatório', 'Visualizar relatório Financeiro')}
        />
        <ReportCard
          title="Estoque de Insumos"
          icon="inventory"
          onPress={() => Alert.alert('Relatório', 'Visualizar relatório de Estoque de Insumos')}
        />
        <ReportCard
          title="Desempenho"
          icon="trending-up"
          onPress={() => Alert.alert('Relatório', 'Visualizar relatório de Desempenho')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scanner QR</Text>
        <TouchableOpacity
          style={styles.qrScannerButton}
          onPress={() => Alert.alert('Scanner QR', 'Abrir câmera para escanear QR Code')}
        >
          <Icon name="qr-code-scanner" size={30} color={COLORS.background} />
          <Text style={styles.qrScannerButtonText}>Escanear QR Code</Text>
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
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  reportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: SIZES.padding,
  },
  reportCard: {
    width: '45%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.margin,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  reportCardTitle: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.margin / 2,
    textAlign: 'center',
  },
  section: {
    padding: SIZES.padding,
    marginTop: SIZES.margin,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  qrScannerButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrScannerButtonText: {
    color: COLORS.background,
    fontSize: SIZES.body,
    fontWeight: 'bold',
    marginLeft: SIZES.margin / 2,
  },
});
```

### 6.4. Seção Mais (Menu Adicional)

Esta seção agrupa funcionalidades diversas, como perfil do usuário, gestão de cônjuge, funcionários, equipamentos, insumos, certificações, indicadores de desempenho, operações financeiras, capacitações, ajuda e configurações. As telas principais incluem:

*   **Tela de Menu "Mais":** Lista de links para as subseções.
*   **Telas de Gestão:** Formulários e listas para cada entidade (Meu Perfil, Cônjuge, Funcionários, Equipamentos, etc.).
*   **Telas de Configurações e Ajuda:** Opções de configuração do aplicativo e acesso a suporte.

**Exemplo de Estrutura de Código para `src/screens/mais/MoreMenuScreen.js` (já fornecido anteriormente, mas com mais itens de menu):**

```javascript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SIZES } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuItem = ({ title, onPress, isLogout = false }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={[styles.menuItemText, isLogout && styles.logoutText]}>{title}</Text>
  </TouchableOpacity>
);

export default function MoreMenuScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            navigation.reset({
              index: 0,
              routes: [{ name: 'AuthStack' }], // Volta para a tela de login
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mais Opções</Text>
      </View>

      <View style={styles.menuList}>
        <MenuItem title="Meu Perfil" onPress={() => Alert.alert('Navegação', 'Navegar para Meu Perfil')} />
        <MenuItem title="Cônjuge" onPress={() => Alert.alert('Navegação', 'Navegar para Cônjuge')} />
        <MenuItem title="Funcionários" onPress={() => Alert.alert('Navegação', 'Navegar para Funcionários')} />
        <MenuItem title="Equipamentos" onPress={() => Alert.alert('Navegação', 'Navegar para Equipamentos')} />
        <MenuItem title="Insumos" onPress={() => Alert.alert('Navegação', 'Navegar para Insumos')} />
        <MenuItem title="Estoque de Insumos" onPress={() => Alert.alert('Navegação', 'Navegar para Estoque de Insumos')} />
        <MenuItem title="Variedades de Café" onPress={() => Alert.alert('Navegação', 'Navegar para Variedades de Café')} />
        <MenuItem title="Certificações" onPress={() => Alert.alert('Navegação', 'Navegar para Certificações')} />
        <MenuItem title="Indicadores de Desempenho" onPress={() => Alert.alert('Navegação', 'Navegar para Indicadores de Desempenho')} />
        <MenuItem title="Operações Financeiras" onPress={() => Alert.alert('Navegação', 'Navegar para Operações Financeiras')} />
        <MenuItem title="Capacitações" onPress={() => Alert.alert('Navegação', 'Navegar para Capacitações')} />
        <MenuItem title="Ajuda e Suporte" onPress={() => Alert.alert('Navegação', 'Navegar para Ajuda e Suporte')} />
        <MenuItem title="Configurações" onPress={() => Alert.alert('Navegação', 'Navegar para Configurações')} />
        <MenuItem title="Sobre o App" onPress={() => Alert.alert('Navegação', 'Navegar para Sobre o App')} />
        <MenuItem title="Sair" onPress={handleLogout} isLogout={true} />
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
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  menuList: {
    padding: SIZES.padding,
  },
  menuItem: {
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemText: {
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  logoutText: {
    color: COLORS.error,
    fontWeight: 'bold',
  },
});
```

### 6.5. Considerações Adicionais para Implementação

*   **Validação de Formulários:** Para formulários mais complexos, considere usar bibliotecas como `Formik` e `Yup` para validação de esquema. Isso garantirá que os dados inseridos pelo usuário estejam corretos antes de serem enviados ao backend.
*   **Gerenciamento de Estado Global:** Para dados que precisam ser acessados por várias telas (ex: informações do usuário logado, configurações globais), o React Context API (ou Redux/Zustand para projetos maiores) é uma boa escolha. Crie contextos em `src/contexts/`.
*   **Componentes Reutilizáveis:** Sempre que identificar um padrão de UI (botões, inputs, cards, modais), crie um componente reutilizável em `src/components/common/` para promover a consistência e reduzir a duplicação de código.
*   **Integração com Backend:** Lembre-se de substituir os dados mockados (`mockData`) e as simulações de API pelas chamadas reais ao seu backend Django, utilizando o serviço `api.js`.
*   **Estilização:** Mantenha a consistência visual utilizando as constantes definidas em `src/constants/theme.js`.
*   **Testes:** À medida que você implementa as funcionalidades, considere escrever testes unitários para seus componentes e testes de integração para os fluxos de navegação e chamadas de API. Bibliotecas como `Jest` e `React Native Testing Library` são excelentes para isso.

Este guia fornece uma base sólida para você começar a construir as seções restantes do seu aplicativo CoffeeHub. Lembre-se de consultar a `Árvore de Fluxo de Navegação Detalhada` para cada tela e funcionalidade específica.




## 7. Integração do Conceito 'Produtor = Usuário' e Atualização das Telas

Com base nos novos requisitos, o conceito de que o 'Produtor é o próprio Usuário' será integrado ao fluxo de autenticação e perfil. Isso significa que o cadastro do usuário já incluirá todas as informações necessárias para identificá-lo como produtor (RF-001). Além disso, as telas e interfaces serão atualizadas para atender aos requisitos detalhados fornecidos.

### 7.1. Atualização da Tela de Cadastro (`RegisterScreen.js`)

A tela de cadastro (`src/screens/auth/RegisterScreen.js`) já foi projetada para coletar a maioria dos dados do produtor (Nome Completo, E-mail, Senha, CPF/CNPJ, Telefone, Data de Nascimento, Sexo, Endereço). Certifique-se de que todos os campos relevantes para o `RF-001 - Cadastro Produtor` estejam presentes e com validações adequadas. Se houver campos adicionais no RF-001 que não estão no `RegisterScreen.js` atual, você deve adicioná-los.

**Exemplo de campos adicionais a considerar (se não estiverem já presentes):**

*   `Inscrição Estadual`
*   `Número do CCIR`
*   `Tamanho do Módulo Fiscal`
*   `Condição de Uso da Terra`
*   `Data de Aquisição da Propriedade Principal` (se o produtor já tiver uma propriedade principal no cadastro inicial)

Você pode adicionar esses campos ao formulário e à lógica de `formData` e `handleChange` no `RegisterScreen.js`.

### 7.2. Atualização da Estrutura de Navegação Principal (Bottom Tabs)

A estrutura de navegação principal deve ser ajustada para refletir as novas seções: Dashboard, Propriedades, Talhões, Produção e Mais. O `AppNavigator.js` e a `MainTabsNavigator` precisarão ser atualizados para incluir a nova ordem e as novas telas.

**Modifique `src/navigation/AppNavigator.js` na função `MainTabsNavigator`:**

```javascript
// ... imports existentes

// Importe as novas telas
import TalhoesScreen from "../screens/talhoes/TalhoesScreen";
import ProducaoScreen from "../screens/producao/ProducaoScreen";

// ... Stack, Drawer, Tab definitions

function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: { backgroundColor: COLORS.surface },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Propriedades') {
            iconName = 'landscape';
          } else if (route.name === 'Talhões') { // Nova seção
            iconName = 'grass';
          } else if (route.name === 'Produção') { // Nova seção
            iconName = 'local-cafe';
          } else if (route.name === 'Mais') {
            iconName = 'more-horiz';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Propriedades" component={PropriedadesScreen} />
      <Tab.Screen name="Talhões" component={TalhoesScreen} /> {/* Adicione esta linha */}
      <Tab.Screen name="Produção" component={ProducaoScreen} /> {/* Adicione esta linha */}
      <Tab.Screen name="Mais" component={MoreMenuScreen} />
    </Tab.Navigator>
  );
}

// ... restante do AppNavigator.js
```

**Crie os arquivos para as novas telas vazias:**

*   `src/screens/talhoes/TalhoesScreen.js`
    ```javascript
    import React from 'react';
    import { View, Text, StyleSheet } from 'react-native';
    import { COLORS, SIZES } from '../../constants/theme';

    export default function TalhoesScreen() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Talhões</Text>
          <Text style={styles.subtitle}>Gestão de talhões da propriedade</Text>
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
      },
      title: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.text,
      },
      subtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        marginTop: 4,
      },
    });
    ```

*   `src/screens/producao/ProducaoScreen.js`
    ```javascript
    import React from 'react';
    import { View, Text, StyleSheet }n    from 'react-native';
    import { COLORS, SIZES } from '../../constants/theme';

    export default function ProducaoScreen() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Produção</Text>
          <Text style={styles.subtitle}>Registro e acompanhamento da produção</Text>
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
      },
      title: {
        fontSize: SIZES.h2,
        fontWeight: 'bold',
        color: COLORS.text,
      },
      subtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        marginTop: 4,
      },
    });
    ```

### 7.3. Atualização da Tela de Dashboard (`DashboardScreen.js`)

A tela de Dashboard (`src/screens/dashboard/DashboardScreen.js`) deve ser atualizada para incluir os novos indicadores e alertas conforme o `pasted_content.txt` (RF-049, RF-050, RNF-010). Isso envolverá a adição de novos cards, gráficos ou seções para exibir:

*   Volume estimado de produção atual por propriedade
*   Talhões ativos na safra
*   Status climático (com integração meteorológica - INT-001)
*   Alertas de vencimento de insumos, falhas de operação ou pendências
*   Acesso direto a relatórios e rastreabilidade de lotes

Você pode adicionar componentes de `Text` e `View` para representar esses indicadores inicialmente, e depois integrar com dados reais do backend e bibliotecas de gráficos (como `react-native-chart-kit` que foi comentado no exemplo anterior) conforme o desenvolvimento avança.

### 7.4. Esboço das Telas para Módulos de Cadastros (RF-001 a RF-008, RF-015, RF-016, RF-041)

Para cada entidade (produtor, propriedade, talhão, equipamento, etc.), você precisará de:

*   **Tela de Listagem:** Exibindo itens com filtros e busca. Use `FlatList` para renderizar as listas.
*   **Tela de Detalhes:** Exibindo informações completas de um item, possivelmente com abas para organizar informações relacionadas (histórico, vínculos).
*   **Tela de Cadastro/Edição:** Formulários para criar ou modificar itens. Utilize `TextInput`, `Picker`, `DatePicker` e outros componentes de formulário.

**Exemplo de Estrutura para uma Tela de Detalhes (ex: `src/screens/propriedades/DetalhesPropriedadeScreen.js`):**

```javascript
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DetalhesPropriedadeScreen({ navigation }) {
  const route = useRoute();
  const { propertyId } = route.params; // Recebe o ID da propriedade

  // Simulação de dados da propriedade (substituir por chamada à API)
  const property = {
    id: propertyId,
    name: 'Fazenda Exemplo ' + propertyId,
    location: 'Minas Gerais, Brasil',
    area: 250,
    talhoes: 15,
    status: 'Ativa',
    // ... outros dados do RF-003
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{property.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroPropriedade', { propertyId: property.id })}>
          <Icon name="edit" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Visão Geral</Text>
        <Text style={styles.detailText}>Localização: {property.location}</Text>
        <Text style={styles.detailText}>Área Total: {property.area} ha</Text>
        <Text style={styles.detailText}>Status: {property.status}</Text>
        {/* Adicione mais detalhes do RF-003 aqui */}

        <Text style={styles.sectionTitle}>Talhões</Text>
        {/* Lista de talhões (RF-004) - FlatList ou mapeamento */}
        <Text style={styles.detailText}>Talhões cadastrados: {property.talhoes}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ListaTalhoes', { propertyId: property.id })}>
          <Text style={styles.linkText}>Ver Talhões</Text>
        </TouchableOpacity>

        {/* Adicione outras seções como Áreas de Preservação, CAR, Produção Anual, Documentos */}

      </ScrollView>
    </View>
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
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SIZES.margin,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin / 2,
  },
  detailText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin / 4,
  },
  linkText: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    marginTop: SIZES.margin / 2,
  },
});
```

### 7.5. Esboço das Telas para Ciclo e Monitoramento (RF-010 a RF-014)

Para cada tipo de evento (Estágio Fenológico, Clima, Irrigação, Manejo), crie telas de formulário com campos específicos e a capacidade de associar a talhões, funcionários, equipamentos e operações financeiras. Considere o uso de componentes de data/hora e campos numéricos.

### 7.6. Esboço das Telas para Recursos (Equipamentos e Equipes) (RF-015 a RF-017)

Crie telas para cadastro, listagem e visualização de detalhes de equipamentos e equipes de mão de obra. Inclua campos para histórico de uso e vinculação de funcionários às equipes.

### 7.7. Esboço das Telas para Insumos e Aplicações (RF-018 a RF-022)

Desenvolva telas para gestão de insumos (listagem, detalhes, cadastro/edição) com indicadores de estoque e vencimento. Crie formulários para registro de aplicações, com fluxo guiado e geração de código de rastreio.

### 7.8. Esboço das Telas para Produção e Processamento (RF-023 a RF-031)

Implemente telas para registro de colheitas, criação e gestão de lotes (com QR Code), e visualização sequencial das etapas de processamento (preparo, secagem, beneficiamento, armazenamento). Utilize componentes de linha do tempo para o status do ciclo produtivo.

### 7.9. Esboço das Telas para Qualidade e Comercialização (RF-032 a RF-036)

Crie telas para classificação física e perfil sensorial de lotes, histórico de movimentações e registros de venda. Inclua campos para certificações exigidas.

### 7.10. Esboço das Telas para Rastreabilidade (RF-037, RF-038, RF-045 a RF-048)

Desenvolva interfaces para leitura e consulta via QR Code, exibição da cadeia completa de produção por lote e visualização interativa por timeline ou grafo.

### 7.11. Esboço das Telas para Financeiro e Recursos Humanos (RF-040 a RF-044)

Implemente telas para registro de operações financeiras, cadastro e histórico de funcionários, e registro de capacitações. Inclua visualização de indicadores de desempenho com gráficos.

### 7.12. Diretrizes para Requisitos de Interface e Técnicos (RNF-001 a RNF-010)

Ao desenvolver as telas, mantenha em mente os seguintes requisitos não-funcionais:

*   **Responsividade:** Utilize `Flexbox` e `Dimensions` para garantir que a interface se adapte a diferentes tamanhos de tela (smartphones e tablets).
*   **Modo Offline:** Para funcionalidades críticas, implemente cache local de dados e sincronização posterior com o backend (RNF-001). O `AsyncStorage` é útil para isso.
*   **Acessibilidade:** Use tamanhos de fonte legíveis (definidos em `SIZES`), contraste adequado (definido em `COLORS`) e botões com áreas de toque grandes.
*   **Múltiplos Idiomas:** Estruture seu aplicativo para suportar internacionalização (RNF-007). Bibliotecas como `react-native-localize` e `i18n-js` podem ser úteis.
*   **Autenticação por Perfil:** Embora o produtor seja o usuário principal, o sistema deve ser capaz de lidar com diferentes perfis (admin, operador, analista, cliente) se necessário no futuro. A lógica de autorização deve ser implementada no backend e consumida pelo frontend.
*   **Validação e Erros:** Utilize validação de formulários (ex: `Formik` + `Yup`) e exiba mensagens de erro claras para o usuário.
*   **Geração de QR Codes:** Implemente a funcionalidade de geração de QR Codes para rastreabilidade (RF-037).

### 7.13. Diretrizes para Integrações Visuais (INT-001, INT-002)

*   **Integração Meteorológica (INT-001):** Para preenchimento automático de dados climáticos, você pode usar uma API de clima externa. No frontend, isso significaria fazer uma requisição HTTP para essa API com base na localização da propriedade/talhão e preencher os campos do formulário automaticamente.
*   **Integração com Mapas (INT-002):** Para geolocalização de propriedades e talhões, utilize bibliotecas de mapas como `react-native-maps`. Isso permitirá exibir mapas interativos e marcar pontos de interesse.

### 7.14. Entregáveis Esperados

Para o seu TCC, os entregáveis esperados incluem:

*   **Protótipos Navegáveis de Alta Fidelidade:** Embora não seja o foco da implementação de código, ter protótipos em ferramentas como Figma ou Adobe XD é crucial para o design de UX/UI.
*   **Design System:** Um documento ou biblioteca de componentes que defina a paleta de cores, tipografia, estilos de botões, campos, tabelas, ícones e componentes reutilizáveis. O arquivo `src/constants/theme.js` é o início do seu Design System.
*   **Arquitetura de Navegação:** Fluxogramas de interação por módulo, como a `Árvore de Fluxo de Navegação Detalhada` que você forneceu.
*   **Documento Descritivo de Padrões de UX e Guidelines de Acessibilidade:** Detalhando as decisões de design e como os requisitos não-funcionais de interface foram atendidos.

Este guia atualizado fornece uma visão abrangente das próximas etapas para o desenvolvimento do seu aplicativo CoffeeHub, integrando os novos requisitos e detalhando a implementação das telas e interfaces. Lembre-se de criar os arquivos e pastas conforme a estrutura proposta e preencher o conteúdo de cada tela com base nas funcionalidades descritas.




## 8. Testando o Fluxo de Autenticação e as Novas Telas

Com as alterações implementadas, é crucial testar o fluxo de autenticação e a navegação para as novas telas para garantir que tudo está funcionando conforme o esperado. Lembre-se que, por enquanto, a integração com o backend real ainda não foi feita, então os testes serão baseados na lógica mockada e na navegação entre as telas.

### 8.1. Testando o Fluxo de Autenticação (Login, Registro, Recuperação de Senha)

1.  **Login Mockado:**
    *   Certifique-se de que o aplicativo está rodando no emulador (`npx react-native run-android` ou `npx react-native run-ios`).
    *   Na tela de Login, insira o email `test@example.com` e a senha `password`.
    *   Clique no botão "Entrar".
    *   **Resultado Esperado:** Você deve ser redirecionado para a tela de Dashboard. Isso confirma que a lógica de login mockada e o armazenamento do token no `AsyncStorage` estão funcionando.

2.  **Registro de Novo Usuário (Produtor):**
    *   Na tela de Login, clique no link "Primeiro acesso? Cadastre-se".
    *   Preencha todos os campos do formulário de cadastro (Nome Completo, E-mail, Senha, Confirmar Senha, CPF/CNPJ, Telefone, Data de Nascimento, Sexo, e os campos de Endereço).
    *   **Importante:** Para testar o fluxo completo, você pode simular o sucesso do registro. No `src/screens/auth/RegisterScreen.js`, a função `handleRegister` atualmente exibe um `Alert` de sucesso e navega para a tela de Login. Certifique-se de que essa navegação ocorre após o preenchimento e "envio" do formulário.
    *   **Resultado Esperado:** Após clicar em "Cadastrar", você deve ver a mensagem de sucesso e ser redirecionado para a tela de Login. Isso simula que o produtor foi cadastrado com sucesso.

3.  **Recuperação de Senha:**
    *   Na tela de Login, clique no link "Esqueci minha senha".
    *   Insira um email no campo "Email cadastrado".
    *   Clique no botão "Enviar link de recuperação".
    *   **Resultado Esperado:** Você deve ver uma mensagem de sucesso (simulada) e ser redirecionado de volta para a tela de Login.

4.  **Logout:**
    *   Após fazer login e estar no Dashboard, navegue para a seção "Mais" (via Bottom Tab).
    *   No menu "Mais Opções", clique em "Sair".
    *   Confirme a saída no alerta.
    *   **Resultado Esperado:** Você deve ser redirecionado de volta para a tela de Login, e o token de autenticação deve ser removido do `AsyncStorage`.

### 8.2. Testando a Navegação para as Novas Telas

Após o login bem-sucedido, você estará no `DashboardScreen`. A partir daí, você pode testar a navegação para as novas seções principais e as telas esboçadas:

1.  **Navegação da Bottom Tab:**
    *   Clique em cada ícone da `Bottom Navigation Bar` (Dashboard, Propriedades, Talhões, Produção, Mais).
    *   **Resultado Esperado:** Cada clique deve levar você para a tela correspondente (`DashboardScreen`, `PropriedadesScreen`, `TalhoesScreen`, `ProducaoScreen`, `MoreMenuScreen`). Você deve ver o texto mínimo que você colocou em cada uma dessas telas.

2.  **Navegação Interna (Exemplo: Propriedades):**
    *   Na `PropriedadesScreen` (ou na tela que você esboçou para listar propriedades), se você adicionou um `TouchableOpacity` para simular a navegação para `DetalhesPropriedadeScreen` ou `CadastroPropriedadeScreen`, clique nele.
    *   **Resultado Esperado:** Você deve ser levado para a tela de detalhes ou cadastro/edição de propriedade, exibindo o conteúdo mínimo que você definiu para elas.

3.  **Navegação do Menu "Mais":**
    *   Na `MoreMenuScreen`, clique nos itens de menu que você adicionou (ex: "Meu Perfil", "Funcionários", etc.).
    *   **Resultado Esperado:** Você deve ver um `Alert` (conforme implementado nos exemplos) indicando a navegação para a tela correspondente. Posteriormente, quando você criar essas telas, o `Alert` será substituído pela navegação real.

### 8.3. Depurando Problemas de Autenticação e Navegação

Se você encontrar problemas durante os testes, aqui estão algumas dicas de depuração:

*   **Console.log:** Use `console.log()` extensivamente em seu código para imprimir valores de variáveis, status de funções e mensagens de erro. Você pode ver a saída do `console.log` no terminal onde o Metro Bundler está rodando ou usando as ferramentas de depuração do React Native (ex: `adb logcat` para Android, ou o Safari Developer Tools para iOS).

*   **React Native Debugger:** Esta é uma ferramenta poderosa que combina o Chrome DevTools, Redux DevTools e React DevTools. Instale-o e conecte-o ao seu emulador para inspecionar o estado do aplicativo, componentes e requisições de rede.

*   **Verifique o `AsyncStorage`:** Você pode inspecionar o conteúdo do `AsyncStorage` para garantir que o token está sendo salvo e recuperado corretamente. No React Native Debugger, você pode ver o conteúdo do `AsyncStorage` na aba "Application".

*   **Erros de Navegação:** Se o aplicativo travar ou exibir uma tela em branco ao tentar navegar, verifique os seguintes pontos:
    *   **Importações:** Certifique-se de que todas as telas e navegadores estão corretamente importados no `AppNavigator.js`.
    *   **Nomes de Rota:** Verifique se os nomes das rotas (`name="Dashboard"`, `name="Login"`, etc.) no `Tab.Screen`, `Stack.Screen` e `Drawer.Screen` correspondem exatamente aos nomes usados nas chamadas `navigation.navigate()`.
    *   **Componentes Registrados:** Confirme se os componentes das telas estão sendo passados corretamente para a propriedade `component` do `Screen` (`component={DashboardScreen}`).
    *   **Dependências Nativas:** Para problemas relacionados à navegação ou ícones, verifique se todas as dependências nativas (`react-native-screens`, `react-native-gesture-handler`, `react-native-reanimated`, `react-native-vector-icons`) foram instaladas e configuradas corretamente (especialmente `pod install` para iOS e as configurações no `babel.config.js` e `android/app/build.gradle`).

Ao seguir esses passos e dicas de depuração, você poderá validar o fluxo de autenticação e a navegação básica do seu aplicativo CoffeeHub, preparando-o para a integração com o backend real.

