import { useEffect, useState } from 'react'
import { Range } from '@/shared/Range'
import { Time } from '@/shared/Time'
import styles from './styles.module.css'

interface ITimeLine {
    audio: HTMLAudioElement
}

export default function TimeLine({ audio }: ITimeLine) {
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        audio.addEventListener('loadeddata', () => {
            setDuration(audio.duration)
        })
        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime)
        })
    }, [audio])

    return (
        <div className={styles.wrapper}>
            <Range
                value={currentTime}
                onChange={(event) => {
                    audio.currentTime = Number(event.target.value)
                }}
                min={0}
                max={duration}
                className={styles.trackRange}
            />
            <div className={styles.timeWrapper}>
                <Time seconds={currentTime} />
                <Time seconds={duration} />
            </div>
        </div>
    )
}
