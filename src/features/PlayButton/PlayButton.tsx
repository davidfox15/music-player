import { IconButton } from '@/shared/IconButton'
import Image from 'next/image'

interface IPlayButton {
    onClick: () => void
    isPlay: boolean
}

export default function PlayButton({ onClick, isPlay }: IPlayButton) {
    return (
        <IconButton onClick={onClick}>
            {isPlay ? (
                <Image src="pause.svg" alt="pause" fill={true} />
            ) : (
                <Image src="play.svg" alt="play" fill={true} />
            )}
        </IconButton>
    )
}
