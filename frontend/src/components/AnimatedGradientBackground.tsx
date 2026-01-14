import React from 'react';

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode;
}

const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="animated-gradient-bg"></div>

      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedGradientBackground;