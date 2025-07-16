export const COLORS = {
  // Cores primárias (tons de verde e marrom mais refinados)
  primary: '#1B5E20',      // Verde mais escuro e profissional
  primaryLight: '#4CAF50', // Verde claro
  primaryDark: '#0D4015',  // Verde muito escuro
  secondary: '#4A2C2A',    // Marrom café mais escuro
  secondaryLight: '#8D6E63', // Marrom claro
  
  // Cores de destaque
  accent: '#FF6F00',       // Laranja mais vibrante
  accentLight: '#FFB74D',  // Laranja claro
  accentDark: '#E65100',   // Laranja escuro
  
  // Cores neutras modernas
  background: '#FAFAFA',   // Branco levemente acinzentado
  surface: '#FFFFFF',      // Branco puro para cards
  surfaceVariant: '#F5F5F5', // Cinza muito claro
  text: '#1C1C1C',         // Quase preto
  textSecondary: '#666666', // Cinza médio
  textTertiary: '#999999', // Cinza claro
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#757575',
  disabled: '#BDBDBD',     // Cor para elementos desabilitados
  
  // Estados com melhor contraste
  success: '#2E7D32',      // Verde sucesso
  warning: '#F57C00',      // Laranja aviso
  error: '#D32F2F',        // Vermelho erro
  info: '#1976D2',         // Azul informação
  
  // Cores específicas para agricultura
  coffee: '#6F4E37',       // Marrom café
  soil: '#8B4513',         // Marrom terra
  leaf: '#228B22',         // Verde folha
  harvest: '#FFD700',      // Dourado colheita
  
  // Gradientes para botões e elementos de destaque
  gradientPrimary: ['#1B5E20', '#4CAF50'],
  gradientSecondary: ['#4A2C2A', '#8D6E63'],
  gradientAccent: ['#FF6F00', '#FFB74D'],
  gradientSuccess: ['#2E7D32', '#4CAF50'],
  gradientWarning: ['#F57C00', '#FFB74D'],
  gradientError: ['#D32F2F', '#FF6B6B'],
  gradientCoffee: ['#6F4E37', '#8D6E63'],
  
  // Cores com opacidade para overlays
  primaryOpacity: 'rgba(27, 94, 32, 0.1)',
  secondaryOpacity: 'rgba(74, 44, 42, 0.1)',
  accentOpacity: 'rgba(255, 111, 0, 0.1)',
  blackOpacity: 'rgba(0, 0, 0, 0.5)',
  whiteOpacity: 'rgba(255, 255, 255, 0.9)',
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
  
  // Espaçamentos (aumentados para melhor hierarquia)
  padding: 20,
  paddingSmall: 12,
  paddingLarge: 32,
  margin: 20,
  marginSmall: 12,
  marginLarge: 32,
  
  // Border radius
  radius: 8,
  radiusSmall: 4,
  radiusLarge: 12,
  radiusRound: 50,
  
  // Dimensões
  buttonHeight: 48,
  buttonHeightSmall: 36,
  buttonHeightLarge: 56,
  inputHeight: 48,
  headerHeight: 60,
  tabHeight: 50,
  fabSize: 56,
  
  // Shadows
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  shadowOpacity: 0.1,
  elevation: 3,
  
  // Animations
  animationDuration: 300,
};

// Espacamentos padronizados
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Tipografia
export const TYPOGRAPHY = {
  fontWeights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

// Configurações de animação
export const ANIMATIONS = {
  // Durações
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  
  // Easing functions
  easing: {
    easeInOut: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    linear: 'linear',
  },
  
  // Configurações de transição
  transitions: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 300,
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
      duration: 300,
    },
    slideUp: {
      from: { transform: [{ translateY: 50 }], opacity: 0 },
      to: { transform: [{ translateY: 0 }], opacity: 1 },
      duration: 300,
    },
    slideDown: {
      from: { transform: [{ translateY: -50 }], opacity: 0 },
      to: { transform: [{ translateY: 0 }], opacity: 1 },
      duration: 300,
    },
    scale: {
      from: { transform: [{ scale: 0.9 }], opacity: 0 },
      to: { transform: [{ scale: 1 }], opacity: 1 },
      duration: 300,
    },
    bounce: {
      from: { transform: [{ scale: 0.3 }] },
      to: { transform: [{ scale: 1 }] },
      duration: 400,
    },
  },
};

// Configurações de acessibilidade
export const ACCESSIBILITY = {
  // Tamanhos mínimos para elementos tocáveis
  touchTarget: {
    minHeight: 44,
    minWidth: 44,
  },
  
  // Configurações de contraste
  contrast: {
    minimum: 4.5,  // WCAG AA
    enhanced: 7.0,  // WCAG AAA
  },
  
  // Configurações de foco
  focus: {
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: SIZES.radiusSmall,
  },
  
  // Configurações de texto
  text: {
    minSize: 14,
    lineHeight: 1.4,
  },
};

// Sombras padronizadas
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 6,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
};

// Configurações de layout responsivo
export const RESPONSIVE = {
  breakpoints: {
    small: 576,
    medium: 768,
    large: 992,
    xlarge: 1200,
  },
  
  // Função para verificar se é tablet
  isTablet: (width) => width >= 768,
  
  // Função para verificar se é desktop
  isDesktop: (width) => width >= 1200,
};

