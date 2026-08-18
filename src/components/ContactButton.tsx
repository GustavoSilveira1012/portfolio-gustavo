import { motion } from 'framer-motion'
import React from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export interface ContactButtonProps {
  icon: React.ReactNode
  label: string
  href: string
  variant?: 'email' | 'whatsapp'
  ariaLabel?: string
  animate?: boolean
  onBeforeOpen?: () => void
  target?: '_blank' | '_self'
  rel?: string
}

export default function ContactButton({
  icon,
  label,
  href,
  variant = 'email',
  ariaLabel,
  animate = true,
  onBeforeOpen,
  target = '_self',
  rel,
}: ContactButtonProps) {
  // Use the useReducedMotion hook to detect user preference
  const prefersReducedMotion = useReducedMotion()

  const shouldAnimate = animate && !prefersReducedMotion

  // Animation variants with 200ms or less duration
  const hoverVariant = shouldAnimate
    ? { 
        scale: 1.05, 
        boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.3)',
        transition: { duration: 0.2 }
      }
    : { 
        boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.3)',
        transition: { duration: 0.2 }
      }

  const tapVariant = shouldAnimate
    ? { 
        scale: 0.95,
        transition: { duration: 0.15 }
      }
    : {}

  const handleClick = () => {
    if (onBeforeOpen) {
      onBeforeOpen()
    }
  }

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel || label}
      onClick={handleClick}
      whileHover={hoverVariant}
      whileTap={tapVariant}
      className="inline-flex items-center justify-center gap-3 px-6 py-3 min-h-[44px] min-w-[44px] rounded-lg glass bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-white font-semibold transition-all duration-200 hover:border-cyan-500/60 hover:from-cyan-500/30 hover:to-blue-600/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
      data-variant={variant}
    >
      <div className="flex items-center justify-center flex-shrink-0">{icon}</div>
      <span>{label}</span>
    </motion.a>
  )
}
