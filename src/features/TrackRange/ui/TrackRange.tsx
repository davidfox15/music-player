import { Range } from '@/shared/Range'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

interface ITrackRange {
    audio: HTMLAudioElement
}

export default function TrackRange({ audio }: ITrackRange) {
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        audio.addEventListener('loadeddata', (event) => {
            setDuration(audio.duration)
        })
        audio.addEventListener('timeupdate', (event) => {
            setCurrentTime(audio.currentTime)
        })
    }, [audio])

    return (
        <Range
            value={currentTime}
            onChange={(event) => {
                audio.currentTime = Number(event.target.value)
            }}
            min={0}
            max={duration}
            className={styles.trackRange}
        />
    )
}
