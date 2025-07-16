import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { COLORS, SIZES, SHADOWS, ACCESSIBILITY, ANIMATIONS } from '../../constants/theme';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  style,
  inputStyle,
  disabled = false,
  multiline = false,
  secureTextEntry = false,
  keyboardType = 'default',
  maxLength,
  leftIcon,
  rightIcon,
  onRightIconPress,
  variant = 'default',
  size = 'medium',
  required = false,
  accessibilityLabel,
  accessibilityHint,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(secureTextEntry);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const animateFocus = (focused) => {
    Animated.timing(animatedValue, {
      toValue: focused ? 1 : 0,
      duration: ANIMATIONS.duration.fast,
      useNativeDriver: false,
    }).start();
  };

  const getContainerStyle = () => {
    let baseStyle = [styles.container];
    
    switch (variant) {
      case 'filled':
        baseStyle.push(styles.filledContainer);
        break;
      case 'outlined':
        baseStyle.push(styles.outlinedContainer);
        break;
      default:
        baseStyle.push(styles.defaultContainer);
    }
    
    if (isFocused) {
      baseStyle.push(styles.focusedContainer);
    }
    
    if (error) {
      baseStyle.push(styles.errorContainer);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledContainer);
    }
    
    return baseStyle;
  };

  const getInputStyle = () => {
    let baseStyle = [styles.input];
    
    switch (size) {
      case 'small':
        baseStyle.push(styles.smallInput);
        break;
      case 'medium':
        baseStyle.push(styles.mediumInput);
        break;
      case 'large':
        baseStyle.push(styles.largeInput);
        break;
      default:
        baseStyle.push(styles.mediumInput);
    }
    
    if (multiline) {
      baseStyle.push(styles.multilineInput);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledInput);
    }
    
    return baseStyle;
  };

  const toggleSecureVisibility = () => {
    setIsSecureVisible(!isSecureVisible);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={getContainerStyle()}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[getInputStyle(), inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          editable={!disabled}
          multiline={multiline}
          secureTextEntry={isSecureVisible}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={() => {
            setIsFocused(true);
            animateFocus(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            animateFocus(false);
          }}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityHint={accessibilityHint || helperText}
          accessibilityRole="textfield"
          accessibilityState={{
            disabled,
            invalid: !!error,
            required,
          }}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={toggleSecureVisibility}
            accessibilityLabel={isSecureVisible ? 'Ocultar senha' : 'Mostrar senha'}
            accessibilityRole="button"
            accessibilityHint="Toca para alternar a visibilidade da senha"
          >
            <Text style={styles.secureToggle}>
              {isSecureVisible ? '👁️' : '👁️‍🗨️'}
            </Text>
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            accessibilityRole="button"
            accessibilityLabel="Ação do campo"
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: SIZES.margin,
  },
  label: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SIZES.paddingSmall / 2,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  required: {
    color: COLORS.error,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    borderWidth: 1,
    ...SHADOWS.small,
    minHeight: ACCESSIBILITY.touchTarget.minHeight,
  },
  defaultContainer: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  filledContainer: {
    borderColor: 'transparent',
    backgroundColor: COLORS.lightGray,
  },
  outlinedContainer: {
    borderColor: COLORS.border,
    backgroundColor: 'transparent',
  },
  focusedContainer: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  errorContainer: {
    borderColor: COLORS.error,
    borderWidth: 2,
  },
  disabledContainer: {
    backgroundColor: COLORS.disabled,
    borderColor: COLORS.border,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: SIZES.body,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  smallInput: {
    paddingVertical: SIZES.paddingSmall,
    paddingHorizontal: SIZES.paddingSmall + 4,
    minHeight: SIZES.buttonHeightSmall,
  },
  mediumInput: {
    paddingVertical: SIZES.paddingSmall + 4,
    paddingHorizontal: SIZES.padding,
    minHeight: SIZES.inputHeight,
  },
  largeInput: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding + 4,
    minHeight: SIZES.buttonHeightLarge,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    color: COLORS.textSecondary,
  },
  leftIconContainer: {
    marginLeft: SIZES.paddingSmall + 4,
    marginRight: SIZES.paddingSmall,
  },
  rightIconContainer: {
    marginRight: SIZES.paddingSmall + 4,
    marginLeft: SIZES.paddingSmall,
    minHeight: ACCESSIBILITY.touchTarget.minHeight,
    minWidth: ACCESSIBILITY.touchTarget.minWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secureToggle: {
    fontSize: 18,
  },
  errorText: {
    fontSize: SIZES.caption,
    color: COLORS.error,
    marginTop: SIZES.paddingSmall / 2,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  helperText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: SIZES.paddingSmall / 2,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
});

export default Input;
