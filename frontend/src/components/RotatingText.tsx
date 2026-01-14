import React, { useState, useEffect } from 'react';

interface RotatingTextProps {
  texts: string[];
  interval?: number; // Interval in milliseconds (default: 5000ms)
  className?: string; // Additional CSS classes
}

const RotatingText: React.FC<RotatingTextProps> = ({ 
  texts, 
  interval = 5000, 
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div 
        className="transition-opacity duration-1000 ease-in-out"
        style={{ opacity: 1 }}
      >
        <span className="block text-center">{texts[currentIndex]}</span>
      </div>
    </div>
  );
};

export default RotatingText;