import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { CONTACT_INFO, isValidPhoneNumber, normalizePhoneNumber, encodeWhatsAppMessage } from '../utils/constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface WhatsAppContactButtonProps {
  phoneNumber?: string
  message?: string
  animate?: boolean
}

/**
 * WhatsAppContactButton Component
 * Generates a wa.me URI with optional pre-filled message
 * Validates phone number format and handles normalization
 * Applies gradient and glass morphism styling consistent with Contact section
 */
export default function WhatsAppContactButton({
  phoneNumber = CONTACT_INFO.whatsapp.phoneNumber,
  message = CONTACT_INFO.whatsapp.message || '',
  animate = true,
}: WhatsAppContactButtonProps) {
  // Detect reduced motion preference
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = animate && !prefersReducedMotion

  // Validate phone number format
  if (!isValidPhoneNumber(phoneNumber)) {
    console.warn(`Invalid phone number format: ${phoneNumber}. Expected +55XXXXXXXXXXXX or similar format.`)
  }

  // Normalize phone number to +55 format, then remove the + for wa.me URI
  const normalized = normalizePhoneNumber(phoneNumber).replace('+', '')

  // Generate wa.me URI with optional message
  let href = `https://wa.me/${normalized}`
  if (message) {
    const encodedMessage = encodeWhatsAppMessage(message)
    href += `?text=${encodedMessage}`
  }

  // Animation variants - consistent with Contact section
  const hoverVariant = shouldAnimate
    ? { 
        x: 10,
        scale: 1.02,
        transition: { duration: 0.2 }
      }
    : {}

  const tapVariant = shouldAnimate
    ? { 
        scale: 0.98,
        transition: { duration: 0.15 }
      }
    : {}

  const displayNumber = phoneNumber.replace(/\D/g, '').slice(-11)
  const formattedNumber = `+55 (${displayNumber.slice(0, 2)}) ${displayNumber.slice(2, 7)}-${displayNumber.slice(7)}`

  const buttonContent = (
    <div className="flex items-start gap-4 w-full">
      <div className="p-3 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-all flex-shrink-0">
        <MessageCircle className="text-cyan-400" size={24} />
      </div>
      <div className="flex-1 text-left">
        <p className="text-white font-semibold">WhatsApp</p>
        <p className="text-gray-400 text-sm group-hover:text-cyan-400 transition-colors truncate">
          {formattedNumber}
        </p>
      </div>
    </div>
  )

  if (shouldAnimate) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-6 rounded-lg glass hover:border-cyan-500/40 transition-all group min-h-[100px] flex items-center bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 hover:from-cyan-500/20 hover:to-blue-600/20"
        whileHover={hoverVariant}
        whileTap={tapVariant}
        aria-label="Contact via WhatsApp"
      >
        {buttonContent}
      </motion.a>
    )
  }

  // Non-animated version (respects prefers-reduced-motion)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-6 rounded-lg glass hover:border-cyan-500/40 transition-all group min-h-[100px] flex items-center focus:outline-none focus:ring-2 focus:ring-cyan-400/50 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 hover:from-cyan-500/20 hover:to-blue-600/20"
      aria-label="Contact via WhatsApp"
    >
      {buttonContent}
    </a>
  )
}
