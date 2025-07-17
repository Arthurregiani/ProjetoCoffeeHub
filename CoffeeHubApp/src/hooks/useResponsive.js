import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { RESPONSIVE } from '../constants/theme';

export const useResponsive = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };
    
    const subscription = Dimensions.addEventListener('change', onChange);
    
    return () => subscription?.remove();
  }, []);
  
  const { width, height } = screenData;
  
  // Determine device type based on screen width
  const isSmallScreen = width < RESPONSIVE.breakpoints.small;
  const isMediumScreen = width >= RESPONSIVE.breakpoints.small && width < RESPONSIVE.breakpoints.medium;
  const isLargeScreen = width >= RESPONSIVE.breakpoints.medium && width < RESPONSIVE.breakpoints.large;
  const isXLargeScreen = width >= RESPONSIVE.breakpoints.large;
  
  const isTablet = RESPONSIVE.isTablet(width);
  const isDesktop = RESPONSIVE.isDesktop(width);
  
  // Grid columns based on screen size
  const getGridColumns = (defaultColumns = 2) => {
    if (width < 576) return 1;
    if (isSmallScreen) return 2;
    if (isMediumScreen) return 2;
    if (isLargeScreen) return 3;
    if (isXLargeScreen) return 4;
    return defaultColumns;
  };
  
  // Get responsive padding based on screen size
  const getResponsivePadding = () => {
    if (isSmallScreen) return 12;
    if (isMediumScreen) return 16;
    if (isLargeScreen) return 20;
    return 24;
  };
  
  // Get responsive margin based on screen size
  const getResponsiveMargin = () => {
    if (isSmallScreen) return 8;
    if (isMediumScreen) return 12;
    if (isLargeScreen) return 16;
    return 20;
  };
  
  // Get responsive font size multiplier
  const getFontSizeMultiplier = () => {
    if (isSmallScreen) return 0.9;
    if (isMediumScreen) return 1.0;
    if (isLargeScreen) return 1.1;
    return 1.2;
  };
  
  // Get responsive item width for grids
  const getItemWidth = (columns = null) => {
    const cols = columns || getGridColumns();
    const padding = getResponsivePadding();
    const margin = getResponsiveMargin();
    
    return (width - (padding * 2) - (margin * (cols - 1))) / cols;
  };
  
  // Get responsive spacing
  const getResponsiveSpacing = (baseSpacing = 16) => {
    if (isSmallScreen) return baseSpacing * 0.8;
    if (isMediumScreen) return baseSpacing;
    if (isLargeScreen) return baseSpacing * 1.2;
    return baseSpacing * 1.4;
  };
  
  return {
    // Screen dimensions
    width,
    height,
    
    // Screen type booleans
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isXLargeScreen,
    isTablet,
    isDesktop,
    
    // Responsive functions
    getGridColumns,
    getResponsivePadding,
    getResponsiveMargin,
    getFontSizeMultiplier,
    getItemWidth,
    getResponsiveSpacing,
    
    // Responsive values
    columns: getGridColumns(),
    padding: getResponsivePadding(),
    margin: getResponsiveMargin(),
    fontMultiplier: getFontSizeMultiplier(),
    spacing: getResponsiveSpacing(),
  };
};

// Higher-order component for responsive styles
export const withResponsive = (Component) => {
  return (props) => {
    const responsive = useResponsive();
    return <Component {...props} responsive={responsive} />;
  };
};

// Responsive style utility
export const createResponsiveStyle = (styles) => {
  return (responsive) => {
    const { isSmallScreen, isMediumScreen, isLargeScreen, isXLargeScreen } = responsive;
    
    let finalStyles = { ...styles.base };
    
    if (isSmallScreen && styles.small) {
      finalStyles = { ...finalStyles, ...styles.small };
    } else if (isMediumScreen && styles.medium) {
      finalStyles = { ...finalStyles, ...styles.medium };
    } else if (isLargeScreen && styles.large) {
      finalStyles = { ...finalStyles, ...styles.large };
    } else if (isXLargeScreen && styles.xlarge) {
      finalStyles = { ...finalStyles, ...styles.xlarge };
    }
    
    return finalStyles;
  };
};
