export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

export const hoverY = {
  whileHover: { y: -10 },
}

export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Contact Button Animation Variants (Requirements 3.1, 3.2, 3.3, 3.4, 3.6)

export const contactButtonHover = {
  whileHover: {
    scale: 1.05,
    boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.4)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

export const contactButtonTap = {
  whileTap: {
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

export const contactButtonFocus = {
  initial: { outline: 'none' },
  whileFocus: {
    outline: '2px solid rgb(6, 182, 212)',
    outlineOffset: '2px',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

// Reduced Motion Variants (Requirement 3.6)
export const contactButtonHoverReducedMotion = {
  whileHover: {
    boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.4)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

export const contactButtonTapReducedMotion = {
  whileTap: {
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}
