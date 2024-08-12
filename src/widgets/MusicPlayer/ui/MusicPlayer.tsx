'use client'

import styles from './styles.module.css'
import PlayButton from '@/features/PlayButton/PlayButton'
import NextButton from '@/features/NextButton/NextButton'
import PrevButton from '@/features/PrevButton/PrevButton'
import { Album } from '@/features/Album'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import logo from '../../../../public/logo.svg'
import { VolumeRange } from '@/features/VolumeRange'
import { TrackRange } from '@/features/TrackRange'

interface ITrack {
    title: string
    src: string
    img?: string
}

interface IMusicPlayer {
    tracks: ITrack[]
}

export default function MusicPlayer({ tracks }: IMusicPlayer) {
    const [isPlay, setIsPlay] = useState(false)
    const [trackIndex, setTrackIndex] = useState(0)
    const [audio] = useState<HTMLAudioElement>(new Audio(tracks[0].src))

    const nexTrack = () => {
        setTrackIndex((cur) => (cur === tracks.length - 1 ? 0 : ++cur))
    }

    const prevTrack = () => {
        setTrackIndex((cur) => (cur === 0 ? tracks.length - 1 : --cur))
    }

    useLayoutEffect(() => {
        audio.addEventListener(
            'ended',
            (event) => {
                setTrackIndex((cur) => (cur === tracks.length ? 0 : cur++))
            },
            false
        )
    }, [audio, tracks.length])

    useEffect(() => {
        audio.pause()
        audio.src = tracks[trackIndex].src
        audio.play()
    }, [audio, trackIndex, tracks])

    useEffect(() => {
        if (audio) {
            if (isPlay) {
                audio.play()
            } else {
                audio.pause()
            }
        }
    }, [audio, isPlay])

    return (
        <div
            className={styles.wrapper}
            style={{
                backgroundImage: `url(${logo.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <ul className={styles.sidePanel}>
                <li>
                    <NextButton
                        onClick={function (): void {
                            nexTrack()
                        }}
                    />
                </li>
                <li>
                    <PlayButton
                        onClick={() => {
                            setIsPlay((value) => !value)
                        }}
                        isPlay={isPlay}
                    />
                </li>
                <li>
                    <PrevButton
                        onClick={function (): void {
                            prevTrack()
                        }}
                    />
                </li>
            </ul>
            {audio && (
                <>
                    <div className={styles.middlePanel}>
                        <VolumeRange audio={audio} />
                        <h2>{tracks[trackIndex].title}</h2>
                        <TrackRange audio={audio} />
                    </div>
                    <Album
                        isPlay={isPlay}
                        image={tracks[trackIndex].img || '/test-album.png'}
                        title={'test album'}
                    />
                </>
            )}
        </div>
    )
}
