import { Button } from '@/shared/Button'
import Image from 'next/image'

interface IPrevButton {
    onClick: () => void
}

export default function PrevButton({ onClick }: IPrevButton) {
    return (
        <Button onClick={onClick}>
            <Image src="rewind-back.svg" alt="next" fill={true} />
        </Button>
    )
}
