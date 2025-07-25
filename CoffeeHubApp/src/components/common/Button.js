import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { COLORS, SIZES, SHADOWS, ACCESSIBILITY, ANIMATIONS } from '../../constants/theme';

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  loading = false,
  accessibilityLabel,
  ...props
}) => {
  const animatedValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 0.95,
      duration: ANIMATIONS.duration.fast,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: ANIMATIONS.duration.fast,
      useNativeDriver: true,
    }).start();
  };
  const getButtonStyle = () => {
    let baseStyle = [styles.button];
    
    // Variantes de cor
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        baseStyle.push(styles.outlineButton);
        break;
      case 'ghost':
        baseStyle.push(styles.ghostButton);
        break;
      case 'danger':
        baseStyle.push(styles.dangerButton);
        break;
      default:
        baseStyle.push(styles.primaryButton);
    }
    
    // Tamanhos
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallButton);
        break;
      case 'medium':
        baseStyle.push(styles.mediumButton);
        break;
      case 'large':
        baseStyle.push(styles.largeButton);
        break;
      default:
        baseStyle.push(styles.mediumButton);
    }
    
    // Estado desabilitado
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }
    
    return baseStyle;
  };
  
  const getTextStyle = () => {
    let baseStyle = [styles.buttonText];
    
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryText);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryText);
        break;
      case 'outline':
        baseStyle.push(styles.outlineText);
        break;
      case 'ghost':
        baseStyle.push(styles.ghostText);
        break;
      case 'danger':
        baseStyle.push(styles.dangerText);
        break;
      default:
        baseStyle.push(styles.primaryText);
    }
    
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallText);
        break;
      case 'medium':
        baseStyle.push(styles.mediumText);
        break;
      case 'large':
        baseStyle.push(styles.largeText);
        break;
      default:
        baseStyle.push(styles.mediumText);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledText);
    }
    
    return baseStyle;
  };
  
  const renderContent = () => {
    if (loading) {
      return <Text style={getTextStyle()}>Carregando...</Text>;
    }
    
    if (icon && iconPosition === 'left') {
      return (
        <View style={styles.buttonContent}>
          {icon}
          <Text style={[getTextStyle(), { marginLeft: SIZES.paddingSmall }]}>{title}</Text>
        </View>
      );
    }
    
    if (icon && iconPosition === 'right') {
      return (
        <View style={styles.buttonContent}>
          <Text style={[getTextStyle(), { marginRight: SIZES.paddingSmall }]}>{title}</Text>
          {icon}
        </View>
      );
    }
    
    return <Text style={getTextStyle()}>{title}</Text>;
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      {...props}
    >
      <Animated.View style={[{ transform: [{ scale: animatedValue }] }, getButtonStyle(), style]}>
        {renderContent()}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
    minHeight: ACCESSIBILITY.touchTarget.minHeight,
    minWidth: ACCESSIBILITY.touchTarget.minWidth,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: ACCESSIBILITY.text.lineHeight * 16,
  },
  
  // Variantes de cor
  primaryButton: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  secondaryButton: {
    backgroundColor: COLORS.secondary,
    ...SHADOWS.medium,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    ...SHADOWS.small,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  dangerButton: {
    backgroundColor: COLORS.error,
    ...SHADOWS.medium,
  },
  
  // Tamanhos
  smallButton: {
    paddingVertical: SIZES.paddingSmall,
    paddingHorizontal: SIZES.padding,
    minHeight: SIZES.buttonHeightSmall,
  },
  mediumButton: {
    paddingVertical: SIZES.paddingSmall + 4,
    paddingHorizontal: SIZES.padding + 4,
    minHeight: SIZES.buttonHeight,
  },
  largeButton: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding + 8,
    minHeight: SIZES.buttonHeightLarge,
  },
  
  // Estados
  disabledButton: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  
  // Estilos de texto
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.white,
  },
  outlineText: {
    color: COLORS.primary,
  },
  ghostText: {
    color: COLORS.primary,
  },
  dangerText: {
    color: COLORS.white,
  },
  
  // Tamanhos de texto
  smallText: {
    fontSize: SIZES.caption,
  },
  mediumText: {
    fontSize: SIZES.body,
  },
  largeText: {
    fontSize: SIZES.h4,
  },
  
  disabledText: {
    color: COLORS.textSecondary,
  },
});

export default Button;
