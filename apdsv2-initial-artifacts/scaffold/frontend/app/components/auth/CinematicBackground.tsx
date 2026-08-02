import React, { useRef, useEffect } from 'react';

interface CinematicBackgroundProps {
  mediaType?: 'image' | 'video';
  src?: string;
  className?: string;
  opacity?: number;
  position?: 'fixed' | 'absolute';
}

export default function CinematicBackground({ 
  mediaType = 'image', 
  src = '/images/accet-arq-main-1.JPG', 
  className = '', 
  opacity = 25,
  position = 'fixed'
}: CinematicBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (mediaType === 'video' && videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Cinematic slow motion
      videoRef.current.play().catch(err => console.log("Video autoplay blocked:", err));
      
      const handleScroll = () => {
        if (!videoRef.current) return;
        const scrollY = window.scrollY;
        const rate = Math.min(2.0, 0.5 + scrollY / 500);
        videoRef.current.playbackRate = rate;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [mediaType]);

  return (
    <div className={`${position} inset-0 z-0 pointer-events-none bg-[#3866B3] overflow-hidden ${className}`}>
      {mediaType === 'video' ? (
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover mix-blend-screen saturate-50 blur-sm"
          style={{ opacity: opacity / 100 }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img 
          src={src}
          alt="Cinematic Background"
          className="w-full h-full object-cover mix-blend-screen saturate-50 blur-sm scale-105"
          style={{ opacity: opacity / 100 }}
        />
      )}
      
      {/* Netflix Left Blur & Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3866B3] via-[#3866B3]/80 to-transparent z-10"></div>
      
      {/* Overlays for blend and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3866B3]/60 via-transparent to-transparent z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#1A1A2E_100%)] opacity-90 z-10"></div>
      <div className="absolute inset-0 vignette z-10"></div>
      <div className="absolute inset-0 grain z-10"></div>
    </div>
  );
}
