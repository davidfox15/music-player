import { IconButton } from '@/shared/IconButton'
import Image from 'next/image'

interface INextButton {
    onClick: () => void
}

export default function NextButton({ onClick }: INextButton) {
    return (
        <IconButton onClick={onClick}>
            <Image
                src="rewind-back.svg"
                alt="next"
                fill={true}
                style={{ transform: 'scale(-1,1)' }}
            />
        </IconButton>
    )
}
