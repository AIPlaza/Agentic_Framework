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
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#1A1A2E]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-25 blur-sm scale-105 saturate-50"
      >
        <source src="/Marketplace-background.mp4" type="video/mp4" />
      </video>
      
      {/* Cinematic Vignette & Netflix Dark Blur Overlays (Strict #1A1A2E) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(26,26,46,1)] via-[rgba(26,26,46,0.8)] to-[rgba(26,26,46,0.6)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#1A1A2E_100%)] opacity-90" />
    </div>
  )
}
