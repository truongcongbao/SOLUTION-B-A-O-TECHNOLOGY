import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  placeholderIcon?: React.ReactNode;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  placeholderIcon
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // When image src changes, reset loaded state to trigger transition
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '120px', // Load image when it is 120px close to the screen edge
        threshold: 0.01,
      }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  // Handle cached images
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [isInView]);

  return (
    <div 
      ref={imgRef}
      className={`relative w-full h-full overflow-hidden flex items-center justify-center ${containerClassName}`}
    >
      {/* Loading Placeholder / Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100/80 animate-pulse flex items-center justify-center z-[1]">
          {placeholderIcon ? (
            <div className="opacity-40">{placeholderIcon}</div>
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin" />
          )}
        </div>
      )}

      {/* Actual Image */}
      {isInView && Boolean(src && src.trim()) && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`transition-all duration-500 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${className}`}
        />
      )}
    </div>
  );
};
