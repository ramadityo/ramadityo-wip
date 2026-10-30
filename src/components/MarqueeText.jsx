import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const HOLD = 1.5 // seconds each quote stays put
const SLIDE = 0.6 // seconds per transition

const QUOTES = [
    "You're allowed to rest before the to-do list is empty. It's never going to be empty.",
    'Some weeks the win is eating a real lunch instead of Indomie at your desk.',
    'Nobody remembers your cringe posts from 2019 as clearly as you do.',
]

// The first quote is repeated at the end: the timeline slides onto that copy, then restarts at
// yPercent 0, which shows the same quote, so the jump back is invisible.
const SLIDES = [...QUOTES, QUOTES[0]]

export default function MarqueeText({ className = '' }) {
    const track = useRef(null)

    useGSAP(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const tl = gsap.timeline({ repeat: -1 })
        for (let i = 1; i < SLIDES.length; i++) {
            // The track is one slide tall (slides overflow it), so yPercent -100 moves exactly one slide
            tl.to(track.current, { yPercent: -100 * i, duration: SLIDE, ease: 'power4.out' }, `+=${HOLD}`)
        }
    })

    return (
        <div className={`relative grid overflow-hidden text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] text-white font-medium ${className}`}>
            {/* Invisible copies stacked in one grid cell size the box to the tallest quote at the current
                width, so quotes can wrap on narrow screens; every slide then takes that same height */}
            {QUOTES.map((quote) => (
                <p key={quote} className='invisible col-start-1 row-start-1'>{quote}</p>
            ))}
            <div ref={track} className='absolute inset-0'>
                {SLIDES.map((quote, i) => (
                    <p key={i} aria-hidden={i === QUOTES.length || undefined} className='h-full'>
                        {quote}
                    </p>
                ))}
            </div>
        </div>
    )
}
