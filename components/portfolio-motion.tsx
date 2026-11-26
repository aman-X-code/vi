'use client'

import { useEffect } from 'react'

export function PortfolioMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (!reduceMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            currentObserver.unobserve(entry.target)
          }
        })
      }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' })

      revealItems.forEach((item) => {
        item.classList.add('reveal-ready')
        observer.observe(item)
      })
    }

    const header = document.querySelector<HTMLElement>('.site-header')
    const progress = document.querySelector<HTMLElement>('.scroll-progress')
    let frame = 0

    const updateScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight
        const amount = scrollable > 0 ? window.scrollY / scrollable : 0
        progress?.style.setProperty('--scroll-progress', String(amount))
        header?.classList.toggle('is-scrolled', window.scrollY > 24)
      })
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    const pointerQuery = window.matchMedia('(pointer: fine) and (min-width: 800px)')
    let pointer: HTMLElement | null = null
    let pointerFrame = 0

    const movePointer = (event: PointerEvent) => {
      if (!pointer) return
      cancelAnimationFrame(pointerFrame)
      pointerFrame = requestAnimationFrame(() => {
        pointer?.style.setProperty('--cursor-x', `${event.clientX}px`)
        pointer?.style.setProperty('--cursor-y', `${event.clientY}px`)
      })
    }

    const handleHover = (event: PointerEvent) => {
      const candidate = event.type === 'pointerout' ? event.relatedTarget : event.target
      const target = candidate instanceof Element ? candidate.closest('a, button, .hover-image-reveal-item, .skill-row') : null
      pointer?.classList.toggle('is-active', Boolean(target))
    }

    if (!reduceMotion && pointerQuery.matches) {
      pointer = document.querySelector<HTMLElement>('.cursor-orbit')
      document.addEventListener('pointermove', movePointer, { passive: true })
      document.addEventListener('pointerover', handleHover)
      document.addEventListener('pointerout', handleHover)
      document.documentElement.classList.add('has-custom-cursor')
    }

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(pointerFrame)
      window.removeEventListener('scroll', updateScroll)
      document.removeEventListener('pointermove', movePointer)
      document.removeEventListener('pointerover', handleHover)
      document.removeEventListener('pointerout', handleHover)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-orbit" aria-hidden="true"><span /></div>
    </>
  )
}
