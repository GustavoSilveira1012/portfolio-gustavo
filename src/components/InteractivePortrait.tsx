import { useRef, type PointerEvent } from 'react'

/**
 * Original depth-based portrait scene.
 * Uses Gustavo's existing photo rather than somebody else's 3D avatar/model.
 * GPU-friendly CSS perspective with pointer-controlled tilt and a reduced-motion fallback.
 */
export default function InteractivePortrait() {
  const surface = useRef<HTMLDivElement>(null)

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    surface.current?.style.setProperty('--avatar-rotate-x', String(-y * 12) + 'deg')
    surface.current?.style.setProperty('--avatar-rotate-y', String(x * 18) + 'deg')
  }

  const reset = () => {
    surface.current?.style.setProperty('--avatar-rotate-x', '0deg')
    surface.current?.style.setProperty('--avatar-rotate-y', '0deg')
  }

  return (
    <div className="os-avatar-stage" onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
      <div className="os-avatar-space" ref={surface}>
        <div className="os-avatar-ring os-avatar-ring-outer" />
        <div className="os-avatar-ring os-avatar-ring-inner" />
        <div className="os-avatar-card">
          <img src="/perfil.jpg" alt="" loading="eager" decoding="async" />
          <div className="os-avatar-fade" />
        </div>
        <span className="os-avatar-star os-avatar-star-one">✳</span>
        <span className="os-avatar-star os-avatar-star-two">✦</span>
        <div className="os-avatar-id"><strong>GUSTAVO</strong><small>SOFTWARE DEVELOPER</small></div>
        <span className="os-avatar-orbit os-avatar-orbit-left" />
        <span className="os-avatar-orbit os-avatar-orbit-right" />
      </div>
    </div>
  )
}
