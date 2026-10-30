import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React from 'react'

export default function Preload() {
    useGSAP(() => {
        let tl = gsap.timeline();

        tl.to('.preload-ov', {
            opacity: 0,
            ease: "expo.inOut"
        })
    })
    return (
        <div className='preload-ov fixed inset-0 bg-[#EF233C] z-100'></div>
    )
}
