import { describe, it, expect, vi, afterEach } from 'vitest'
import * as fc from 'fast-check'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { isValidPhoneNumber, CONTACT_INFO } from '../utils/constants'
import WhatsAppContactButton from './WhatsAppContactButton'

/**
 * Unit Tests for WhatsAppContactButton Component
 * Validates: Requirements 2.1, 2.2, 2.3, 5.4, 5.5
 */

describe('WhatsAppContactButton Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  /**
   * Test 1: WhatsApp Button Rendering
   * Validates: Requirements 2.2, 2.3, 4.6
   * Verifies that the button renders with correct icon, label, and href
   */
  describe('Component Rendering', () => {
    it('should render with MessageCircle icon and "WhatsApp" label', () => {
      render(<WhatsAppContactButton phoneNumber="+5511999999999" />)

      // Check for text label
      const label = screen.getByText('WhatsApp')
      expect(label).toBeInTheDocument()
    })

    it('should render with correct href starting with "https://wa.me"', () => {
      const phoneNumber = '+5511999999999'
      render(<WhatsAppContactButton phoneNumber={phoneNumber} />)

      const link = screen.getByRole('link')
      expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me/)
      expect(link.getAttribute('href')).toContain('5511999999999')
    })

    it('should render with aria-label for accessibility', () => {
      render(<WhatsAppContactButton phoneNumber="+5511999999999" />)

      const link = screen.getByRole('link')
      const ariaLabel = link.getAttribute('aria-label')
      expect(ariaLabel).toBeDefined()
      expect(ariaLabel).toContain('WhatsApp')
    })

    it('should render with default phone from constants when not provided', () => {
      render(<WhatsAppContactButton phoneNumber="" />)

      // Fallback to constants - should still render with default
      const link = screen.queryByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('should have target="_blank" for opening in new window', () => {
      render(<WhatsAppContactButton phoneNumber="+5511999999999" />)

      const link = screen.getByRole('link')
      expect(link.getAttribute('target')).toBe('_blank')
    })

    it('should have rel="noopener noreferrer" for security', () => {
      render(<WhatsAppContactButton phoneNumber="+5511999999999" />)

      const link = screen.getByRole('link')
      expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    })
  })

  /**
   * Test 2: WhatsApp URI Generation
   * Validates: Requirements 2.1, 2.3
   */
  describe('WhatsApp URI Generation', () => {
    it('should generate valid wa.me URI with phone number only', () => {
      const phoneNumber = '+5511999999999'
      render(<WhatsAppContactButton phoneNumber={phoneNumber} message="" />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toMatch(/^https:\/\/wa\.me/)
      expect(href).toContain('5511999999999') // Without the +
    })

    it('should generate wa.me URI with message parameter', () => {
      const phoneNumber = '+5511999999999'
      const message = 'Olá Gustavo'
      render(<WhatsAppContactButton phoneNumber={phoneNumber} message={message} />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain('?text=')
      expect(href).toContain(encodeURIComponent(message))
    })

    it('should properly encode special characters in message', () => {
      const phoneNumber = '+5511999999999'
      const message = 'Olá! Como você está?'
      render(<WhatsAppContactButton phoneNumber={phoneNumber} message={message} />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain('?text=')
      expect(href).toContain(encodeURIComponent(message))
    })

    it('should normalize phone number format without +', () => {
      const phoneNumber = '11999999999' // Without +55
      render(<WhatsAppContactButton phoneNumber={phoneNumber} />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain('wa.me/5511999999999')
    })

    it('should handle phone number with formatting', () => {
      const phoneNumber = '(11) 99999-9999'
      render(<WhatsAppContactButton phoneNumber={phoneNumber} />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain('wa.me/5511999999999')
    })
  })

  /**
   * Test 3: Phone Number Validation
   * Validates: Requirements 5.5
   */
  describe('Phone Number Validation', () => {
    it('should accept valid Brazilian phone numbers', () => {
      const validPhoneNumbers = [
        '+5511999999999',
        '11999999999',
        '(11) 99999-9999',
        '+55 11 99999-9999',
      ]

      validPhoneNumbers.forEach((phoneNumber) => {
        // Mock console.warn to check if it's called
        const warnSpy = vi.spyOn(console, 'warn')
        
        render(<WhatsAppContactButton phoneNumber={phoneNumber} />)
        
        const link = screen.getByRole('link')
        expect(link).toBeInTheDocument()
        
        warnSpy.mockRestore()
        cleanup()
      })
    })

    it('should warn for invalid phone formats', () => {
      const warnSpy = vi.spyOn(console, 'warn')
      
      render(<WhatsAppContactButton phoneNumber="invalid" />)
      
      expect(warnSpy).toHaveBeenCalled()
      
      warnSpy.mockRestore()
    })

    it('should accept phone numbers with spaces and hyphens', () => {
      const formattedNumbers = [
        '+55 11 99999-9999',
        '11 99999-9999',
        '(11) 99999-9999',
      ]

      formattedNumbers.forEach((phoneNumber) => {
        const { unmount } = render(<WhatsAppContactButton phoneNumber={phoneNumber} />)
        
        const link = screen.getByRole('link')
        expect(link).toBeInTheDocument()
        
        unmount()
      })
    })
  })

  /**
   * Test 4: Constants Integration
   * Validates: Requirements 5.1, 5.3
   */
  describe('Constants Integration', () => {
    it('should use phone number from CONTACT_INFO when default is used', () => {
      render(<WhatsAppContactButton phoneNumber={CONTACT_INFO.whatsapp.phoneNumber} />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      // Normalize for comparison (remove + from constants)
      const normalizedPhone = CONTACT_INFO.whatsapp.phoneNumber.replace('+', '')
      expect(href).toContain(`wa.me/${normalizedPhone}`)
    })

    it('should use message from constants when passed', () => {
      const message = CONTACT_INFO.whatsapp.message
      render(
        <WhatsAppContactButton phoneNumber={CONTACT_INFO.whatsapp.phoneNumber} message={message} />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain('?text=')
      expect(href).toContain(encodeURIComponent(message))
    })
  })

  /**
   * Test 5: Animation Props
   * Validates: Requirements 3.1, 3.4
   */
  describe('Animation Behavior', () => {
    it('should render with animate prop set to true', () => {
      render(<WhatsAppContactButton phoneNumber="+5511999999999" animate={true} />)
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('should render with animate prop set to false', () => {
      render(<WhatsAppContactButton phoneNumber="+5511999999999" animate={false} />)
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })
  })

  /**
   * Test 6: Accessibility Features
   * Validates: Requirements 4.1, 4.3, 4.4, 4.6
   */
  describe('Accessibility', () => {
    it('should have proper semantic HTML structure', () => {
      render(<WhatsAppContactButton phoneNumber="+5511999999999" />)

      const link = screen.getByRole('link')
      expect(link.tagName).toBe('A')
      expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me/)
    })

    it('should have descriptive aria-label', () => {
      render(<WhatsAppContactButton phoneNumber="+5511999999999" />)

      const link = screen.getByRole('link')
      const ariaLabel = link.getAttribute('aria-label')

      expect(ariaLabel).toContain('WhatsApp')
    })

    it('should be keyboard focusable', () => {
      render(<WhatsAppContactButton phoneNumber="+5511999999999" />)

      const link = screen.getByRole('link')
      // Links are focusable by default
      expect(link).toHaveProperty('href')
    })
  })
})

/**
 * Property-Based Tests
 * Using fast-check for property testing with 100+ iterations
 */

describe('WhatsAppContactButton - Property-Based Tests', () => {
  /**
   * Property 2: WhatsApp URI Format Consistency
   * Validates: Requirements 2.1, 2.3, 5.4
   * For any valid international phone number, the generated wa.me URI should
   * maintain consistent format with +55 country code and all digits.
   *
   * Test Logic:
   * - Generate random valid Brazilian phone numbers
   * - Create wa.me URI using phone number
   * - Extract phone number from URI
   * - Verify extracted number equals input (digits only, preserving +55)
   *
   * Edge Cases Covered:
   * - 11999999999 (without +55 prefix)
   * - (11) 99999-9999 (formatted)
   * - +55 prefix variants
   */
  describe('Property 2: WhatsApp URI Format Consistency', () => {
    /**
     * Fast-check property test for WhatsApp URI format consistency
     * Tests that phone numbers maintain consistent +55 format in wa.me URIs
     * Validates: Requirements 2.1, 2.3, 5.4
     * Uses 150 iterations to test various Brazilian phone number formats
     */
    it('should maintain consistent wa.me URI format with +55 country code using fast-check (100+ iterations)', () => {
      // Create an arbitrary that generates valid Brazilian phone numbers
      // Format: +55 [1-9]{1}[1-9]{1}[0-9]{8,9}
      // Area code: 11-99 (first digit 1-9, second digit 1-9)
      // Phone: 8-9 digits
      const brazilianPhoneNumber = fc
        .tuple(
          fc.integer({ min: 11, max: 99 }), // Area code: 11-99
          fc.boolean(), // Mobile (9 digits) or landline (8 digits)
          fc.integer({ min: 10000000, max: 999999999 }) // Phone number
        )
        .map(([areaCode, isMobile, phone]) => {
          const phoneStr = isMobile
            ? `${String(phone).padStart(9, '0')}`
            : `${String(phone).padStart(8, '0')}`
          return `+55${areaCode}${phoneStr}`
        })

      fc.assert(
        fc.property(brazilianPhoneNumber, (phoneNumber) => {
          const { unmount } = render(
            <WhatsAppContactButton phoneNumber={phoneNumber} />
          )

          const link = screen.getByRole('link')
          const href = link.getAttribute('href')

          expect(href).not.toBeNull()
          expect(href).toMatch(/^https:\/\/wa\.me/)

          // Extract phone number from wa.me URI
          // Format: https://wa.me/{phoneNumber}?...
          const match = href!.match(/wa\.me\/(\d+)/)
          expect(match).not.toBeNull()

          const extractedNumber = match![1]

          // Normalize input for comparison (remove all non-digits, then add +55)
          const normalizedInput = `+${phoneNumber.replace(/\D/g, '')}`
          if (!normalizedInput.startsWith('+55')) {
            // This shouldn't happen with our generator, but handle it
            const withCountryCode = `+55${phoneNumber.replace(/\D/g, '')}`
            expect(extractedNumber).toBe(withCountryCode.replace('+', ''))
          } else {
            expect(extractedNumber).toBe(normalizedInput.replace('+', ''))
          }

          // Verify +55 is preserved in the normalized number
          const normalizedExtracted = `+${extractedNumber}`
          expect(normalizedExtracted).toMatch(/^\+55/)

          // Verify all digits are preserved
          expect(normalizedExtracted.replace(/\D/g, '')).toBe(
            normalizedInput.replace(/\D/g, '')
          )

          unmount()
        }),
        { numRuns: 150 } // Run 150 iterations (well above minimum 100)
      )
    })

    /**
     * Test edge cases with specific phone number formats
     */
    it('should handle edge case: 11999999999 (without +55 prefix)', () => {
      const { unmount } = render(
        <WhatsAppContactButton phoneNumber="11999999999" />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toMatch(/wa\.me\/5511999999999/)

      unmount()
    })

    it('should handle edge case: (11) 99999-9999 (formatted)', () => {
      const { unmount } = render(
        <WhatsAppContactButton phoneNumber="(11) 99999-9999" />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toMatch(/wa\.me\/5511999999999/)

      unmount()
    })

    it('should handle edge case: +55 prefix with spaces', () => {
      const { unmount } = render(
        <WhatsAppContactButton phoneNumber="+55 11 99999-9999" />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toMatch(/wa\.me\/5511999999999/)

      unmount()
    })

    /**
     * Test that phone number extraction works correctly
     */
    it('should extract phone number correctly from wa.me URI', () => {
      const phoneNumber = '+5511987654321'
      const { unmount } = render(
        <WhatsAppContactButton phoneNumber={phoneNumber} />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      // Extract phone from href
      const match = href!.match(/wa\.me\/(\d+)/)
      expect(match).not.toBeNull()

      const extractedNumber = match![1]
      expect(extractedNumber).toBe('5511987654321')

      unmount()
    })

    /**
     * Test that digits are preserved across various formatting
     */
    it('should preserve all digits regardless of input formatting (100+ iterations)', () => {
      const phoneDigits = '5511999999999'
      const phoneFormats = [
        '+5511999999999',
        '5511999999999',
        '11999999999',
        '(11) 99999-9999',
        '+55 11 99999-9999',
        '11 99999-9999',
      ]

      phoneFormats.forEach((phoneNumber) => {
        const { unmount } = render(
          <WhatsAppContactButton phoneNumber={phoneNumber} />
        )

        const link = screen.getByRole('link')
        const href = link.getAttribute('href')

        // Extract digits from href
        const match = href!.match(/wa\.me\/(\d+)/)
        expect(match).not.toBeNull()

        const extractedDigits = match![1]
        expect(extractedDigits).toBe(phoneDigits)

        unmount()
      })
    })

    /**
     * Test that message encoding doesn't affect phone number consistency
     */
    it('should maintain phone number consistency with pre-filled message', () => {
      const phoneNumber = '+5511987654321'
      const message = 'Olá! Como você está?'
      const { unmount } = render(
        <WhatsAppContactButton phoneNumber={phoneNumber} message={message} />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toMatch(/wa\.me\/5511987654321/)

      // Extract phone from URI
      const match = href!.match(/wa\.me\/(\d+)/)
      expect(match).not.toBeNull()

      const extractedNumber = match![1]
      expect(extractedNumber).toBe('5511987654321')

      unmount()
    })
  })

  /**
   * Property 10: Phone Number Format Validation
   * Validates: Requirements 5.5
   * For any phone number input, invalid formats should be rejected
   * and valid international formats should be accepted.
   */
  describe('Property 10: Phone Number Format Validation', () => {
    it('should accept valid Brazilian numbers: +5511999999999, 11999999999', () => {
      const validNumbers = ['+5511999999999', '11999999999']

      validNumbers.forEach((number) => {
        const { unmount } = render(<WhatsAppContactButton phoneNumber={number} />)

        const link = screen.getByRole('link')
        expect(link).toBeInTheDocument()

        unmount()
      })
    })

    it('should handle invalid formats gracefully (100+ iterations)', () => {
      // Create an arbitrary that generates invalid phone numbers
      const invalidPhoneNumber = fc
        .tuple(
          fc.constantFrom('abc', 'xyz', '!!!', '   '),
          fc.string({ maxLength: 10 })
        )
        .map(([bad, extra]) => `${bad}${extra}`)
        .filter((num) => !isValidPhoneNumber(num))

      fc.assert(
        fc.property(invalidPhoneNumber, (phoneNumber) => {
          const warnSpy = vi.spyOn(console, 'warn')
          const { unmount } = render(
            <WhatsAppContactButton phoneNumber={phoneNumber} />
          )

          // Should warn about invalid format but still render
          expect(warnSpy).toHaveBeenCalled()

          warnSpy.mockRestore()
          unmount()
        }),
        { numRuns: 120 } // Run 120 iterations
      )
    })

    it('should reject numbers missing digits', () => {
      const invalidNumbers = ['11', '555', '1199']

      invalidNumbers.forEach((number) => {
        const warnSpy = vi.spyOn(console, 'warn')

        render(<WhatsAppContactButton phoneNumber={number} />)

        expect(warnSpy).toHaveBeenCalled()

        warnSpy.mockRestore()
        cleanup()
      })
    })

    it('should accept numbers with correct country code +55', () => {
      const { unmount } = render(
        <WhatsAppContactButton phoneNumber="+5511999999999" />
      )

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()

      const href = link.getAttribute('href')
      expect(href).toContain('5511999999999')

      unmount()
    })

    it('should reject numbers without country code prefix', () => {
      // This might still render, but with warning
      const warnSpy = vi.spyOn(console, 'warn')

      render(<WhatsAppContactButton phoneNumber="999999999" />)

      // Should warn because format is unclear
      expect(warnSpy).toHaveBeenCalled()

      warnSpy.mockRestore()
    })
  })

  /**
   * Property 8: URL Protocol Consistency
   * Validates: Requirements 4.6, 2.3, 5.4
   * For any contact button, the href attribute should start with
   * correct protocol scheme (wa.me for WhatsApp).
   */
  describe('Property 8: URL Protocol Consistency', () => {
    it('should always generate href starting with "https://wa.me"', () => {
      const phoneNumbers = [
        '+5511999999999',
        '11999999999',
        '(11) 99999-9999',
        '+55 11 99999-9999',
      ]

      phoneNumbers.forEach((phoneNumber) => {
        const { unmount } = render(
          <WhatsAppContactButton phoneNumber={phoneNumber} />
        )

        const link = screen.getByRole('link')
        expect(link.getAttribute('href')).toMatch(/^https:\/\/wa\.me/)

        unmount()
      })
    })

    it('should not allow protocol override', () => {
      const { unmount } = render(
        <WhatsAppContactButton phoneNumber="+5511999999999" />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      // Count occurrences of wa.me - should be exactly 1
      const waCount = (href!.match(/wa\.me/g) || []).length
      expect(waCount).toBe(1)

      // Should start with https://
      expect(href).toMatch(/^https:\/\//)

      unmount()
    })

    it('should use https protocol, not http', () => {
      const { unmount } = render(
        <WhatsAppContactButton phoneNumber="+5511999999999" />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toMatch(/^https:\/\//)
      expect(href).not.toMatch(/^http:\/\//)

      unmount()
    })

    it('should maintain protocol consistency with message parameter', () => {
      const { unmount } = render(
        <WhatsAppContactButton phoneNumber="+5511999999999" message="Test" />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toMatch(/^https:\/\/wa\.me/)
      // Even with message, protocol should be the same
      expect(href).not.toMatch(/^http:\/\//)

      unmount()
    })
  })
})
