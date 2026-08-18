import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import {
  CONTACT_INFO,
  isValidEmail,
  isValidPhoneNumber,
  normalizePhoneNumber,
  encodeEmailText,
  encodeWhatsAppMessage,
} from './constants'

describe('CONTACT_INFO Constants', () => {
  /**
   * Property 3: Email Configuration Immutability
   * Validates: Requirements 5.1, 5.2
   * 
   * For any configuration read from constants, multiple reads should return
   * identical values (no mutations).
   */
  describe('Property 3: Email Configuration Immutability', () => {
    it('should return identical email values on multiple reads', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 100 }), (iterations) => {
          const emails: string[] = []
          
          // Read email multiple times
          for (let i = 0; i < iterations; i++) {
            emails.push(CONTACT_INFO.email.address)
          }
          
          // All reads should be identical
          const firstEmail = emails[0]
          const allIdentical = emails.every((email) => email === firstEmail)
          
          expect(allIdentical).toBe(true)
          expect(firstEmail).toBe('gustavosilveirasoares1012@gmail.com')
        }),
        { numRuns: 100 }
      )
    })

    it('should not mutate config object during reads', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 50 }), (iterations) => {
          const originalValue = CONTACT_INFO.email.address
          
          // Perform multiple reads
          for (let i = 0; i < iterations; i++) {
            const _email = CONTACT_INFO.email.address
            expect(_email).toBe(originalValue)
          }
          
          // Verify config still has original value
          expect(CONTACT_INFO.email.address).toBe(originalValue)
        }),
        { numRuns: 100 }
      )
    })

    it('should have consistent email object structure across reads', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 50 }), (iterations) => {
          for (let i = 0; i < iterations; i++) {
            expect(CONTACT_INFO.email).toHaveProperty('address')
            expect(CONTACT_INFO.email).toHaveProperty('subject')
            expect(CONTACT_INFO.email).toHaveProperty('body')
            expect(typeof CONTACT_INFO.email.address).toBe('string')
            expect(typeof CONTACT_INFO.email.subject).toBe('string')
            expect(typeof CONTACT_INFO.email.body).toBe('string')
          }
        }),
        { numRuns: 100 }
      )
    })
  })

  /**
   * Property 4: WhatsApp Configuration Immutability
   * Validates: Requirements 5.1, 5.2
   * 
   * For any configuration read from constants, the phone number should remain
   * unchanged across multiple component renders.
   */
  describe('Property 4: WhatsApp Configuration Immutability', () => {
    it('should return identical phone number values on multiple reads', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 100 }), (iterations) => {
          const phoneNumbers: string[] = []
          
          // Read phone number multiple times
          for (let i = 0; i < iterations; i++) {
            phoneNumbers.push(CONTACT_INFO.whatsapp.phoneNumber)
          }
          
          // All reads should be identical
          const firstPhone = phoneNumbers[0]
          const allIdentical = phoneNumbers.every(
            (phone) => phone === firstPhone
          )
          
          expect(allIdentical).toBe(true)
          expect(firstPhone).toBe('+5515996592613')
        }),
        { numRuns: 100 }
      )
    })

    it('should not mutate config object during renders', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 50 }), (iterations) => {
          const originalValue = CONTACT_INFO.whatsapp.phoneNumber
          
          // Simulate multiple component renders
          for (let i = 0; i < iterations; i++) {
            const _phone = CONTACT_INFO.whatsapp.phoneNumber
            expect(_phone).toBe(originalValue)
          }
          
          // Verify config still has original value
          expect(CONTACT_INFO.whatsapp.phoneNumber).toBe(originalValue)
        }),
        { numRuns: 100 }
      )
    })

    it('should have consistent whatsapp object structure across reads', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 50 }), (iterations) => {
          for (let i = 0; i < iterations; i++) {
            expect(CONTACT_INFO.whatsapp).toHaveProperty('phoneNumber')
            expect(CONTACT_INFO.whatsapp).toHaveProperty('message')
            expect(typeof CONTACT_INFO.whatsapp.phoneNumber).toBe('string')
            expect(typeof CONTACT_INFO.whatsapp.message).toBe('string')
          }
        }),
        { numRuns: 100 }
      )
    })
  })
})

describe('Validation Utility Functions', () => {
  describe('isValidEmail', () => {
    it('should validate correct email format', () => {
      fc.assert(
        fc.property(
          fc.emailAddress(),
          (email) => {
            expect(isValidEmail(email)).toBe(true)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'notanemail',
        'missing@domain',
        '@domain.com',
        'user@',
        '',
      ]
      
      invalidEmails.forEach((email) => {
        expect(isValidEmail(email)).toBe(false)
      })
    })

    it('should validate known good emails', () => {
      expect(isValidEmail('gustavosilveirasoares1012@gmail.com')).toBe(true)
      expect(isValidEmail('user.name@example.com')).toBe(true)
      expect(isValidEmail('user-name@example.co.uk')).toBe(true)
      expect(isValidEmail('user123@example.com')).toBe(true)
    })
  })

  describe('isValidPhoneNumber', () => {
    it('should validate Brazilian phone numbers with country code', () => {
      expect(isValidPhoneNumber('+5515996592613')).toBe(true)
      expect(isValidPhoneNumber('+5511999999999')).toBe(true)
      expect(isValidPhoneNumber('+558733333333')).toBe(false) // Invalid: only 10 digits after +55
    })

    it('should validate Brazilian phone numbers without country code', () => {
      expect(isValidPhoneNumber('11999999999')).toBe(true)
      expect(isValidPhoneNumber('15996592613')).toBe(true)
      expect(isValidPhoneNumber('8733333333')).toBe(false) // Invalid: only 8 digits
    })

    it('should validate formatted Brazilian phone numbers', () => {
      expect(isValidPhoneNumber('(11) 99999-9999')).toBe(true)
      expect(isValidPhoneNumber('11 99999-9999')).toBe(true)
      expect(isValidPhoneNumber('(15) 99659-2613')).toBe(true)
    })

    it('should reject invalid phone numbers', () => {
      expect(isValidPhoneNumber('123')).toBe(false)
      expect(isValidPhoneNumber('1199999')).toBe(false)
      expect(isValidPhoneNumber('01999999999')).toBe(false)
      expect(isValidPhoneNumber('abc1199999999')).toBe(false)
    })
  })

  describe('normalizePhoneNumber', () => {
    it('should add +55 country code to numbers without it', () => {
      expect(normalizePhoneNumber('11999999999')).toBe('+5511999999999')
      expect(normalizePhoneNumber('15996592613')).toBe('+5515996592613')
    })

    it('should preserve +55 country code for numbers with it', () => {
      expect(normalizePhoneNumber('+5511999999999')).toBe('+5511999999999')
      expect(normalizePhoneNumber('+5515996592613')).toBe('+5515996592613')
    })

    it('should remove formatting characters and normalize', () => {
      expect(normalizePhoneNumber('(11) 99999-9999')).toBe('+5511999999999')
      expect(normalizePhoneNumber('11 99999-9999')).toBe('+5511999999999')
      expect(normalizePhoneNumber('+55 (11) 99999-9999')).toBe('+5511999999999')
    })
  })

  describe('encodeEmailText', () => {
    it('should encode special characters correctly', () => {
      expect(encodeEmailText('Hello World')).toBe('Hello%20World')
      expect(encodeEmailText('Subject!')).toBe('Subject!') // ! is not encoded by encodeURIComponent
      expect(encodeEmailText('Contact & Collaborate')).toBe('Contact%20%26%20Collaborate')
    })

    it('should handle unicode characters', () => {
      const encoded = encodeEmailText('Oportunidade de Colaboração')
      expect(encoded).toContain('%')
      expect(decodeURIComponent(encoded)).toBe('Oportunidade de Colaboração')
    })

    it('should be reversible with decodeURIComponent', () => {
      fc.assert(
        fc.property(fc.string(), (text) => {
          const encoded = encodeEmailText(text)
          const decoded = decodeURIComponent(encoded)
          expect(decoded).toBe(text)
        }),
        { numRuns: 100 }
      )
    })
  })

  describe('encodeWhatsAppMessage', () => {
    it('should encode special characters correctly', () => {
      expect(encodeWhatsAppMessage('Hello World')).toBe('Hello%20World')
      expect(encodeWhatsAppMessage('Hi! How are you?')).toContain('%')
    })

    it('should handle unicode characters', () => {
      const encoded = encodeWhatsAppMessage('Olá Gustavo!')
      expect(encoded).toContain('%')
      expect(decodeURIComponent(encoded)).toBe('Olá Gustavo!')
    })

    it('should be reversible with decodeURIComponent', () => {
      fc.assert(
        fc.property(fc.string(), (text) => {
          const encoded = encodeWhatsAppMessage(text)
          const decoded = decodeURIComponent(encoded)
          expect(decoded).toBe(text)
        }),
        { numRuns: 100 }
      )
    })
  })
})
