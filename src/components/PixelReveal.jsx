import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from "gsap/CustomEase";


gsap.registerPlugin(useGSAP, CustomEase)

CustomEase.create('motion', '0.9,0,0.1,1');

// Pixel-art grid pitch of char-ascii.webp, measured from its edges (1702px / ~177 cells)
const CELL = 15.6
const DURATION = 1.6
const SPREAD = 0.4

// Integer cell rects so neighbouring cells don't leave half-blended seams
function cellRects(width, height) {
    const edges = (size) => Array.from({ length: Math.ceil(size / CELL) + 1 }, (_, i) => Math.min(Math.round(i * CELL), size))
    const xs = edges(width)
    const ys = edges(height)
    const rects = []
    for (let r = 0; r < ys.length - 1; r++) {
        for (let c = 0; c < xs.length - 1; c++) {
            rects.push([xs[c], ys[r], xs[c + 1] - xs[c], ys[r + 1] - ys[r]])
        }
    }
    // Bottom rows first, jittered so the front is a dithered band SPREAD (fraction of height) tall
    const key = new Map(rects.map((r) => [r, (height - r[1]) / height + Math.random() * SPREAD]))
    return rects.sort((a, b) => key.get(a) - key.get(b))
}

export default function PixelReveal({ src, alt = '', className = '' }) {
    const canvas = useRef(null)

    useGSAP(() => {
        const el = canvas.current
        const ctx = el.getContext('2d')
        const img = new Image()
        img.src = src
        let tween
        let cancelled = false

        img.decode().then(() => {
            if (cancelled) return
            el.width = img.naturalWidth
            el.height = img.naturalHeight

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                ctx.drawImage(img, 0, 0)
                return
            }

            const rects = cellRects(el.width, el.height)
            const state = { n: 0 }
            let drawn = 0
            // Draw only the cells added since the last frame; the canvas is never cleared
            tween = gsap.to(state, {
                n: rects.length, duration: DURATION, ease: 'motion', onUpdate: () => {
                    for (const end = Math.floor(state.n); drawn < end; drawn++) {
                        const [x, y, w, h] = rects[drawn]
                        ctx.drawImage(img, x, y, w, h, x, y, w, h)
                    }
                },
            })
        })

        // The tween starts after decode, outside useGSAP's context, so it's cleaned up by hand
        return () => {
            cancelled = true
            tween?.kill()
        }
    }, { dependencies: [src] })

    return <canvas ref={canvas} role="img" aria-label={alt} className={className} />
}
