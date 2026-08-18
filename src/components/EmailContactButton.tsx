import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { CONTACT_INFO, isValidEmail } from '../utils/constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface EmailContactButtonProps {
  email?: string
  subject?: string
  body?: string
  animate?: boolean
}

export default function EmailContactButton({
  email = CONTACT_INFO.email.address,
  subject = CONTACT_INFO.email.subject,
  body = CONTACT_INFO.email.body,
  animate = true,
}: EmailContactButtonProps) {
  // Detect reduced motion preference
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = animate && !prefersReducedMotion

  // Validate email format
  if (!isValidEmail(email)) {
    console.warn(`Invalid email format: ${email}`)
    return null
  }

  // Generate mailto URI with proper URL encoding
  const generateMailtoUri = (): string => {
    let uri = `mailto:${encodeURIComponent(email)}`

    const params: string[] = []
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
    if (body) params.push(`body=${encodeURIComponent(body)}`)

    if (params.length > 0) {
      uri += `?${params.join('&')}`
    }

    return uri
  }

  const mailtoUri = generateMailtoUri()

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

  const buttonContent = (
    <div className="flex items-start gap-4 w-full">
      <div className="p-3 rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-all flex-shrink-0">
        <Mail className="text-cyan-400" size={24} />
      </div>
      <div className="flex-1 text-left">
        <p className="text-white font-semibold">Enviar Email</p>
        <p className="text-gray-400 text-sm group-hover:text-cyan-400 transition-colors truncate">
          {email}
        </p>
      </div>
    </div>
  )

  if (shouldAnimate) {
    return (
      <motion.a
        href={mailtoUri}
        className="p-6 rounded-lg glass hover:border-cyan-500/40 transition-all group min-h-[100px] flex items-center bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 hover:from-cyan-500/20 hover:to-blue-600/20"
        whileHover={hoverVariant}
        whileTap={tapVariant}
        aria-label={`Send Email / Enviar Email para ${email}`}
      >
        {buttonContent}
      </motion.a>
    )
  }

  // Non-animated version (respects prefers-reduced-motion)
  return (
    <a
      href={mailtoUri}
      className="p-6 rounded-lg glass hover:border-cyan-500/40 transition-all group min-h-[100px] flex items-center focus:outline-none focus:ring-2 focus:ring-cyan-400/50 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 hover:from-cyan-500/20 hover:to-blue-600/20"
      aria-label={`Send Email / Enviar Email para ${email}`}
    >
      {buttonContent}
    </a>
  )
}
