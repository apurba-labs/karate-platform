// src/components/ui/AdaptiveView.tsx
import React from 'react';
import useBreakpoints from '@/hooks/useBreakpoints';
import ResponsiveModal from './ResponsiveModal';

interface AdaptiveViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  triggerButton: React.ReactNode;
  breakpoint?: 'sm' | 'md' | 'lg'; // Customizable breakpoint
}

const AdaptiveView: React.FC<AdaptiveViewProps> = ({
  isOpen,
  onClose,
  title,
  children,
  triggerButton,
  breakpoint = 'md' // Default to tablet breakpoint
}) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoints();
  
  // Determine if we should use modal based on breakpoint
  const useModal = () => {
    switch (breakpoint) {
      case 'sm': return isMobile;
      case 'md': return isMobile || isTablet;
      case 'lg': return isMobile || isTablet || !isDesktop;
      default: return isMobile || isTablet;
    }
  };

  if (useModal()) {
    return (
      <>
        {triggerButton}
        <ResponsiveModal
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          size="lg"
        >
          {children}
        </ResponsiveModal>
      </>
    );
  }

  // Desktop: Show as inline content or tabs
  return (
    <div className="adaptive-desktop-view">
      <div className="desktop-header">
        <h2>{title}</h2>
        <button onClick={onClose} className="close-button">
          ×
        </button>
      </div>
      <div className="desktop-content">
        {children}
      </div>
    </div>
  );
};

export default AdaptiveView;