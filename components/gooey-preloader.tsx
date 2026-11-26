'use client'

import type { ComponentType } from 'react'
import GooeyPreloaderCore from './gooey-preloader-core'

type GooeyPreloaderProps = {
  className?: string
  minDuration?: number
  goo?: number
  blobs?: number
  revealDuration?: number
  headline?: Array<{ text: string; dim: boolean }>
  brand?: string
  links?: string[]
}

const GooeyPreloader = GooeyPreloaderCore as ComponentType<GooeyPreloaderProps>

export default GooeyPreloader
