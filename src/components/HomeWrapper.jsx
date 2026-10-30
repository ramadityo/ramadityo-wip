import React from 'react'
import WIPHandwritten from './WIPHandwritten'
import PixelReveal from './PixelReveal'
import MarqueeText from './MarqueeText'

export default function HomeWrapper() {
    return (
        <div className='relative w-full h-dvh overflow-hidden bg-[#EF233C] flex items-start wide:items-center px-[clamp(1.5rem,10vw,12.5rem)] pt-[clamp(4rem,12dvh,8rem)] wide:pt-0'>
            {/* Text: top on mobile/tablet so the character doesn't cover it, centered on wide screens */}
            <div className='relative z-10 w-full max-w-3xl'>
                {/* WIP Handwritten */}
                {/* -ml in em keeps the glyph's side bearing optically aligned at every size */}
                <p className='font-pixel text-[clamp(6rem,15vw,15rem)] text-white leading-none -ml-[0.067em]'>WIP</p>
                {/* Text */}
                {/* Stop short of the character: it's 100dvh tall and 1702/1105 × that wide (154dvh), and its
                    leftmost pixel at quote height (≤65% down) sits 38% in, i.e. 0.62 × 154 ≈ 96dvh from the right */}
                <MarqueeText className='wide:max-w-[calc(100vw_-_96dvh_-_clamp(1.5rem,10vw,12.5rem)_-_2rem)]' />
            </div>
            {/* Char */}
            <PixelReveal src="/char-ascii.webp" alt="character" className='absolute bottom-0 right-0 max-w-none w-full h-auto wide:w-auto wide:h-full' />
        </div>
    )
}
