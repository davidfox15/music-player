'use client'

import { Album } from '@/features/Album'
import NextButton from '@/features/NextButton/NextButton'
import PlayButton from '@/features/PlayButton/PlayButton'
import PrevButton from '@/features/PrevButton/PrevButton'
import { TimeLine } from '@/features/TimeLine'
import { VolumeRange } from '@/features/VolumeRange'
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'

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
    const [isPlay, setIsPlay] = useState<boolean>()
    const prevTrackIndex = useRef<number>()
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
            audio.addEventListener('pause', () => {
                setIsPlay(false)
            })
            audio.addEventListener('play', () => {
                setIsPlay(true)
            })
        }
    }, [audio])

    useLayoutEffect(() => {
        if (audio) {
            audio.addEventListener('ended', nextTrack, false)
        }
    }, [audio, nextTrack])

    useEffect(() => {
        if (
            audio &&
            // Мы не запускаем трек если пользователь не взаимодействовал со страницей
            isPlay !== undefined &&
            prevTrackIndex.current !== trackIndex
        ) {
            audio.pause()
            audio.src = tracks[trackIndex].src
            audio.play()
        }
    }, [audio, tracks, trackIndex, isPlay])

    useEffect(() => {
        prevTrackIndex.current = trackIndex
    }, [trackIndex])

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
                            if (isPlay) {
                                audio.pause()
                            } else {
                                audio.play()
                            }
                        }}
                        isPlay={!!isPlay}
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
                        isPlay={!!isPlay}
                        image={tracks[trackIndex].img || '/test-album.png'}
                        title={'test album'}
                    />
                </>
            )}
        </div>
    )
}
