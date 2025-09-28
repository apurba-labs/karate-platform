// src/hooks/useBreakpoints.ts
import useWindowSize from './useWindowSize';

export function useBreakpoints() {
  const { width } = useWindowSize();
  
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isLargeDesktop: width >= 1280,
    
    // Specific breakpoints
    sm: width >= 640,
    md: width >= 768,
    lg: width >= 1024,
    xl: width >= 1280,
    xxl: width >= 1536,
  };
}

export default useBreakpoints;