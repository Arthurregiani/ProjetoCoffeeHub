import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { COLORS, SIZES, SHADOWS, ACCESSIBILITY, ANIMATIONS } from '../../constants/theme';

const GradientButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  backgroundColor = COLORS.primary,
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

  if (disabled) {
    return (
      <View style={[getButtonStyle(), styles.disabledContainer, style]}>
        {renderContent()}
      </View>
    );
  }
  
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.9}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      style={[getButtonStyle(), { backgroundColor }, style]}
      {...props}
    >
      <Animated.View style={[{ transform: [{ scale: animatedValue }] }]}>
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
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.white,
    lineHeight: ACCESSIBILITY.text.lineHeight * 16,
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
  disabledContainer: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  disabledButton: {
    opacity: 0.6,
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

export default GradientButton;
