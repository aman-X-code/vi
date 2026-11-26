'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'

type CardPosition = { x: number; y: number }

export default function HeroIdCard() {
  const stageRef = useRef<HTMLDivElement>(null)
  const rigRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const strapRef = useRef<SVGPathElement>(null)
  const strapHighlightRef = useRef<SVGPathElement>(null)
  const positionRef = useRef<CardPosition>({ x: 0, y: 0 })
  const dragOriginRef = useRef<CardPosition>({ x: 0, y: 0 })
  const pointerOriginRef = useRef<CardPosition>({ x: 0, y: 0 })
  const movedRef = useRef(false)
  const [hasLanded, setHasLanded] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const drawStrap = useCallback(() => {
    const stage = stageRef.current
    const card = cardRef.current
    const strap = strapRef.current
    const highlight = strapHighlightRef.current
    if (!stage || !card || !strap || !highlight) return

    const width = stage.clientWidth
    const anchorX = width / 2
    const cardX = card.offsetLeft + positionRef.current.x
    const cardY = card.offsetTop - card.offsetHeight / 2 + positionRef.current.y + 8
    const bend = Math.max(22, Math.abs(cardX - anchorX) * 0.2)
    const path = `M ${anchorX - 20} -10 C ${anchorX - 25} ${cardY * 0.32}, ${cardX - bend - 20} ${cardY * 0.74}, ${cardX - 20} ${cardY} L ${cardX + 20} ${cardY} C ${cardX + bend + 20} ${cardY * 0.74}, ${anchorX + 25} ${cardY * 0.32}, ${anchorX + 20} -10 Z`
    const shine = `M ${anchorX} -8 C ${anchorX + 4} ${cardY * 0.32}, ${cardX - bend * 0.25 + 4} ${cardY * 0.74}, ${cardX + 3} ${cardY - 3}`

    strap.setAttribute('d', path)
    highlight.setAttribute('d', shine)
  }, [])

  const setPosition = useCallback((position: CardPosition, tilt = 0) => {
    positionRef.current = position
    cardRef.current?.style.setProperty('--drag-x', `${position.x}px`)
    cardRef.current?.style.setProperty('--drag-y', `${position.y}px`)
    cardRef.current?.style.setProperty('--card-tilt', `${tilt}deg`)
    drawStrap()
  }, [drawStrap])

  useEffect(() => {
    const preloader = document.querySelector<HTMLElement>('[data-anm-gooey-preloader]')
    const revealCard = () => {
      setHasLanded(true)
      window.requestAnimationFrame(drawStrap)
    }

    if (!preloader || preloader.querySelector('[data-anm-gp-loader]')?.classList.contains('is-done')) {
      revealCard()
    } else {
      preloader.addEventListener('anm:preloader-done', revealCard, { once: true })
    }

    const observer = new ResizeObserver(drawStrap)
    if (stageRef.current) observer.observe(stageRef.current)
    if (cardRef.current) observer.observe(cardRef.current)

    return () => {
      preloader?.removeEventListener('anm:preloader-done', revealCard)
      observer.disconnect()
    }
  }, [drawStrap])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    pointerOriginRef.current = { x: event.clientX, y: event.clientY }
    dragOriginRef.current = positionRef.current
    movedRef.current = false
    setIsDragging(true)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !stageRef.current) return

    const stage = stageRef.current.getBoundingClientRect()
    const card = cardRef.current
    if (!card) return

    const dx = event.clientX - pointerOriginRef.current.x
    const dy = event.clientY - pointerOriginRef.current.y
    if (Math.abs(dx) + Math.abs(dy) > 4) movedRef.current = true

    const maxX = Math.max(0, (stage.width - card.offsetWidth) / 2 - 8)
    const maxY = Math.max(0, (stage.height - card.offsetHeight) / 2 - 24)
    const next = {
      x: Math.min(maxX, Math.max(-maxX, dragOriginRef.current.x + dx)),
      y: Math.min(maxY, Math.max(-maxY, dragOriginRef.current.y + dy)),
    }
    setPosition(next, Math.max(-7, Math.min(7, dx * 0.035)))
  }

  const releasePointer = () => {
    if (!isDragging) return
    setIsDragging(false)
    setPosition(positionRef.current)
  }

  const resetCard = () => setPosition({ x: 0, y: 0 })

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 36 : 18
    const next = { ...positionRef.current }

    if (event.key === 'ArrowLeft') next.x -= step
    else if (event.key === 'ArrowRight') next.x += step
    else if (event.key === 'ArrowUp') next.y -= step
    else if (event.key === 'ArrowDown') next.y += step
    else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      resetCard()
      return
    } else return

    event.preventDefault()
    const stage = stageRef.current
    const card = cardRef.current
    if (!stage || !card) return

    const maxX = Math.max(0, (stage.clientWidth - card.offsetWidth) / 2 - 8)
    const maxY = Math.max(0, (stage.clientHeight - card.offsetHeight) / 2 - 24)
    setPosition({
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    })
  }

  const handleClick = () => {
    if (movedRef.current) {
      movedRef.current = false
      return
    }
    resetCard()
  }

  return (
    <div ref={stageRef} className="hero-id-card-stage" role="group" aria-label="Interactive designer ID card">
      <div
        ref={rigRef}
        className={`hero-id-card-rig${hasLanded ? ' is-landed' : ''}`}
        aria-hidden={!hasLanded}
        inert={!hasLanded}
      >
        <svg className="hero-id-card-lanyard" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="lanyard-material" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#888783" />
              <stop offset=".22" stopColor="#f4f1e9" />
              <stop offset=".52" stopColor="#c9c6be" />
              <stop offset=".78" stopColor="#f7f4ed" />
              <stop offset="1" stopColor="#73716d" />
            </linearGradient>
          </defs>
          <path ref={strapRef} className="hero-id-card-strap" />
          <path ref={strapHighlightRef} className="hero-id-card-strap-highlight" />
        </svg>

        <div
          ref={cardRef}
          className={`hero-id-card-badge${isDragging ? ' is-dragging' : ''}`}
          role="button"
          tabIndex={hasLanded ? 0 : -1}
          aria-label="Vaibhavi Lawadkar, graphic designer. Drag to move the ID card, use arrow keys to nudge it, or press Enter to reset."
          aria-pressed={isDragging}
          aria-describedby="hero-card-help"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={releasePointer}
          onPointerCancel={releasePointer}
          onKeyDown={handleKeyDown}
          onClick={handleClick}
        >
          <span className="hero-id-card-clip" aria-hidden="true"><span /></span>
          <span className="hero-id-card-topline"><span>INDEPENDENT DESIGNER</span><span>IND / 026</span></span>
          <span className="hero-id-card-photo">
            <Image src="/vaibhavi-portrait.png" alt="" fill sizes="(max-width: 700px) 86vw, 370px" priority />
            <span className="hero-id-card-photo-index">V. / 01</span>
            <span className="hero-id-card-photo-stamp">MADE<br />WITH<br />MEANING</span>
          </span>
          <span className="hero-id-card-details">
            <span className="hero-id-card-label">VISUAL STORYTELLER <span>✳</span> INDIA</span>
            <span className="hero-id-card-name" role="heading" aria-level={1} id="hero-title">Vaibhavi<br />Lawadkar<span>.</span></span>
            <span className="hero-id-card-footer"><span>BRAND · PRINT · DIGITAL</span><span>OPEN TO WORK</span></span>
          </span>
        </div>
      </div>
      <span className="sr-only" id="hero-card-help">Drag the card with a pointer, use the arrow keys to move it, and press Enter or Space to return it to center.</span>
    </div>
  )
}
