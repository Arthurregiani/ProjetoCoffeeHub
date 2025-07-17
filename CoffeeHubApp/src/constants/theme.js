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

// Espacamentos padronizados - Enhanced for better visual hierarchy
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  
  // Spacings específicos para diferentes contextos
  section: 32,        // Espaçamento entre seções principais
  component: 24,      // Espaçamento entre componentes
  element: 16,        // Espaçamento entre elementos
  item: 12,          // Espaçamento entre itens em listas
  content: 8,        // Espaçamento interno de conteúdo
  
  // Padding específico para containers
  containerPadding: 20,
  cardPadding: 16,
  listPadding: 12,
  
  // Margins específicos
  cardMargin: 12,
  listItemMargin: 8,
  buttonMargin: 16,
  
  // Espaçamentos para headers e footers
  headerPadding: 24,
  footerPadding: 32,
  
  // Espaçamentos para search e filtros
  searchPadding: 16,
  filterPadding: 12,
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
  
  // Grid columns por breakpoint
  gridColumns: {
    small: 1,
    medium: 2,
    large: 3,
    xlarge: 4,
  },
  
  // Espaçamentos responsivos
  spacing: {
    small: {
      xs: 3,
      sm: 6,
      md: 12,
      lg: 18,
      xl: 24,
    },
    medium: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    large: {
      xs: 5,
      sm: 10,
      md: 20,
      lg: 30,
      xl: 40,
    },
    xlarge: {
      xs: 6,
      sm: 12,
      md: 24,
      lg: 36,
      xl: 48,
    },
  },
  
  // Tamanhos de fonte responsivos
  fontSize: {
    small: {
      multiplier: 0.9,
      h1: 28,
      h2: 22,
      h3: 18,
      h4: 16,
      body: 14,
      caption: 12,
    },
    medium: {
      multiplier: 1.0,
      h1: 32,
      h2: 24,
      h3: 20,
      h4: 18,
      body: 16,
      caption: 14,
    },
    large: {
      multiplier: 1.1,
      h1: 36,
      h2: 26,
      h3: 22,
      h4: 20,
      body: 18,
      caption: 16,
    },
    xlarge: {
      multiplier: 1.2,
      h1: 40,
      h2: 28,
      h3: 24,
      h4: 22,
      body: 20,
      caption: 18,
    },
  },
  
  // Utilities para cálculos responsivos
  getScreenType: (width) => {
    if (width < 576) return 'small';
    if (width < 768) return 'medium';
    if (width < 992) return 'large';
    return 'xlarge';
  },
  
  // Função para obter espaçamento responsivo
  getSpacing: (width, spacingKey = 'md') => {
    const screenType = RESPONSIVE.getScreenType(width);
    return RESPONSIVE.spacing[screenType][spacingKey] || RESPONSIVE.spacing.medium[spacingKey];
  },
  
  // Função para obter tamanho de fonte responsivo
  getFontSize: (width, fontKey = 'body') => {
    const screenType = RESPONSIVE.getScreenType(width);
    return RESPONSIVE.fontSize[screenType][fontKey] || RESPONSIVE.fontSize.medium[fontKey];
  },
  
  // Função para obter número de colunas responsivo
  getColumns: (width) => {
    const screenType = RESPONSIVE.getScreenType(width);
    return RESPONSIVE.gridColumns[screenType] || RESPONSIVE.gridColumns.medium;
  },
};

// Layout guidelines para consistência visual
export const LAYOUT = {
  // Estrutura de seções
  section: {
    paddingHorizontal: SPACING.containerPadding,
    paddingVertical: SPACING.section,
    marginBottom: SPACING.component,
  },
  
  // Headers de seções
  sectionHeader: {
    marginBottom: SPACING.element,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  
  // Títulos e hierarquia
  hierarchy: {
    mainTitle: {
      fontSize: SIZES.h1,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      color: COLORS.text,
      marginBottom: SPACING.element,
      lineHeight: TYPOGRAPHY.lineHeights.tight * SIZES.h1,
    },
    sectionTitle: {
      fontSize: SIZES.h2,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      color: COLORS.text,
      marginBottom: SPACING.item,
      lineHeight: TYPOGRAPHY.lineHeights.tight * SIZES.h2,
    },
    subTitle: {
      fontSize: SIZES.h3,
      fontWeight: TYPOGRAPHY.fontWeights.semiBold,
      color: COLORS.text,
      marginBottom: SPACING.content,
      lineHeight: TYPOGRAPHY.lineHeights.normal * SIZES.h3,
    },
    cardTitle: {
      fontSize: SIZES.h4,
      fontWeight: TYPOGRAPHY.fontWeights.semiBold,
      color: COLORS.primary,
      marginBottom: SPACING.xs,
      lineHeight: TYPOGRAPHY.lineHeights.normal * SIZES.h4,
    },
  },
  
  // Listas e itens
  list: {
    container: {
      paddingHorizontal: SPACING.containerPadding,
    },
    item: {
      paddingVertical: SPACING.item,
      paddingHorizontal: SPACING.listPadding,
      marginBottom: SPACING.listItemMargin,
      borderRadius: SIZES.radius,
      backgroundColor: COLORS.surface,
      ...SHADOWS.card,
    },
    separator: {
      height: SPACING.content,
      backgroundColor: COLORS.borderLight,
    },
  },
  
  // Cards
  card: {
    container: {
      backgroundColor: COLORS.surface,
      borderRadius: SIZES.radius,
      padding: SPACING.cardPadding,
      marginBottom: SPACING.cardMargin,
      ...SHADOWS.card,
    },
    header: {
      marginBottom: SPACING.item,
      paddingBottom: SPACING.content,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.borderLight,
    },
    content: {
      marginBottom: SPACING.content,
    },
    footer: {
      marginTop: SPACING.item,
      paddingTop: SPACING.content,
      borderTopWidth: 1,
      borderTopColor: COLORS.borderLight,
    },
  },
  
  // Search e filtros
  search: {
    container: {
      paddingHorizontal: SPACING.containerPadding,
      paddingVertical: SPACING.searchPadding,
      backgroundColor: COLORS.surface,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.borderLight,
      ...SHADOWS.small,
    },
    input: {
      backgroundColor: COLORS.surfaceVariant,
      borderRadius: SIZES.radius,
      paddingHorizontal: SPACING.element,
      paddingVertical: SPACING.item,
      marginBottom: SPACING.content,
    },
  },
  
  // Filtros
  filter: {
    container: {
      paddingHorizontal: SPACING.containerPadding,
      paddingVertical: SPACING.filterPadding,
      backgroundColor: COLORS.background,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.borderLight,
    },
    button: {
      paddingHorizontal: SPACING.element,
      paddingVertical: SPACING.content,
      marginRight: SPACING.content,
      borderRadius: SIZES.radiusLarge,
      backgroundColor: COLORS.surface,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    activeButton: {
      backgroundColor: COLORS.primary,
      borderColor: COLORS.primary,
    },
  },
  
  // Headers e footers
  header: {
    container: {
      paddingHorizontal: SPACING.containerPadding,
      paddingVertical: SPACING.headerPadding,
      backgroundColor: COLORS.primary,
      borderBottomLeftRadius: SIZES.radiusLarge,
      borderBottomRightRadius: SIZES.radiusLarge,
      ...SHADOWS.medium,
    },
    title: {
      fontSize: SIZES.h1,
      fontWeight: TYPOGRAPHY.fontWeights.bold,
      color: COLORS.white,
      lineHeight: TYPOGRAPHY.lineHeights.tight * SIZES.h1,
    },
    subtitle: {
      fontSize: SIZES.body,
      color: COLORS.whiteOpacity,
      lineHeight: TYPOGRAPHY.lineHeights.normal * SIZES.body,
    },
  },
  
  footer: {
    container: {
      paddingHorizontal: SPACING.containerPadding,
      paddingVertical: SPACING.footerPadding,
      backgroundColor: COLORS.surface,
      borderTopWidth: 1,
      borderTopColor: COLORS.borderLight,
    },
  },
  
  // Grids
  grid: {
    container: {
      paddingHorizontal: SPACING.containerPadding,
    },
    item: {
      marginBottom: SPACING.item,
    },
  },
};

