'use client'

import { motion, HTMLMotionProps } from 'framer-motion'

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

interface NeuralButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'outline'
  isLoading?: boolean
  children?: React.ReactNode
}

export default function NeuralButton({
  children,
  className,
  variant = 'primary',
  isLoading,
  ...props
}: NeuralButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative py-3 px-8 rounded-xl font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden group',
        variant === 'primary' 
          ? 'bg-[#5EC8F2] text-[#0D0D0D] shadow-[0_0_20px_rgba(94,200,242,0.3)] hover:shadow-[0_0_30px_rgba(94,200,242,0.5)]' 
          : 'bg-transparent border border-[#5EC8F2]/40 text-[#5EC8F2] hover:bg-[#5EC8F2]/10',
        isLoading && 'opacity-70 cursor-not-allowed',
        className
      )}
      style={{ fontFamily: 'var(--font-syne)' }}
      {...props}
    >
      {/* Neural Pulse Overlay */}
      <motion.div
        animate={{
          opacity: [0, 0.4, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[#5ED7F2]/20 blur-xl pointer-events-none"
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </span>
    </motion.button>
  )
}
