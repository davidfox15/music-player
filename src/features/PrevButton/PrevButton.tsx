import { IconButton } from '@/shared/IconButton'
import Image from 'next/image'

interface IPrevButton {
    onClick: () => void
}

export default function PrevButton({ onClick }: IPrevButton) {
    return (
        <IconButton onClick={onClick}>
            <Image src="rewind-back.svg" alt="prev" fill={true} />
        </IconButton>
    )
}
