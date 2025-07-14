import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const Card = ({ 
  children, 
  onPress, 
  style, 
  padding = SIZES.padding, 
  elevation = 2,
  backgroundColor = COLORS.surface,
  borderRadius = SIZES.radius,
  ...props 
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent
      style={[
        styles.card,
        {
          padding,
          elevation,
          backgroundColor,
          borderRadius,
        },
        style
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      {...props}
    >
      {children}
    </CardComponent>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: SIZES.margin / 2,
  },
  statCard: {
    width: '48%',
    minHeight: 80,
    justifyContent: 'center',
  },
  statTitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  infoSubtitle: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  infoContent: {
    marginTop: 4,
  },
});

export { Card, StatCard, InfoCard };
export default Card;
