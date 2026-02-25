'use client'

import { Album } from '@/features/Album'
import NextButton from '@/features/NextButton/NextButton'
import PlayButton from '@/features/PlayButton/PlayButton'
import PrevButton from '@/features/PrevButton/PrevButton'
import { TimeLine } from '@/features/TimeLine'
import { VolumeRange } from '@/features/VolumeRange'

import logo from '../../../../public/logo.svg'
import { ITrack, usePlayer } from '../model/usePlayer'
import styles from './styles.module.css'

interface IMusicPlayer {
    tracks: ITrack[]
}

export default function MusicPlayer({ tracks }: IMusicPlayer) {
    const {
        isPlay,
        play,
        pause,
        nextTrack,
        prevTrack,
        setVolume,
        time,
        setTime,
        duration,
        title,
        img,
    } = usePlayer(tracks)

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
                                pause()
                            } else {
                                play()
                            }
                        }}
                        isPlay={!!isPlay}
                    />
                </li>
                <li>
                    <PrevButton onClick={prevTrack} />
                </li>
            </ul>
            <>
                <div className={styles.middlePanel}>
                    <VolumeRange setPlayerVolume={setVolume} />
                    <h2 className={styles.title}>{title}</h2>
                    <TimeLine
                        duration={duration}
                        time={time}
                        setTime={setTime}
                    />
                </div>
                <Album
                    isPlay={!!isPlay}
                    image={img || '/test-album.png'}
                    title={'test album'}
                />
            </>
        </div>
    )
}
