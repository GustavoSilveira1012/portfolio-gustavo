import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Unit Tests for useReducedMotion Hook
 * Validates: Requirements 3.6
 */

describe('useReducedMotion Hook', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  /**
   * Test 1: Hook returns boolean
   * Validates: Requirements 3.6
   */
  it('should return a boolean value', () => {
    const { result } = renderHook(() => useReducedMotion())
    expect(typeof result.current).toBe('boolean')
  })

  /**
   * Test 2: Default behavior (prefers motion)
   * Validates: Requirements 3.6
   * When prefers-reduced-motion is not set, should return false (animations enabled)
   */
  it('should return false when prefers-reduced-motion is not set', () => {
    // Mock matchMedia to return false (no reduced motion preference)
    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    window.matchMedia = mockMatchMedia as any

    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  /**
   * Test 3: Respects prefers-reduced-motion: reduce
   * Validates: Requirements 3.6
   * When prefers-reduced-motion: reduce is set, should return true (animations disabled)
   */
  it('should return true when prefers-reduced-motion: reduce is set', () => {
    // Mock matchMedia to return true (reduced motion preference)
    const mockMatchMedia = vi.fn(() => ({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    window.matchMedia = mockMatchMedia as any

    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  /**
   * Test 4: Listens for media query changes
   * Validates: Requirements 3.6
   * The hook should attach a listener to the media query
   */
  it('should attach a listener to the media query', () => {
    const addEventListenerMock = vi.fn()

    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: addEventListenerMock,
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    window.matchMedia = mockMatchMedia as any

    renderHook(() => useReducedMotion())

    expect(addEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
  })

  /**
   * Test 5: Removes listener on unmount
   * Validates: Requirements 3.6
   * The hook should clean up the listener when component unmounts
   */
  it('should remove the listener on unmount', () => {
    const removeEventListenerMock = vi.fn()

    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerMock,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    window.matchMedia = mockMatchMedia as any

    const { unmount } = renderHook(() => useReducedMotion())
    unmount()

    expect(removeEventListenerMock).toHaveBeenCalledWith('change', expect.any(Function))
  })

  /**
   * Test 6: Handles matchMedia not supported gracefully
   * Validates: Requirements 3.6
   * If window.matchMedia is not available, should gracefully default to false
   */
  it('should handle unsupported matchMedia gracefully', () => {
    // Save original matchMedia
    const originalMatchMedia = window.matchMedia

    // Remove matchMedia to simulate unsupported browser
    ;(window as any).matchMedia = undefined

    const { result } = renderHook(() => useReducedMotion())

    // Should default to false (animations enabled)
    expect(result.current).toBe(false)

    // Restore original matchMedia
    window.matchMedia = originalMatchMedia
  })

  /**
   * Test 7: Query string correctness
   * Validates: Requirements 3.6
   * The hook should query for the correct media query string
   */
  it('should use the correct media query string', () => {
    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    window.matchMedia = mockMatchMedia as any

    renderHook(() => useReducedMotion())

    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })

  /**
   * Test 8: Hook state remains stable across re-renders
   * Validates: Requirements 3.6
   * The returned value should remain consistent across multiple renders if preference doesn't change
   */
  it('should maintain consistent state across multiple renders', () => {
    const mockMatchMedia = vi.fn(() => ({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    window.matchMedia = mockMatchMedia as any

    const { result, rerender } = renderHook(() => useReducedMotion())

    const firstValue = result.current

    rerender()
    const secondValue = result.current

    expect(firstValue).toBe(secondValue)
  })
})
