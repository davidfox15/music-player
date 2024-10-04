'use client'

import { Album } from '@/features/Album'
import NextButton from '@/features/NextButton/NextButton'
import PlayButton from '@/features/PlayButton/PlayButton'
import PrevButton from '@/features/PrevButton/PrevButton'
import { TimeLine } from '@/features/TimeLine'
import { VolumeRange } from '@/features/VolumeRange'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import logo from '../../../../public/logo.svg'
import styles from './styles.module.css'

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

    const nextTrack = useCallback(() => {
        setTrackIndex((cur) => (cur === tracks.length - 1 ? 0 : ++cur))
    }, [setTrackIndex, tracks.length])

    const prevTrack = useCallback(() => {
        setTrackIndex((cur) => (cur === 0 ? tracks.length - 1 : --cur))
    }, [setTrackIndex, tracks.length])

    useLayoutEffect(() => {
        if (audio) {
            audio.addEventListener('ended', nextTrack, false)
            return () => {
                audio.removeEventListener('ended', nextTrack, false)
            }
        }
    }, [audio, nextTrack])

    useEffect(() => {
        if (audio && isPlay) {
            audio.pause()
            audio.src = tracks[trackIndex].src
            audio.play()
        }
    }, [audio, trackIndex, tracks, isPlay])

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
                    <NextButton onClick={nextTrack} />
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
                    <PrevButton onClick={prevTrack} />
                </li>
            </ul>
            {audio && (
                <>
                    <div className={styles.middlePanel}>
                        <VolumeRange audio={audio} />
                        <h2 className={styles.title}>
                            {tracks[trackIndex].title}
                        </h2>
                        <TimeLine audio={audio} />
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
