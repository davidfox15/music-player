import { Range } from '@/shared/Range'
import { Time } from '@/shared/Time'

import styles from './styles.module.css'

interface ITimeLine {
    duration: number
    time: number
    setTime: (time: number) => void
}

export default function TimeLine({ duration, time, setTime }: ITimeLine) {
    return (
        <div className={styles.wrapper}>
            <Range
                value={time}
                onChange={(event) => {
                    setTime(Number(event.target.value))
                }}
                min={0}
                max={duration}
                className={styles.trackRange}
            />
            <div className={styles.timeWrapper}>
                <Time seconds={time} />
                <Time seconds={duration} />
            </div>
        </div>
    )
}
