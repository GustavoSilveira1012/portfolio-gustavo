export const SITE_NAME = 'Gustavo Silveira Soares'
export const SITE_DESCRIPTION = 'Desenvolvedor Full Stack com foco em React, TypeScript, Node.js, APIs e soluções IoT'
export const SITE_URL = 'https://gustavo-portfolio.com'

export const CONTACT_INFO = {
  email: {
    address: 'gustavosilveirasoares1012@gmail.com',
    subject: 'Oportunidade de Colaboração',
    body: '',
  },
  whatsapp: {
    phoneNumber: '+5515996592613',
    message: 'Olá Gustavo, gostaria de conversar sobre uma oportunidade!',
  },
  location: {
    address: 'Sorocaba, SP',
    url: 'https://maps.google.com',
  },
}

export const SOCIAL_LINKS = {
  github: 'https://github.com/GustavoSilveira1012',
  linkedin: 'https://linkedin.com/in/gustavo-silveira-soares',
  twitter: 'https://twitter.com',
  email: 'gustavosilveirasoares1012@gmail.com',
  whatsapp: 'https://wa.me/5515996592613',
}

export const CV_FILES = [
  {
    label: 'PT - Currículo',
    href: '/cv/gustavo-silveira-soares-cv-pt.html',
    filename: 'gustavo-silveira-soares-cv-pt.html',
  },
  {
    label: 'EN - Resume',
    href: '/cv/gustavo-silveira-soares-cv-en.html',
    filename: 'gustavo-silveira-soares-cv-en.html',
  },
]

export const NAVIGATION_ITEMS = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Experiência', href: '#experience' },
  { label: 'Contato', href: '#contact' },
]

/**
 * Validation utility functions for contact information formats
 */

/**
 * Validates email format using a standard email regex pattern
 * @param email - The email address to validate
 * @returns true if the email format is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates Brazilian phone number format
 * Accepts formats:
 * - +5511999999999 (with country code)
 * - 11999999999 (without country code)
 * - (11) 99999-9999 (formatted)
 * - 11 99999-9999 (formatted without parentheses)
 * @param phoneNumber - The phone number to validate
 * @returns true if the phone number format is valid, false otherwise
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  // Remove common formatting characters
  const cleaned = phoneNumber.replace(/[\s()-]/g, '')
  
  // Valid Brazilian phone number patterns:
  // +5511999999999 (15 digits with country code)
  // 11999999999 (11 digits without country code)
  const phoneRegex = /^(\+55)?1[1-9]\d{8,9}$/
  
  return phoneRegex.test(cleaned)
}

/**
 * Normalizes a Brazilian phone number to the +55 format
 * @param phoneNumber - The phone number to normalize
 * @returns The normalized phone number with +55 country code
 */
export const normalizePhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '')
  
  // If it doesn't start with country code, add it
  if (!cleaned.startsWith('55')) {
    return `+55${cleaned}`
  }
  
  return `+${cleaned}`
}

/**
 * Encodes email subject and body for use in mailto: URI
 * @param text - The text to encode
 * @returns The URL-encoded text
 */
export const encodeEmailText = (text: string): string => {
  return encodeURIComponent(text)
}

/**
 * Encodes WhatsApp message for use in wa.me URI
 * @param message - The message to encode
 * @returns The URL-encoded message
 */
export const encodeWhatsAppMessage = (message: string): string => {
  return encodeURIComponent(message)
}
