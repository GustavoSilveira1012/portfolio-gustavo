import { useRef, type PointerEvent } from 'react'

/**
 * Depth portrait anchored to Gustavo's REAL photograph.
 *
 * A single tiny face reference is insufficient to reconstruct a person's
 * geometry faithfully. Instead of drawing invented facial features we keep
 * the original photo intact and animate layered elements in CSS 3D space.
 * This is a 2.5D interactive portrait, not a photogrammetric 3D mesh.
 */
export default function Gustavo3D() {
  const surface = useRef<HTMLDivElement>(null)

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (event.pointerType === 'touch') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const dx = (event.clientX - bounds.left) / Math.max(1, bounds.width) - 0.5
    const dy = (event.clientY - bounds.top) / Math.max(1, bounds.height) - 0.5

    surface.current?.style.setProperty('--portrait-rx', `${(-dy * 9).toFixed(2)}deg`)
    surface.current?.style.setProperty('--portrait-ry', `${(dx * 13).toFixed(2)}deg`)
  }

  const onPointerLeave = () => {
    surface.current?.style.setProperty('--portrait-rx', '0deg')
    surface.current?.style.setProperty('--portrait-ry', '0deg')
  }

  return (
    <div className="os-real-3d os-photo-portrait" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="os-photo-halo" aria-hidden="true" />
      <div className="os-photo-depth" ref={surface}>
        <div className="os-photo-underlay" aria-hidden="true" />
        <div className="os-photo-frame">
          <img
            src="/perfil.jpg"
            alt="Gustavo Silveira Soares, desenvolvedor Full Stack"
            draggable={false}
            decoding="async"
            fetchPriority="high"
          />
          <div className="os-photo-bottom-shade" aria-hidden="true" />
          <span className="os-photo-photo-tag" aria-hidden="true">GUSTAVO / ORIGINAL</span>
        </div>
        <div className="os-photo-stamp" aria-hidden="true">
          <span className="os-photo-stamp-spark">✳</span>
          <div><strong>GUSTAVO</strong><small>FULL STACK DEVELOPER</small></div>
        </div>
        <span className="os-photo-floating os-photo-floating-a" aria-hidden="true">+</span>
        <span className="os-photo-floating os-photo-floating-b" aria-hidden="true">✳</span>
      </div>
    </div>
  )
}
