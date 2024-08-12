import { Range } from '@/shared/Range'
import Image from 'next/image'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'

interface IVolumeRange {
    audio: HTMLAudioElement
}

export default function VolumeRange({ audio }: IVolumeRange) {
    const [volume, setVolume] = useState(1)
    useEffect(() => {
        audio.volume = volume
    }, [audio, volume])

    return (
        <div className={styles.wrapper}>
            <Image src="/volume-cross.svg" alt="low" width={24} height={24} />
            <Range
                value={volume}
                onChange={(event) => {
                    setVolume(Number(event.target.value))
                }}
                min={0}
                max={1}
                step={0.01}
            />
            <Image src="/volume-loud.svg" alt="high" width={24} height={24} />
        </div>
    )
}
