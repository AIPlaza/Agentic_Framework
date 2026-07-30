'use client'

import React, { useEffect, useRef } from 'react'

export default function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Cinematic background autoplay blocked:', err)
      })
    }
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#0D0D0D]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-35 blur-[3px] scale-105"
      >
        <source src="/Marketplace-background.mp4" type="video/mp4" />
      </video>
      
      {/* Cinematic Vignette & Netflix Dark Blur Overlays */}
      <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/90 to-transparent backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0D0D0D_100%)]" />
    </div>
  )
}
