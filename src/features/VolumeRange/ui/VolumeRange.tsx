import { Range } from '@/shared/Range'
import Image from 'next/image'
import { useState } from 'react'

import styles from './styles.module.css'

interface IVolumeRange {
    setPlayerVolume: (volume: number) => void
}

export default function VolumeRange({ setPlayerVolume }: IVolumeRange) {
    const [volume, setVolume] = useState(1)

    return (
        <div className={styles.wrapper}>
            <Image src="/volume-cross.svg" alt="low" width={24} height={24} />
            <Range
                value={volume}
                onChange={(event) => {
                    setPlayerVolume(Number(event.target.value))
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
