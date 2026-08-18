import { useEffect, useState } from 'react'

/**
 * Hook to detect and respond to the user's prefers-reduced-motion preference
 * 
 * This hook detects the prefers-reduced-motion: reduce media query preference
 * and returns a boolean indicating whether animations should be disabled.
 * 
 * The hook listens for changes to the media query and updates accordingly,
 * allowing the UI to adapt in real-time if the user changes their preference.
 * 
 * @returns boolean - true if the user prefers reduced motion, false otherwise
 * 
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion()
 * 
 * const animationVariant = prefersReducedMotion
 *   ? { boxShadow: 'enhanced' }  // No scale
 *   : { scale: 1.05, boxShadow: 'enhanced' }  // Full animation
 * ```
 * 
 * @validates Requirements 3.6
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    try {
      // Detect initial preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      // Listen for changes to the preference
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }

      mediaQuery.addEventListener('change', handleChange)
      
      // Cleanup listener on unmount
      return () => mediaQuery.removeEventListener('change', handleChange)
    } catch {
      // Fallback if media query not supported
      // Default to animations enabled (false = animations allowed)
      setPrefersReducedMotion(false)
    }
  }, [])

  return prefersReducedMotion
}
