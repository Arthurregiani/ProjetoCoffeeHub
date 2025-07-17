import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useResponsive } from '../../hooks/useResponsive';
import { SPACING } from '../../constants/theme';

export const ResponsiveGrid = ({ 
  children, 
  numColumns, 
  spacing = SPACING.sm,
  style,
  itemStyle,
  onLayout,
  containerPadding = 0,
  ...props 
}) => {
  const responsive = useResponsive();
  const [containerWidth, setContainerWidth] = useState(0);
  
  const handleLayout = useCallback((event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
    onLayout && onLayout(event);
  }, [onLayout]);
  
  // Calculate columns based on responsive breakpoints or custom numColumns
  const columns = numColumns || responsive.getGridColumns();
  
  // Calculate item width based on container width if available, otherwise use responsive width
  // Account for container padding that reduces available width
  const availableWidth = containerWidth > 0 ? containerWidth - (containerPadding * 2) : 0;
  const itemWidth = availableWidth > 0 
    ? Math.max((availableWidth - (spacing * (columns - 1))) / columns, 140)
    : responsive.getItemWidth(columns);
  
  // Group children into rows
  const rows = [];
  const childrenArray = React.Children.toArray(children);
  
  for (let i = 0; i < childrenArray.length; i += columns) {
    rows.push(childrenArray.slice(i, i + columns));
  }
  
  return (
    <View 
      style={[styles.container, style]} 
      onLayout={handleLayout}
      {...props}
    >
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { marginBottom: spacing }]}>
          {row.map((item, itemIndex) => (
            <View 
              key={itemIndex} 
              style={[
                styles.item,
                { width: itemWidth },
                itemIndex > 0 && { marginLeft: spacing },
                itemStyle
              ]}
            >
              {item}
            </View>
          ))}
          {/* Fill empty spaces if last row is incomplete */}
          {row.length < columns && 
            Array.from({ length: columns - row.length }, (_, index) => (
              <View 
                key={`empty-${index}`} 
                style={[
                  styles.item,
                  { width: itemWidth },
                  { marginLeft: spacing }
                ]} 
              />
            ))
          }
        </View>
      ))}
    </View>
  );
};

export const ResponsiveContainer = ({ 
  children, 
  style,
  onLayout,
  ...props 
}) => {
  const responsive = useResponsive();
  
  const containerStyle = {
    paddingHorizontal: responsive.padding,
    paddingVertical: responsive.spacing,
  };
  
  return (
    <View 
      style={[containerStyle, style]} 
      onLayout={onLayout}
      {...props}
    >
      {children}
    </View>
  );
};

export const ResponsiveRow = ({ 
  children, 
  justify = 'space-between',
  align = 'center',
  wrap = false,
  spacing = SPACING.sm,
  style,
  onLayout,
  ...props 
}) => {
  const responsive = useResponsive();
  
  const rowStyle = {
    flexDirection: 'row',
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: responsive.isSmallScreen ? spacing * 0.5 : spacing,
  };
  
  return (
    <View 
      style={[rowStyle, style]} 
      onLayout={onLayout}
      {...props}
    >
      {children}
    </View>
  );
};

export const ResponsiveColumn = ({ 
  children, 
  justify = 'flex-start',
  align = 'stretch',
  spacing = SPACING.sm,
  style,
  onLayout,
  ...props 
}) => {
  const responsive = useResponsive();
  
  const columnStyle = {
    flexDirection: 'column',
    justifyContent: justify,
    alignItems: align,
    gap: responsive.isSmallScreen ? spacing * 0.8 : spacing,
  };
  
  return (
    <View 
      style={[columnStyle, style]} 
      onLayout={onLayout}
      {...props}
    >
      {children}
    </View>
  );
};

export const ResponsiveCard = ({ 
  children, 
  style,
  fullWidth = false,
  minHeight,
  onLayout,
  ...props 
}) => {
  const responsive = useResponsive();
  
  const cardStyle = {
    width: fullWidth ? '100%' : responsive.getItemWidth(),
    minHeight: minHeight || (responsive.isSmallScreen ? 80 : 100),
    padding: responsive.padding,
    marginBottom: responsive.margin,
  };
  
  return (
    <View 
      style={[cardStyle, style]} 
      onLayout={onLayout}
      {...props}
    >
      {children}
    </View>
  );
};

// Higher-order component for responsive behavior
export const withResponsiveLayout = (Component) => {
  return React.forwardRef((props, ref) => {
    const responsive = useResponsive();
    return <Component {...props} responsive={responsive} ref={ref} />;
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  item: {
    flex: 0,
  },
});
