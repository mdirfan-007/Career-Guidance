import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`logo-container ${className}`}>
      <img 
        src="https://mocha-cdn.com/019816f5-d731-7065-acb4-5988a737c883/IMG_20250716_121821_188.webp" 
        alt="Effectsup Logo" 
        className="h-10 w-auto object-contain"
      />
    </div>
  );
}
