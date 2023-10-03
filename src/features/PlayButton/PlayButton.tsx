import { Button } from '@/shared/Button'
import Image from 'next/image'

interface IPlayButton {
	onClick: () => void
}

export default function PlayButton({ onClick }: IPlayButton) {
	return (
		<Button onClick={onClick}>
			<Image src="play.svg" alt="play/pause" fill={true} />
		</Button>
	)
}
