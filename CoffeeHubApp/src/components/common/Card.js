import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS, SIZES, SHADOWS, ACCESSIBILITY, ANIMATIONS, SPACING, LAYOUT, TYPOGRAPHY } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

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
  const responsive = useResponsive();
  
  // Use smaller padding on small screens
  const cardPadding = responsive.isSmallScreen ? SPACING.sm : padding;
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
      minWidth: 140,
      padding: cardPadding,
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

const StatCard = ({ title, value, onPress, titleStyle, valueStyle, ...props }) => {
  const responsive = useResponsive();
  
  const statCardStyle = [
    styles.statCard,
    responsive.isSmallScreen && {
      padding: SPACING.sm,
      minHeight: 70,
    }
  ];
  
  return (
    <Card onPress={onPress} style={statCardStyle} {...props}>
      <Text style={[styles.statTitle, titleStyle]}>{title}</Text>
      <Text style={[styles.statValue, valueStyle]}>{value}</Text>
    </Card>
  );
};

const InfoCard = ({ title, subtitle, content, onPress, ...props }) => {
  const responsive = useResponsive();
  
  const infoCardStyle = [
    responsive.isSmallScreen && {
      padding: SPACING.sm,
    }
  ];
  
  return (
    <Card onPress={onPress} style={infoCardStyle} {...props}>
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
};

const styles = StyleSheet.create({
  card: {
    ...LAYOUT.card.container,
    marginBottom: SPACING.cardMargin,
  },
  statCard: {
    width: '48%',
    minHeight: 80,
    justifyContent: 'center',
    minWidth: 140,
    padding: SPACING.cardPadding,
  },
  statTitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.content,
    lineHeight: TYPOGRAPHY.lineHeights.normal * SIZES.caption,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  statValue: {
    fontSize: SIZES.h4,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    lineHeight: TYPOGRAPHY.lineHeights.tight * SIZES.h4,
  },
  infoHeader: {
    ...LAYOUT.card.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTitle: {
    ...LAYOUT.hierarchy.cardTitle,
    flex: 1,
    marginBottom: 0,
  },
  infoSubtitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeights.normal * SIZES.caption,
    fontWeight: TYPOGRAPHY.fontWeights.regular,
  },
  infoContent: {
    ...LAYOUT.card.content,
  },
});

export { Card, StatCard, InfoCard };
export default Card;
