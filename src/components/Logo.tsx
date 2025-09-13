import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg 
        className={sizeClasses[size]} 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="16" cy="16" r="16" fill="url(#gradient)"/>
        
        {/* Athlete figure */}
        <path d="M8 20C8 18.5 9 17 10.5 16.5C11 16.2 11.5 16 12 16C12.5 16 13 16.2 13.5 16.5C14.5 17 15 18 15 19V22H8V20Z" fill="white" opacity="0.9"/>
        
        {/* Book/Study element */}
        <rect x="18" y="12" width="8" height="6" rx="1" fill="white" opacity="0.9"/>
        <rect x="19" y="13" width="6" height="1" fill="#3B82F6"/>
        <rect x="19" y="15" width="4" height="1" fill="#3B82F6"/>
        <rect x="19" y="17" width="5" height="1" fill="#3B82F6"/>
        
        {/* Trophy/Achievement */}
        <path d="M20 8C20 7.4 20.4 7 21 7H23C23.6 7 24 7.4 24 8V10C24 10.6 23.6 11 23 11H21C20.4 11 20 10.6 20 10V8Z" fill="white" opacity="0.9"/>
        <path d="M21.5 11V13H22.5V11H21.5Z" fill="white" opacity="0.9"/>
        
        {/* Growth arrow */}
        <path d="M6 8L10 4L14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
        <path d="M10 4V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
        
        {/* V letter (subtle) */}
        <path d="M16 6L18 10L20 6" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="50%" stopColor="#1D4ED8" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-bold text-primary ${textSizes[size]}`}>
            Vin
          </h1>
          {size !== 'sm' && (
            <span className="hidden sm:inline text-xs text-muted-foreground -mt-1">
              Plataforma de Acompanhamento Esportivo
            </span>
          )}
        </div>
      )}
    </div>
  );
};
