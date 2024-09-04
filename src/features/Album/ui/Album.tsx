'use client'

import classNames from 'classnames'
import styles from './styles.module.css'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface IAlbum {
    isPlay: boolean
    image: string
    title: string
}

const rotateAnimation = {
    keyframes: [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }],
    options: {
        duration: 4000,
        iterations: Infinity,
        easing: 'linear',
    },
}

export default function Album({ isPlay, image, title }: IAlbum) {
    const animationRef = useRef<Animation | null>(null)
    const albumRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (albumRef.current) {
            animationRef.current = albumRef.current.animate(
                rotateAnimation.keyframes,
                rotateAnimation.options
            )
        }
    }, [albumRef])

    useEffect(() => {
        if (animationRef.current) {
            if (isPlay) {
                animationRef.current.play()
            } else {
                animationRef.current.pause()
            }
        }
    }, [isPlay, animationRef])

    return (
        <div ref={albumRef} className={classNames(styles.album)}>
            <Image src={image} alt={title} fill={true} />
        </div>
    )
}
