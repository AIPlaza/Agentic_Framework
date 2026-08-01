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
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#3866B3]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-25 blur-sm scale-105 saturate-50"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      
      {/* Cinematic Vignette & Netflix Blur Overlays (Left-to-Right #3866B3) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3866B3] via-[#3866B3]/80 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#162032_100%)] opacity-90" />
    </div>
  )
}
