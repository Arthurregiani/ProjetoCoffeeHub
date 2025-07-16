import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS, SIZES, SHADOWS, ACCESSIBILITY, ANIMATIONS } from '../../constants/theme';

const Card = ({ 
  children, 
  onPress, 
  style, 
  padding = SIZES.padding, 
  shadow = 'medium',
  backgroundColor = COLORS.surface,
  borderRadius = SIZES.radius,
  accessibilityLabel,
  ...props 
}) => {
  const animatedValue = React.useRef(new Animated.Value(1)).current;
  const CardComponent = onPress ? TouchableOpacity : View;
  
  const handlePressIn = () => {
    if (onPress) {
      Animated.timing(animatedValue, {
        toValue: 0.98,
        duration: ANIMATIONS.duration.fast,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: ANIMATIONS.duration.fast,
        useNativeDriver: true,
      }).start();
    }
  };
  
  const cardStyle = [
    styles.card,
    SHADOWS[shadow] || SHADOWS.medium,
    {
      padding,
      backgroundColor,
      borderRadius,
    },
    style
  ];
  
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.95}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        {...props}
      >
        <Animated.View style={[{ transform: [{ scale: animatedValue }] }, cardStyle]}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

const StatCard = ({ title, value, onPress, titleStyle, valueStyle, ...props }) => (
  <Card onPress={onPress} style={styles.statCard} {...props}>
    <Text style={[styles.statTitle, titleStyle]}>{title}</Text>
    <Text style={[styles.statValue, valueStyle]}>{value}</Text>
  </Card>
);

const InfoCard = ({ title, subtitle, content, onPress, ...props }) => (
  <Card onPress={onPress} {...props}>
    <View style={styles.infoHeader}>
      <Text style={styles.infoTitle}>{title}</Text>
      {subtitle && <Text style={styles.infoSubtitle}>{subtitle}</Text>}
    </View>
    {content && (
      <View style={styles.infoContent}>
        {content}
      </View>
    )}
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.marginSmall,
  },
  statCard: {
    width: '48%',
    minHeight: 80,
    justifyContent: 'center',
    minWidth: ACCESSIBILITY.touchTarget.minWidth,
  },
  statTitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.paddingSmall / 2,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  statValue: {
    fontSize: SIZES.h4,
    fontWeight: '700',
    color: COLORS.primary,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.h4,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.paddingSmall,
  },
  infoTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.body,
  },
  infoSubtitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    lineHeight: ACCESSIBILITY.text.lineHeight * SIZES.caption,
  },
  infoContent: {
    marginTop: SIZES.paddingSmall / 2,
  },
});

export { Card, StatCard, InfoCard };
export default Card;
