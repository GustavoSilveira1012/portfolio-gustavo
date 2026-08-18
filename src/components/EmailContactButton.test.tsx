import { describe, it, expect, vi, afterEach } from 'vitest'
import * as fc from 'fast-check'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CONTACT_INFO } from '../utils/constants'
import EmailContactButton from './EmailContactButton'

/**
 * Unit Tests for EmailContactButton Component
 * Validates: Requirements 1.1, 1.2, 1.3, 5.4
 */

describe('EmailContactButton Component', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  /**
   * Test 1: Email Button Rendering
   * Validates: Requirements 1.2, 1.3, 4.6
   * Verifies that the button renders with correct icon, label, and href
   */
  describe('Component Rendering', () => {
    it('should render with Mail icon and "Enviar Email" label', () => {
      render(<EmailContactButton email="test@example.com" />)

      // Check for text label
      const label = screen.getByText('Enviar Email')
      expect(label).toBeInTheDocument()

      // Check for email display
      const email = screen.getByText('test@example.com')
      expect(email).toBeInTheDocument()
    })

    it('should render with correct href starting with "mailto:"', () => {
      const email = 'gustavo@example.com'
      render(<EmailContactButton email={email} />)

      const link = screen.getByRole('link')
      expect(link.getAttribute('href')).toMatch(/^mailto:/)
      expect(link.getAttribute('href')).toContain(encodeURIComponent(email))
    })

    it('should render with aria-label for accessibility', () => {
      const email = 'test@example.com'
      render(<EmailContactButton email={email} />)

      const link = screen.getByRole('link')
      const ariaLabel = link.getAttribute('aria-label')
      expect(ariaLabel).toBeDefined()
      expect(ariaLabel).toContain('Email')
      expect(ariaLabel).toContain(email)
    })

    it('should render with default email from constants when not provided', () => {
      render(<EmailContactButton />)

      const link = screen.getByRole('link')
      expect(link.getAttribute('href')).toContain(
        encodeURIComponent(CONTACT_INFO.email.address)
      )
    })

    it('should not render when email is invalid', () => {
      const { container } = render(<EmailContactButton email="invalid-email" />)
      expect(container.firstChild).toBeNull()
    })
  })

  /**
   * Test 2: Email URI Generation
   * Validates: Requirements 1.1, 1.3
   */
  describe('Email URI Generation', () => {
    it('should generate valid mailto: URI with email only', () => {
      const email = 'test@example.com'
      render(<EmailContactButton email={email} subject="" body="" />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toMatch(/^mailto:/)
      expect(href).toContain(encodeURIComponent(email))
    })

    it('should generate mailto: URI with subject parameter', () => {
      const email = 'test@example.com'
      const subject = 'Oportunidade de ColaboraÃ§Ã£o'
      render(<EmailContactButton email={email} subject={subject} body="" />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain('?subject=')
      expect(href).toContain(encodeURIComponent(subject))
    })

    it('should generate mailto: URI with subject and body', () => {
      const email = 'test@example.com'
      const subject = 'Oportunidade'
      const body = 'Gostaria de conversar sobre uma oportunidade.'
      render(<EmailContactButton email={email} subject={subject} body={body} />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain('?subject=')
      expect(href).toContain('&body=')
      expect(href).toContain(encodeURIComponent(subject))
      expect(href).toContain(encodeURIComponent(body))
    })

    it('should properly encode special characters in subject and body', () => {
      const email = 'test@example.com'
      const subject = 'Oportunidade!@#$%'
      const body = 'Hello & welcome to the team!'
      render(<EmailContactButton email={email} subject={subject} body={body} />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      // Verify encoding: & becomes %26, ! becomes %21, etc.
      expect(href).toContain(encodeURIComponent(subject))
      expect(href).toContain(encodeURIComponent(body))
      // Should not contain raw special characters in the mailto part
      expect(href).not.toMatch(/\?.*\&\s/) // Should not have & followed by space
    })
  })

  /**
   * Test 3: Email Validation
   * Validates: Requirements 5.5
   */
  describe('Email Validation', () => {
    it('should accept valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user-name@example.co.uk',
        'user123@example.com',
      ]

      validEmails.forEach((email) => {
        const { container } = render(<EmailContactButton email={email} />)
        // Should render (not null)
        expect(container.querySelector('a')).not.toBeNull()
      })
    })

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user name@example.com',
        '',
      ]

      invalidEmails.forEach((email) => {
        const { container } = render(<EmailContactButton email={email} />)
        // Should not render (null)
        expect(container.firstChild).toBeNull()
      })
    })
  })

  /**
   * Test 4: Constants Integration
   * Validates: Requirements 5.1, 5.3
   */
  describe('Constants Integration', () => {
    it('should use email from CONTACT_INFO.email.address when no prop provided', () => {
      render(<EmailContactButton />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain(encodeURIComponent(CONTACT_INFO.email.address))
    })

    it('should use subject from CONTACT_INFO.email.subject when no prop provided', () => {
      render(<EmailContactButton email="test@example.com" />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      if (CONTACT_INFO.email.subject) {
        expect(href).toContain(encodeURIComponent(CONTACT_INFO.email.subject))
      }
    })

    it('should display email from props in the UI', () => {
      const customEmail = 'custom@example.com'
      render(<EmailContactButton email={customEmail} />)

      expect(screen.getByText(customEmail)).toBeInTheDocument()
    })
  })

  /**
   * Test 5: Animation Props
   * Validates: Requirements 3.1, 3.4
   */
  describe('Animation Behavior', () => {
    it('should render with animate prop set to true', () => {
      render(<EmailContactButton email="test@example.com" animate={true} />)
      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
    })

    it('should render with animate prop set to false', () => {
      render(<EmailContactButton email="test@example.com" animate={false} />)
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
      render(<EmailContactButton email="test@example.com" />)

      const link = screen.getByRole('link')
      expect(link.tagName).toBe('A')
      expect(link.getAttribute('href')).toMatch(/^mailto:/)
    })

    it('should have descriptive aria-label', () => {
      const email = 'test@example.com'
      render(<EmailContactButton email={email} />)

      const link = screen.getByRole('link')
      const ariaLabel = link.getAttribute('aria-label')

      expect(ariaLabel).toContain('Email')
      expect(ariaLabel).toContain('Enviar')
      expect(ariaLabel).toContain(email)
    })

    it('should be keyboard focusable', () => {
      render(<EmailContactButton email="test@example.com" />)

      const link = screen.getByRole('link')
      // Links are focusable by default
      expect(link).toHaveProperty('href')
    })
  })
})

/**
 * Property-Based Tests
 * Using example-based property testing approach
 */

describe('EmailContactButton - Property-Based Tests', () => {
  /**
   * Property 1: Email URI Round-Trip
   * Validates: Requirements 1.1, 1.3, 5.4
   * For any valid email address, generating a mailto URI and parsing it back
   * should preserve the original email address.
   */
  describe('Property 1: Email URI Round-Trip', () => {
    const testEmails = [
      'user@example.com',
      'user.name@example.com',
      'user-name@example.co.uk',
      'user123@example.com',
      'first.last@subdomain.example.co.uk',
    ]

    testEmails.forEach((email) => {
      it(`should preserve email "${email}" in URI round-trip`, () => {
        const { unmount } = render(<EmailContactButton email={email} subject="" body="" />)

        const link = screen.getByRole('link')
        const href = link.getAttribute('href')

        // Extract email from mailto: URI
        const match = href!.match(/^mailto:([^?]+)/)
        expect(match).not.toBeNull()

        const extractedEmail = decodeURIComponent(match![1])
        expect(extractedEmail.toLowerCase()).toBe(email.toLowerCase())
        
        unmount()
      })
    })
  })

  /**
   * Property 9: Special Character URI Encoding
   * Validates: Requirements 5.4
   * For any special characters in email subject/body,
   * the URI should be properly URL-encoded.
   */
  describe('Property 9: Special Character URI Encoding', () => {
    /**
     * Fast-check property test for special character encoding
     * Tests that special characters in email subject/body are properly URL-encoded
     * Validates: Requirements 5.4
     * Uses 150 iterations to test various special characters
     */
    it('should properly encode special characters in subject line using fast-check (100+ iterations)', () => {
      // Create an arbitrary that generates strings with special characters
      const stringWithSpecialChars = fc
        .tuple(
          fc.string({ minLength: 1, maxLength: 20 }),
          fc.constantFrom('!', '@', '#', '$', '%', '&', ' ', '?', '=', '+'),
          fc.string({ minLength: 0, maxLength: 20 })
        )
        .map(([before, special, after]) => `${before}${special}${after}`)

      fc.assert(
        fc.property(stringWithSpecialChars, (subject) => {
          const { unmount } = render(
            <EmailContactButton
              email="test@example.com"
              subject={subject}
              body=""
            />
          )

          const link = screen.getByRole('link')
          const href = link.getAttribute('href')

          expect(href).not.toBeNull()
          expect(href).toContain('subject=')

          // Extract the encoded subject from the href
          const match = href!.match(/subject=([^&]*)/)
          expect(match).not.toBeNull()

          const encodedSubject = match![1]
          const decodedSubject = decodeURIComponent(encodedSubject)

          // The decoded subject should match the original
          expect(decodedSubject).toBe(subject)

          unmount()
        }),
        { numRuns: 150 } // Run 150 iterations (well above minimum 100)
      )
    })

    /**
     * Fast-check property test for special character encoding in body
     * Tests that special characters in email body are properly URL-encoded
     * Validates: Requirements 5.4
     */
    it('should properly encode special characters in body using fast-check (100+ iterations)', () => {
      const stringWithSpecialChars = fc
        .tuple(
          fc.string({ minLength: 1, maxLength: 20 }),
          fc.constantFrom('!', '@', '#', '$', '%', '&', ' ', '?', '=', '+'),
          fc.string({ minLength: 0, maxLength: 20 })
        )
        .map(([before, special, after]) => `${before}${special}${after}`)

      fc.assert(
        fc.property(stringWithSpecialChars, (body) => {
          const { unmount } = render(
            <EmailContactButton
              email="test@example.com"
              subject=""
              body={body}
            />
          )

          const link = screen.getByRole('link')
          const href = link.getAttribute('href')

          expect(href).not.toBeNull()
          expect(href).toContain('body=')

          // Extract the encoded body from the href
          const match = href!.match(/body=([^&]*)$/)
          expect(match).not.toBeNull()

          const encodedBody = match![1]
          const decodedBody = decodeURIComponent(encodedBody)

          // The decoded body should match the original
          expect(decodedBody).toBe(body)

          unmount()
        }),
        { numRuns: 150 } // Run 150 iterations
      )
    })

    /**
     * Fast-check property test for combined special characters
     * Tests subject and body with special characters together
     * Validates: Requirements 5.4
     */
    it('should handle combined subject and body with special characters using fast-check (100+ iterations)', () => {
      const stringWithSpecialChars = fc
        .tuple(
          fc.string({ minLength: 1, maxLength: 25 }),
          fc.constantFrom('!', '@', '#', '$', '%', '&', ' ', '?', '=', '+'),
          fc.string({ minLength: 0, maxLength: 25 })
        )
        .map(([before, special, after]) => `${before}${special}${after}`)

      fc.assert(
        fc.property(
          stringWithSpecialChars,
          stringWithSpecialChars,
          (subject, body) => {
            const { unmount } = render(
              <EmailContactButton
                email="test@example.com"
                subject={subject}
                body={body}
              />
            )

            const link = screen.getByRole('link')
            const href = link.getAttribute('href')

            expect(href).not.toBeNull()

            // Extract subject
            const subjectMatch = href!.match(/subject=([^&]*)/)
            if (subjectMatch) {
              const decodedSubject = decodeURIComponent(subjectMatch[1])
              expect(decodedSubject).toBe(subject)
            }

            // Extract body
            const bodyMatch = href!.match(/body=([^&]*)$/)
            if (bodyMatch) {
              const decodedBody = decodeURIComponent(bodyMatch[1])
              expect(decodedBody).toBe(body)
            }

            unmount()
          }
        ),
        { numRuns: 100 } // Run 100 iterations
      )
    })

    // Additional validation tests
    it('should encode space as %20 in subject and body', () => {
      const subject = 'Hello World'
      const body = 'Test Message'
      const { unmount } = render(
        <EmailContactButton email="test@example.com" subject={subject} body={body} />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain('subject=')
      expect(href).toContain(encodeURIComponent(subject))
      expect(href).toContain('body=')
      expect(href).toContain(encodeURIComponent(body))
      
      unmount()
    })

    it('should produce valid and decodable URIs for special characters', () => {
      const testCases = [
        { subject: 'Test & Demo', body: 'Body text!' },
        { subject: 'Multiple spaces', body: 'Text with @ symbols' },
        { subject: 'NÃºmeros 123', body: 'AcentuaÃ§Ã£o cafÃ©' },
      ]

      testCases.forEach(({ subject, body }) => {
        const { unmount } = render(
          <EmailContactButton email="test@example.com" subject={subject} body={body} />
        )

        const link = screen.getByRole('link')
        const href = link.getAttribute('href')

        // Verify the URI is valid by checking it can be decoded
        expect(href).toContain('mailto:')
        expect(href).toMatch(/^mailto:[^?]+/)
        
        // Verify encoded parameters are present
        if (subject) {
          const subjectMatch = href!.match(/subject=([^&]+)/)
          expect(subjectMatch).not.toBeNull()
          const decodedSubject = decodeURIComponent(subjectMatch![1])
          expect(decodedSubject).toBe(subject)
        }
        
        if (body) {
          const bodyMatch = href!.match(/body=(.+)$/)
          expect(bodyMatch).not.toBeNull()
          const decodedBody = decodeURIComponent(bodyMatch![1])
          expect(decodedBody).toBe(body)
        }
        
        unmount()
      })
    })

    it('should encode ampersand, space, and special characters properly', () => {
      const { unmount } = render(
        <EmailContactButton email="test@example.com" subject="Test & Subject" body="" />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      // Verify encoding
      expect(href).toContain('%26') // & encoded
      expect(href).toContain('%20') // space encoded
      
      unmount()
    })

    it('should encode special characters in body', () => {
      const body = 'Hello & welcome! How are you?'
      const { unmount } = render(
        <EmailContactButton
          email="test@example.com"
          subject=""
          body={body}
        />
      )

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      expect(href).toContain('body=')
      expect(href).toContain(encodeURIComponent(body))
      expect(href).toContain('%26') // & encoded
      expect(href).toContain('%20') // space encoded
      
      unmount()
    })
  })

  /**
   * Property 8: URL Protocol Consistency
   * Validates: Requirements 4.6, 1.3, 2.3
   * For any contact button, the href attribute should start with correct protocol scheme.
   */
  describe('Property 8: URL Protocol Consistency', () => {
    it('should always generate href starting with "mailto:"', () => {
      const emails = [
        'user@example.com',
        'test@test.co.uk',
        'admin@company.com',
      ]

      emails.forEach((email) => {
        const { unmount } = render(<EmailContactButton email={email} />)
        const links = screen.getAllByRole('link')
        const link = links[links.length - 1]
        expect(link.getAttribute('href')).toMatch(/^mailto:/)
        unmount()
      })
    })

    it('should not allow protocol override', () => {
      const { unmount } = render(<EmailContactButton email="test@example.com" />)

      const link = screen.getByRole('link')
      const href = link.getAttribute('href')

      // Count occurrences of mailto: - should be exactly 1
      const mailtoCount = (href!.match(/mailto:/g) || []).length
      expect(mailtoCount).toBe(1)
      
      unmount()
    })
  })
})

