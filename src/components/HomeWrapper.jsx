import React from 'react'
import WIPHandwritten from './WIPHandwritten'
import PixelReveal from './PixelReveal'

export default function HomeWrapper() {
    return (
        <div className='relative w-full h-dvh overflow-hidden bg-[#EF233C] flex items-center'>
            {/* Text */}
            <div className='relative z-10 px-50'>
                {/* WIP Handwritten */}
                <p className='font-pixel text-[15rem] text-white leading-[100%]'>WIP</p>
                {/* Text */}



            </div>
            {/* Char */}
            <PixelReveal src="/char-ascii.webp" alt="character" className='absolute bottom-0 right-0 max-w-none w-full h-auto lg:w-auto lg:h-full' />
        </div>
    )
}
