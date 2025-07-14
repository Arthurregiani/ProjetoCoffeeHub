import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

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
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecureVisible, setIsSecureVisible] = useState(secureTextEntry);

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
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={toggleSecureVisibility}
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
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  required: {
    color: COLORS.error,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    borderWidth: 1,
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
    color: COLORS.textPrimary,
    fontSize: SIZES.body,
  },
  smallInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 36,
  },
  mediumInput: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  largeInput: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    minHeight: 52,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disabledInput: {
    color: COLORS.textSecondary,
  },
  leftIconContainer: {
    marginLeft: 12,
    marginRight: 8,
  },
  rightIconContainer: {
    marginRight: 12,
    marginLeft: 8,
  },
  secureToggle: {
    fontSize: 18,
  },
  errorText: {
    fontSize: SIZES.caption,
    color: COLORS.error,
    marginTop: 4,
  },
  helperText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default Input;
